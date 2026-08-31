# Contact intake — Lambda + API Gateway + DynamoDB + Platform CRM bridge

Live since 2026-07-14 in `ap-south-1`, account `ACCOUNT_ID`.

| Resource | Value |
|---|---|
| Public endpoint | `POST https://squarecampus.com/api/contact` — same-origin, proxied by the existing CloudFront distribution (existing ACM cert; no CORS preflight) |
| CloudFront | distribution `E3ATKH99UOL8C2`: origin `contact-api` → execute-api with secret `x-intake-edge-key` header; behavior `/api/*` (CachingDisabled + origin request policy `squarecampus-api-origin`, no viewer functions) |
| HTTP API | `squarecampus-contact` (`API_ID`), stage `$default`, throttle 5 rps / burst 10; routes `POST /contact` and `POST /api/contact` |
| Lambda | `squarecampus-contact-intake` (nodejs22.x, 128 MB, 10 s) — source: [index.mjs](index.mjs) |
| CRM retry worker | `squarecampus-contact-crm-retry` (nodejs22.x) — same package, `retryHandler` entry point |
| CRM queue | `squarecampus-contact-crm-retry` with an operator-visible redrive DLQ; message bodies contain only a submission UUID |
| Role | `squarecampus-contact-intake-role` (logs + PutItem/UpdateItem on the table + `ses:SendEmail` conditioned on `FromAddress=no-reply@squarecampus.com`) |
| DynamoDB | `squarecampus-contact-requests` (on-demand, PK `id`, TTL on `expiresAt`) — submissions **and** per-IP rate counters |
| CORS | not needed for browsers (same-origin); API-level CORS config remains but direct calls are blocked by the edge key anyway |
| CSP | `connect-src 'self'` — the same-origin path needs no extra allowance |

The site build bakes the endpoint in via `NEXT_PUBLIC_CONTACT_ENDPOINT` (see
DEPLOYMENT.md).

## Abuse safeguards

- Edge key: the Lambda rejects (403) any request without the
  `x-intake-edge-key` secret that only the CloudFront origin config carries —
  the public execute-api URL is a dead end. The secret lives only in the
  CloudFront origin config and the Lambda env (never in this repo).
- API Gateway stage throttling: 5 rps, burst 10 (cost cap).
- Per-IP rate limit in Lambda: `RATE_LIMIT_PER_HOUR` (5) submissions/hour via
  DynamoDB atomic counter (`ratelimit#<ip>#<hour>` items, TTL-cleaned), keyed
  on the real viewer IP from `CloudFront-Viewer-Address` (CloudFront-set, not
  client-spoofable).
- Origin allowlist (`ALLOWED_ORIGINS`): requests without a matching `Origin`
  header get 403 — filters bare curl/script spam.
- Honeypot (`website` field) honored server-side: 200, nothing stored.
- Validation: required fields, email shape, `consent: true`, per-field length
  caps, 20 KB body cap. Failures return 4xx and do not count against the rate
  limit.
- No submission content is logged to CloudWatch; PII lives only in the table.

## Platform CRM delivery

After the submission row is written, the intake Lambda delivers it to
`POST /api/platform/v1/crm/marketing-intake`. It uses a dedicated bridge
credential in `x-marketing-intake-key`; it is not a Platform user token and is
accepted by no other backend operation. The credential is stored separately in
AWS Secrets Manager and Azure Key Vault.

The submission UUID is the backend idempotency key. A successful delivery (or a
backend duplicate replay) records `delivered`/`duplicate` and the CRM lead id
on the DynamoDB row. A failed immediate call enqueues only that UUID. The retry
worker retrieves the original row, retries with the same idempotency key, and
lets SQS redrive exhausted failures to the DLQ. Neither Lambda logs contact
content or the bridge secret.

Required Lambda configuration, supplied only during deployment:

- `CRM_INTAKE_URL=https://crm-intake.internal/api/platform/v1/crm/marketing-intake`
- `CRM_BRIDGE_SECRET_ID` — AWS Secrets Manager id for the bridge secret
- `CRM_RETRY_QUEUE_URL` — retry queue URL (not the DLQ)

The intake role needs `sqs:SendMessage` only to the retry queue and
`secretsmanager:GetSecretValue` only to the CRM bridge secret in addition to
its existing permissions. The retry role needs DynamoDB `GetItem`/`UpdateItem`,
that one secret read, and SQS-trigger permissions only. Do not put PII in queue
messages or turn this into a generic backend credential.

The exact reviewed role documents are in [iam](iam/):
`contact-intake-access-policy.json`, `crm-retry-role-trust-policy.json`, and
`crm-retry-access-policy.json`. They are deliberately account/region-bound to
this temporary AWS marketing plane; do not reuse them for customer workloads.

## Reading submissions (until SES email lands)

```bash
aws dynamodb scan --region ap-south-1 --table-name squarecampus-contact-requests \
  --query "Items[?!starts_with(id.S, 'ratelimit#')]" --output json
```

## Updating the Lambda

```bash
cd infra/contact-intake
zip -j /tmp/contact-intake.zip index.mjs
aws lambda update-function-code --region ap-south-1 \
  --function-name squarecampus-contact-intake \
  --zip-file fileb:///tmp/contact-intake.zip
```

## Finishing the SES integration (once the mail domain is ready)

1. Verify the domain identity: `aws sesv2 create-email-identity --email-identity squarecampus.com --region ap-south-1`, add the three DKIM CNAMEs to Route 53.
2. Request production access for SES (out of sandbox) if notifications should reach unverified inboxes; not needed if `contact@squarecampus.com` is itself verified.
3. Flip the stub on — merge, don't replace, the env (EDGE_SECRET must
   survive; replacing the whole Variables map without it takes the form down):
   ```bash
   aws lambda get-function-configuration --region ap-south-1 \
     --function-name squarecampus-contact-intake --query 'Environment.Variables' \
     | jq '. + {SES_ENABLED: "true"}' \
     | jq '{Variables: .}' > /tmp/intake-env.json
   aws lambda update-function-configuration --region ap-south-1 \
     --function-name squarecampus-contact-intake \
     --environment file:///tmp/intake-env.json
   ```
4. Submit the live /demo form once and confirm the notification email arrives.
   SES failures never fail the request — submissions are stored in DynamoDB
   first, so nothing is lost even if email breaks.

## Quirks worth knowing

- The distribution maps origin 403/404 to the site's /404.html, so abusive
  callers hitting the 403 paths see an HTML 404 instead of JSON. Real browser
  flows are unaffected: 400 (validation) and 429 (rate limit) pass through as
  JSON, verified live.
- Do NOT enable `--disable-execute-api-endpoint` on the API: CloudFront's
  origin uses the execute-api hostname. The edge key already makes direct
  calls useless.
- If the endpoint or path ever changes, remember the CloudFront behavior
  `/api/*` and the API route `POST /api/contact` must match.
