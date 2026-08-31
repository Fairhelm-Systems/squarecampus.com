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
//   - Human check: a traced-wire board rendered here as a PNG, whose answer
//     never leaves this function. See challenge.mjs. A submission must carry
//     a signed pass token from a solved board.
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
//   CHALLENGE_SECRET     HMAC key for human-check pass tokens. Its ABSENCE is
//                        meaningful: with no secret the check is not enforced
//                        and submissions are accepted exactly as before. That
//                        is what makes the rollout safe — ship this function,
//                        then the site, then set the secret to switch
//                        enforcement on without a window where the live form
//                        rejects everyone.
import { randomUUID } from "node:crypto";
import {
  DeleteItemCommand,
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { BOARD, generateBoard, newNonce, signPass, TOLERANCE, verifyPass } from "./challenge.mjs";

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
const CHALLENGE_SECRET = process.env.CHALLENGE_SECRET;
const HUMAN_CHECK_ENABLED = Boolean(CHALLENGE_SECRET);

/** A board is worth solving for ten minutes; a solved board is worth posting
 *  for twenty. Both are far longer than a real visitor needs and far shorter
 *  than a harvested token stays useful. */
const BOARD_TTL_SECONDS = 600;
const PASS_TTL_SECONDS = 1200;
/** Boards handed out per IP per hour. A visitor who keeps getting it wrong is
 *  still well inside this; a script grinding for a lucky guess is not. */
const BOARDS_PER_HOUR = 20;
/**
 * Wrong answers per IP before new boards stop being issued.
 *
 * The hourly cap is the one a mistyped drag hits, and it clears on its own.
 * The daily cap is the one that matters against a script: without it an
 * attacker simply waits out each hour, and three guesses an hour against a
 * ~60-dot board adds up to a near-certain hit inside a day. With it, the same
 * attacker gets five guesses a day from one address. A person who has failed
 * five boards in a day is not being served by this form anyway, and the
 * fallback shown to them is the address a real enquiry can just email.
 */
const WRONG_ANSWERS_PER_HOUR = 3;
const WRONG_ANSWERS_PER_DAY = 5;

const ddb = new DynamoDBClient({});
const secrets = new SecretsManagerClient({});

const REQUIRED = ["name", "email", "phone", "institution", "role", "campusCount"];
// Allowlist: anything not named here is dropped rather than stored.
// `enquiryType` distinguishes a guided demo from a Founding Institutional
// Partnership enquiry. The website also folds the same intent into `source`
// (e.g. `demo-form:founding-partner`), which this function already stores —
// so intent is never lost even before this handler is redeployed.
//
// The five founding-partner fields at the end are sent only by a Founding
// Institutional Partnership enquiry (a generic demo submission omits them
// entirely). Until this handler is redeployed they are dropped, so ship the
// Lambda before or with the site build that starts collecting them —
// otherwise the diagnosis answers are silently lost.
const MAX_LEN = {
  enquiryType: 60,
  name: 200,
  email: 254,
  phone: 32,
  institution: 300,
  role: 100,
  campusCount: 40,
  currentSystem: 300,
  primaryPain: 200,
  message: 5000,
  bottleneck: 2000,
  pilotUnit: 300,
  executiveSponsor: 200,
  timeSensitivity: 60,
  successMeasure: 500,
};

const resp = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

/** Client IP as CloudFront sees it, falling back to the API Gateway view. */
function viewerIp(event) {
  const viewerAddress = event.headers?.["cloudfront-viewer-address"];
  return viewerAddress
    ? viewerAddress.slice(0, viewerAddress.lastIndexOf(":"))
    : (event.requestContext?.http?.sourceIp ?? "unknown");
}

/**
 * Atomic per-IP counter in the submissions table, bucketed by hour.
 *
 * `by: 0` reads the current value without spending an attempt, which is how
 * the board endpoint checks the wrong-answer budget before deciding to issue.
 */
async function bumpCounter(key, by, ttlSeconds) {
  const out = await ddb.send(
    new UpdateItemCommand({
      TableName: TABLE,
      Key: { id: { S: key } },
      UpdateExpression: "ADD #c :n SET expiresAt = if_not_exists(expiresAt, :ttl)",
      ExpressionAttributeNames: { "#c": "count" },
      ExpressionAttributeValues: {
        ":n": { N: String(by) },
        ":ttl": { N: String(Math.floor(Date.now() / 1000) + ttlSeconds) },
      },
      ReturnValues: "ALL_NEW",
    })
  );
  return Number(out.Attributes?.count?.N ?? "0");
}

const hourBucketNow = () => new Date().toISOString().slice(0, 13);

// --- human check ---------------------------------------------------------

/**
 * Hand out a board.
 *
 * The response carries the picture and where the tile starts. It deliberately
 * does not carry where the tile belongs, nor the positions of the dots: with
 * either of those the puzzle collapses into a form field a script can fill.
 * The answer is written here, against a one-time id, and read back once.
 */
async function issueBoard(data, ip) {
  const hour = hourBucketNow();
  const day = hour.slice(0, 10);
  const [wrongHour, wrongDay] = await Promise.all([
    bumpCounter(`humanfail#${ip}#${hour}`, 0, 7200),
    bumpCounter(`humanfailday#${ip}#${day}`, 0, 172800),
  ]);
  if (wrongHour >= WRONG_ANSWERS_PER_HOUR || wrongDay >= WRONG_ANSWERS_PER_DAY) {
    return resp(429, { error: "too many attempts" });
  }

  const issued = await bumpCounter(`humanboard#${ip}#${hour}`, 1, 7200);
  if (issued > BOARDS_PER_HOUR) return resp(429, { error: "too many attempts" });

  const board = generateBoard(data.theme === "dark" ? "dark" : "light");
  const id = newNonce();
  await ddb.send(
    new PutItemCommand({
      TableName: TABLE,
      Item: {
        id: { S: `board#${id}` },
        x: { N: String(board.answer.x) },
        y: { N: String(board.answer.y) },
        expiresAt: { N: String(Math.floor(Date.now() / 1000) + BOARD_TTL_SECONDS) },
      },
    })
  );

  return resp(200, {
    id,
    image: `data:image/png;base64,${board.png.toString("base64")}`,
    width: BOARD.w,
    height: BOARD.h,
    start: board.start,
    tolerance: TOLERANCE,
  });
}

/**
 * Mark one board.
 *
 * The board is deleted before the answer is compared, so every board is worth
 * exactly one guess whether that guess is right or wrong. Without that, a
 * script could sit on a single board and walk the dots.
 */
async function markBoard(data, ip) {
  const id = typeof data.id === "string" ? data.id : "";
  const x = Number(data.x);
  const y = Number(data.y);
  if (!id || id.length > 64 || !Number.isFinite(x) || !Number.isFinite(y)) {
    return resp(400, { error: "invalid answer" });
  }

  const burned = await ddb.send(
    new DeleteItemCommand({
      TableName: TABLE,
      Key: { id: { S: `board#${id}` } },
      ReturnValues: "ALL_OLD",
    })
  );
  const previous = burned.Attributes;
  if (!previous) return resp(200, { ok: false, expired: true });
  if (Number(previous.expiresAt?.N ?? "0") < Math.floor(Date.now() / 1000)) {
    return resp(200, { ok: false, expired: true });
  }

  const off = Math.hypot(x - Number(previous.x.N), y - Number(previous.y.N));
  if (off > TOLERANCE) {
    const hour = hourBucketNow();
    await Promise.all([
      bumpCounter(`humanfail#${ip}#${hour}`, 1, 7200),
      bumpCounter(`humanfailday#${ip}#${hour.slice(0, 10)}`, 1, 172800),
    ]);
    return resp(200, { ok: false });
  }

  return resp(200, { ok: true, pass: signPass(CHALLENGE_SECRET, newNonce(), PASS_TTL_SECONDS) });
}

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
      event.isBase64Encoded
        ? Buffer.from(event.body, "base64").toString("utf8")
        : (event.body ?? "{}")
    );
  } catch {
    return resp(400, { error: "invalid JSON" });
  }

  // The human check rides on the same function, origin allowlist and edge key
  // as the form itself. Both of its routes are POST so that browsers attach an
  // Origin header — a same-origin GET does not, which would leave the origin
  // allowlist above checking nothing.
  const path = event.requestContext?.http?.path ?? event.rawPath ?? "";
  if (path.endsWith("/challenge") || path.endsWith("/challenge/solve")) {
    if (!HUMAN_CHECK_ENABLED) return resp(503, { error: "human check unavailable" });
    const ip = viewerIp(event);
    return path.endsWith("/solve") ? markBoard(data, ip) : issueBoard(data, ip);
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

  // One solved board, one submission. The token is signed rather than looked
  // up, so a valid one costs no read; the nonce inside it is burned here with
  // a conditional write, so a replay costs one failed write and nothing else.
  if (HUMAN_CHECK_ENABLED) {
    const pass = verifyPass(CHALLENGE_SECRET, data.humanToken);
    if (!pass) return resp(400, { error: "human check required" });
    try {
      await ddb.send(
        new PutItemCommand({
          TableName: TABLE,
          Item: {
            id: { S: `pass#${pass.nonce}` },
            expiresAt: { N: String(Math.floor(Date.now() / 1000) + PASS_TTL_SECONDS + 60) },
          },
          ConditionExpression: "attribute_not_exists(id)",
        })
      );
    } catch (err) {
      if (err.name === "ConditionalCheckFailedException") {
        return resp(400, { error: "human check already used" });
      }
      throw err;
    }
  }

  const ip = viewerIp(event);
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
        // A founding-partner diagnosis and a guided demo need different
        // response times, so the difference belongs in the subject line
        // rather than three lines into the body.
        subject: `${clean.enquiryType || "Demo request"} — ${clean.institution}`,
        text: `${lines}\n\nid: ${id}\nreceived: ${receivedAt}`,
        replyTo: clean.email,
      });
    } catch (err) {
      console.error("M365 notify failed (submission already stored in DynamoDB)", err);
    }
  }

  return resp(200, { ok: true, id });
};
