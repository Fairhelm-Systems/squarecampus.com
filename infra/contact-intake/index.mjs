// squarecampus-contact-intake — Lambda behind API Gateway (HTTP API).
// Receives /demo form submissions, stores them in DynamoDB, and emails a
// notification via Microsoft 365 (Graph API, app-only OAuth). Mail failures
// never fail the request: the submission is already stored in DynamoDB by then.
//
// Traffic path: browsers call https://squarecampus.com/api/contact (same
// origin, no CORS preflight); CloudFront proxies to API Gateway with a shared
// secret header. Direct execute-api calls without the secret are rejected.
//
// Abuse safeguards (layered with API Gateway stage throttling):
//   - Edge key: requests must carry the x-intake-edge-key header that only
//     the CloudFront origin config knows.
//   - Origin allowlist: browsers send Origin on every POST.
//   - Per-IP rate limit via DynamoDB atomic counter, RATE_LIMIT_PER_HOUR/hr.
//   - Honeypot field honored server-side (pretend success, store nothing).
//   - Strict validation + 20KB body cap. No PII written to CloudWatch.
//
// Env vars:
//   TABLE_NAME           DynamoDB table for submissions + rate counters
//   EDGE_SECRET          shared secret set as a CloudFront origin header
//   ALLOWED_ORIGINS      comma-separated Origin allowlist
//   RATE_LIMIT_PER_HOUR  per-IP submission cap (default 5)
//   NOTIFY_EMAIL         where notifications are sent (hello@fairhelmsystems.com)
//   M365_SENDER          M365 mailbox to send AS (hello@fairhelmsystems.com)
//   M365_SECRET_ID       Secrets Manager secret id holding JSON
//                        {tenantId, clientId, clientSecret} for the Entra app
import { randomUUID } from "node:crypto";
import { DynamoDBClient, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

const TABLE = process.env.TABLE_NAME;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? "https://squarecampus.com")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
const RATE_LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR ?? "5");
const EDGE_SECRET = process.env.EDGE_SECRET;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
const M365_SENDER = process.env.M365_SENDER;
const M365_SECRET_ID = process.env.M365_SECRET_ID;
const MAIL_ENABLED = Boolean(M365_SECRET_ID && NOTIFY_EMAIL && M365_SENDER);

const ddb = new DynamoDBClient({});
const secrets = new SecretsManagerClient({});

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

// --- Microsoft 365 Graph mailer (app-only OAuth, client credentials) ---
let cachedCreds = null;
let cachedToken = null;

async function getCreds() {
  if (cachedCreds) return cachedCreds;
  const out = await secrets.send(new GetSecretValueCommand({ SecretId: M365_SECRET_ID }));
  cachedCreds = JSON.parse(out.SecretString);
  return cachedCreds;
}

async function getToken() {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) return cachedToken.value;
  const { tenantId, clientId, clientSecret } = await getCreds();
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    scope: "https://graph.microsoft.com/.default",
  });
  const r = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!r.ok) throw new Error(`token ${r.status}: ${await r.text()}`);
  const j = await r.json();
  cachedToken = { value: j.access_token, expiresAt: now + (j.expires_in ?? 3600) * 1000 };
  return cachedToken.value;
}

async function sendNotification({ subject, text, replyTo }) {
  const token = await getToken();
  const message = {
    subject,
    body: { contentType: "Text", content: text },
    toRecipients: [{ emailAddress: { address: NOTIFY_EMAIL } }],
  };
  if (replyTo) message.replyTo = [{ emailAddress: { address: replyTo } }];
  const r = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(M365_SENDER)}/sendMail`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ message, saveToSentItems: false }),
    }
  );
  if (!r.ok) throw new Error(`sendMail ${r.status}: ${await r.text()}`);
}

export const handler = async (event) => {
  if (event.requestContext?.http?.method !== "POST") {
    return resp(405, { error: "method not allowed" });
  }

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

  const viewerAddress = event.headers?.["cloudfront-viewer-address"];
  const ip = viewerAddress
    ? viewerAddress.slice(0, viewerAddress.lastIndexOf(":"))
    : (event.requestContext?.http?.sourceIp ?? "unknown");
  const receivedAt = new Date().toISOString();
  const hourBucket = receivedAt.slice(0, 13);
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

  if (MAIL_ENABLED) {
    try {
      const lines = Object.entries(clean)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      await sendNotification({
        subject: `Demo request — ${clean.institution}`,
        text: `${lines}\n\nid: ${id}\nreceived: ${receivedAt}`,
        replyTo: clean.email,
      });
    } catch (err) {
      console.error("M365 notify failed (submission already stored in DynamoDB)", err);
    }
  }

  return resp(200, { ok: true, id });
};
