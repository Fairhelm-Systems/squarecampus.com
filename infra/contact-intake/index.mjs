// squarecampus-contact-intake — Lambda behind API Gateway (HTTP API).
// Receives /demo form submissions, stores them in DynamoDB, and (once SES is
// verified) emails a notification. SES failures never fail the request: the
// submission is already stored by then.
//
// Traffic path: browsers call https://squarecampus.com/api/contact (same
// origin, no CORS preflight); CloudFront proxies to API Gateway with a shared
// secret header. Direct execute-api calls without the secret are rejected.
//
// Abuse safeguards (layered with API Gateway stage throttling):
//   - Edge key: requests must carry the x-intake-edge-key header that only
//     the CloudFront origin config knows — the public execute-api URL is a
//     dead end (403).
//   - Origin allowlist: browsers send Origin on every POST, so script spam
//     without the right Origin is rejected with 403.
//   - Per-IP rate limit via DynamoDB atomic counter, RATE_LIMIT_PER_HOUR/hr,
//     keyed on the real viewer IP from CloudFront-Viewer-Address (set by
//     CloudFront itself; not client-spoofable).
//   - Honeypot field honored server-side (pretend success, store nothing).
//   - Strict validation: required fields, email shape, consent, length caps,
//     20KB body cap.
//   - No submission content is written to CloudWatch logs (PII stays in the
//     table).
//
// Env vars:
//   TABLE_NAME           DynamoDB table for submissions + rate counters
//   EDGE_SECRET          shared secret set as a CloudFront origin header
//   ALLOWED_ORIGINS      comma-separated Origin allowlist
//   RATE_LIMIT_PER_HOUR  per-IP submission cap (default 5)
//   SES_ENABLED          "true" to send email notifications (stubbed until
//                        the squarecampus.com SES identity is verified)
//   NOTIFY_EMAIL         where notifications go (contact@squarecampus.com)
//   SENDER_EMAIL         verified SES sender (no-reply@squarecampus.com)
import { randomUUID } from "node:crypto";
import { DynamoDBClient, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const TABLE = process.env.TABLE_NAME;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "https://squarecampus.com")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
const RATE_LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR ?? "5");
const EDGE_SECRET = process.env.EDGE_SECRET;
const SES_ENABLED = process.env.SES_ENABLED === "true";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

const ddb = new DynamoDBClient({});
const ses = new SESv2Client({});

const REQUIRED = ["name", "email", "phone", "institution", "role", "campusCount"];
const MAX_LEN = {
  name: 200,
  email: 254,
  phone: 32,
  institution: 300,
  role: 100,
  campusCount: 40,
  currentSystem: 300,
  primaryPain: 200,
  message: 5000,
};

const resp = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.requestContext?.http?.method !== "POST") {
    return resp(405, { error: "method not allowed" });
  }

  // Only CloudFront knows the edge secret; direct execute-api calls stop here.
  if (!EDGE_SECRET || event.headers?.["x-intake-edge-key"] !== EDGE_SECRET) {
    return resp(403, { error: "forbidden" });
  }

  const origin = event.headers?.origin ?? event.headers?.Origin;
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return resp(403, { error: "forbidden" });
  }

  if ((event.body ?? "").length > 20000) {
    return resp(413, { error: "payload too large" });
  }

  let data;
  try {
    data = JSON.parse(
      event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body
    );
  } catch {
    return resp(400, { error: "invalid JSON" });
  }

  // Honeypot field: bots fill it, humans never see it. Pretend success.
  if (data.website) return resp(200, { ok: true });

  for (const field of REQUIRED) {
    if (typeof data[field] !== "string" || !data[field].trim()) {
      return resp(400, { error: `missing field: ${field}` });
    }
  }
  if (data.consent !== true) return resp(400, { error: "consent required" });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return resp(400, { error: "invalid email" });
  }

  // Per-IP rate limit: atomic counter per IP per hour bucket, cleaned up by
  // the table's TTL. Checked after validation so malformed junk never counts.
  // Behind CloudFront the TCP peer is an edge server, so the real viewer IP
  // comes from CloudFront-Viewer-Address ("ip:port", set by CloudFront).
  const viewerAddress = event.headers?.["cloudfront-viewer-address"];
  const ip = viewerAddress
    ? viewerAddress.slice(0, viewerAddress.lastIndexOf(":"))
    : (event.requestContext?.http?.sourceIp ?? "unknown");
  const receivedAt = new Date().toISOString();
  const hourBucket = receivedAt.slice(0, 13); // YYYY-MM-DDTHH
  const counter = await ddb.send(
    new UpdateItemCommand({
      TableName: TABLE,
      Key: { id: { S: `ratelimit#${ip}#${hourBucket}` } },
      UpdateExpression: "ADD #c :one SET expiresAt = if_not_exists(expiresAt, :ttl)",
      ExpressionAttributeNames: { "#c": "count" },
      ExpressionAttributeValues: {
        ":one": { N: "1" },
        ":ttl": { N: String(Math.floor(Date.now() / 1000) + 2 * 3600) },
      },
      ReturnValues: "ALL_NEW",
    })
  );
  if (Number(counter.Attributes?.count?.N ?? "0") > RATE_LIMIT_PER_HOUR) {
    return resp(429, { error: "too many requests" });
  }

  const clean = {};
  for (const [key, max] of Object.entries(MAX_LEN)) {
    if (typeof data[key] === "string" && data[key].trim()) {
      clean[key] = data[key].trim().slice(0, max);
    }
  }

  const id = randomUUID();
  await ddb.send(
    new PutItemCommand({
      TableName: TABLE,
      Item: {
        id: { S: id },
        receivedAt: { S: receivedAt },
        source: { S: String(data.source ?? "demo-form").slice(0, 40) },
        consent: { BOOL: true },
        sourceIp: { S: ip },
        userAgent: { S: (event.requestContext?.http?.userAgent ?? "unknown").slice(0, 300) },
        ...Object.fromEntries(Object.entries(clean).map(([k, v]) => [k, { S: v }])),
      },
    })
  );

  if (SES_ENABLED && NOTIFY_EMAIL && SENDER_EMAIL) {
    try {
      const lines = Object.entries(clean)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      await ses.send(
        new SendEmailCommand({
          FromEmailAddress: SENDER_EMAIL,
          Destination: { ToAddresses: [NOTIFY_EMAIL] },
          Content: {
            Simple: {
              Subject: { Data: `Demo request — ${clean.institution}` },
              Body: { Text: { Data: `${lines}\n\nid: ${id}\nreceived: ${receivedAt}` } },
            },
          },
        })
      );
    } catch (err) {
      console.error("SES send failed (submission already stored in DynamoDB)", err);
    }
  }

  return resp(200, { ok: true, id });
};
