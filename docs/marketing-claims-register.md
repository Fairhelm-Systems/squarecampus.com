# Marketing Claims Register

Last updated: 2026-09-28 (data retention page and exit-claim reconciliation). Previous: 2026-09-09
(commercial-consistency pass: canonical commercial facts in
`src/content/commercial.ts`, identity model by plan, two-position Founding Partner
programme, generated /llms.txt and Markdown alternates).

Every security, infrastructure, AI, rollout, customer, and compliance claim that appears
(or previously appeared) on squarecampus.com, with its status. Statuses:

- **VERIFIED** — evidenced by this repository, public third-party fact, or company registration.
- **NEEDS BACKEND EVIDENCE** — plausible design/product statement; must be evidenced from the
  product/infrastructure before it can be strengthened beyond "designed to / posture" wording.
- **NEEDS LEGAL REVIEW** — commitment or legal statement that counsel must sign off.
- **REMOVE** — removed from the site in this change; must not return (enforced by
  `scripts/check-claims.sh`, which runs on every build).

## Customer, ranking, and testimonial claims

| Claim | Where it appeared | Status |
| --- | --- | --- |
| "India's #1 school management system" | /school-management-system metadata, OG/Twitter | **REMOVE** (removed; no ranking evidence) |
| "Trusted by 500+ schools" / "500+ schools trust SquareCampus" | /school-management-system, /why-squarecampus metadata + keywords | **REMOVE** (removed; no customer-count evidence) |
| "India's leading School OS / school management system" | seo.ts ContactPage schema, /faq OG | **REMOVE** (removed) |
| "Best School Management System in India" (title framing) | /school-management-system title | **REMOVE** (retitled descriptively) |
| "What we learned from 50+ school visits" + "six months visiting schools across four states" | blog: why-squarecampus-exists | **REMOVE** (rewritten as general observations; restore only with real field-visit records) |
| "We met a school accountant / principal / transport coordinator…" (specific encounters) | blog: why-squarecampus-exists | **REMOVE** (reframed as hypotheticals; restore only with consented, real accounts) |
| "the schools we serve" / community sessions we host | blog: why-squarecampus-exists | **REMOVE** (reworded to intent; restore with real customers/sessions) |
| numberOfEmployees 10–50, foundingDate 2023, hiring-org schema | /careers JSON-LD | **REMOVE** (removed; page is noindex) |
| Fake LocalBusiness address (Mumbai, 400001), geo coordinates, opening hours, placeholder phone | root layout + seo.ts JSON-LD | **REMOVE** (removed) |
| SearchAction pointing to non-existent /search | root layout JSON-LD | **REMOVE** (removed) |
| "Offer: price 0 INR" implying a free product | root layout + /school-management-system JSON-LD | **REMOVE** (removed) |

## Infrastructure claims

| Claim | Where | Status |
| --- | --- | --- |
| Runs on AWS Mumbai (ap-south-1) | /infrastructure, /services, comparisons, llms.txt | **NEEDS BACKEND EVIDENCE** — stated as current architecture; keep only while true. Evidence: AWS account/region of app.squarecampus.com production stack. |
| Multi-AZ architecture | /infrastructure, /services | **NEEDS BACKEND EVIDENCE** (stated as design; evidence: infra-as-code / AWS console) |
| "99.99% SLA (AWS)" and "99.97% actual measured" uptime | /infrastructure (old) | **REMOVE** (removed; forbidden by check script. Reinstate only with a real, contractual SLA and real measurement) |
| "RTO 4 hours, RPO 15 minutes, tested quarterly" | /infrastructure (old) | **REMOVE** (removed; reinstate only with documented, tested DR objectives) |
| "Backups every 15 minutes / 35-day recovery window / 99.999999999% durability" | /infrastructure (old) | **REMOVE** (replaced with "automated, encrypted backups; cadence documented in review"; reinstate with real backup config) |
| "Only you hold the keys" / "Even we cannot read your raw data" | /infrastructure (old) | **REMOVE** (removed; forbidden. Customer-held keys is not the current design as evidenced anywhere) |
| "Residency verified monthly / monthly public infrastructure reports / CloudTrail logs published" | /infrastructure (old), comparisons | **REMOVE** (removed; no such reports exist. Reinstate if/when reports are actually published) |
| "Technically impossible for data to leave Mumbai" / SCP absolutes | /infrastructure (old) | **REMOVE** (softened to "controls designed to restrict"; evidence for stronger wording: SCP policy export) |
| Fake "live status" panel ("No incidents reported", "All replicas synchronized") | /infrastructure (old) | **REMOVE** (removed; forbidden. Reinstate only as a real status-page integration) |
| ISO 27001 / SOC 2 / PCI DSS presented as our compliance | /infrastructure (old) | **REMOVE** as our claims. AWS facility certifications are AWS's (public fact — VERIFIED as attributed to AWS). Application-level certification claims require actual certification. |
| "₹1–5 Cr upfront… AWS is cheaper" cost comparisons | /infrastructure (old) | **REMOVE** (removed; unverifiable market figures) |
| "In 5+ years of AWS Mumbai operations, no region-wide outage" | /infrastructure (old) | **REMOVE** (removed; not our claim to make and not verified) |
| Encryption in transit and at rest | /security, /infrastructure, FAQ | **NEEDS BACKEND EVIDENCE** (stated as baseline design; evidence: TLS config, storage encryption settings) |
| TLS 1.3 / AES-256 specific ciphers | /school-management-system, faq.ts, llms.txt (old) | **REMOVE** as specifics (generalized to "encryption in transit and at rest"; reinstate with config evidence) |
| DDoS protection, private networking, WAF ("never directly exposed") | /infrastructure | **NEEDS BACKEND EVIDENCE** (softened to "designed to sit behind managed network protections") |

## Security & compliance claims

| Claim | Where | Status |
| --- | --- | --- |
| Role-based access control, scoped permissions | many pages | **NEEDS BACKEND EVIDENCE** (product design statement; evidence: product RBAC implementation) |
| "5-tier RBAC (Organization/School/Campus/Department/Staff)" | faq.ts | **NEEDS BACKEND EVIDENCE** (specific product structure) |
| Audit trails on every record/action | many pages | **NEEDS BACKEND EVIDENCE** |
| "Immutable audit trails" | /school-management-system (old) | **REMOVE** as "immutable" (softened; "immutable" is a strong technical guarantee needing evidence) |
| "Regular penetration testing" / "OWASP guidelines" | faq.ts (old) | **REMOVE** (removed; reinstate with pentest reports) |
| "SSO-ready" | /school-management-system FAQ (old) | **REMOVE** (replaced by the identity model below; the phrase is forbidden by `check-claims.sh`) |
| MFA for administrative access, remote device wipe | /security JSON-LD (old) | **REMOVE** (removed; reinstate with internal IT policy evidence) |
| India data residency / "hosted in India by default, no cross-border transfers" | /security (old), faq.ts (old), blog | **NEEDS BACKEND EVIDENCE** — softened everywhere to "designed with an India-first hosting/residency posture". Hard residency guarantees also **NEEDS LEGAL REVIEW** before contractual use. |
| "Designed to support DPDP Act / IT Act 2000 obligations" | faq.ts, /school-management-system | **NEEDS LEGAL REVIEW** (kept in softened "designed to support" form) |
| "GDPR aligned", "SOC 2 practices" | /security metadata (old) | **REMOVE** (removed; no certification/assessment evidence) |
| "Bank-grade security" | /security, /infrastructure (old) | **REMOVE** (removed; forbidden phrase) |
| Data export within 30 days of exit, CSV/JSON, deletion of all data after transition | faq.ts (old) | **REMOVE** (removed 2026-09-28; no deadline, format or complete-deletion commitment is evidenced, and the DPA is narrower. Forbidden by `check-claims.sh`. See "Data retention and exit" below) |
| "The platform includes consent management, data retention controls, and export capabilities" | faq.ts (old) | **REMOVE** (removed 2026-09-28; designed and partly built in the platform's data layer but not available for institutional data) |
| "Ensuring GDPR … compliance" | /data-processing-addendum metadata (old) | **REMOVE** (metadata now describes the document; no GDPR assessment exists) |
| Security questionnaire support / documentation on request | /security, /infrastructure | **VERIFIED** as an offer (it is a commitment to respond, not a certification) |

## AI (AEGIS) claims

| Claim | Where | Status |
| --- | --- | --- |
| AEGIS answers within the same RBAC scopes as the platform | /aegis, home, comparisons | **NEEDS BACKEND EVIDENCE** (product design statement) |
| Every AEGIS query lands on the audit trail | /aegis, comparisons | **NEEDS BACKEND EVIDENCE** |
| Tenant boundaries respected; data not pooled into external models | /aegis | **NEEDS BACKEND EVIDENCE** + **NEEDS LEGAL REVIEW** (interacts with /ai-policy commitments) |
| "We do not use customer data to train general-purpose AI models without explicit consent" | /ai-policy | **NEEDS LEGAL REVIEW** (policy commitment; left untouched as legal language) |
| Exception detection across attendance/fees/academics | /aegis, home | **NEEDS BACKEND EVIDENCE** (capability claim) |

## Rollout & support claims

| Claim | Where | Status |
| --- | --- | --- |
| "Most schools launch in days" / "2–4 weeks implementation" / Day 0–14 timeline | /school-management-system, faq.ts, llms.txt (old) | **REMOVE** as fixed timelines (softened to guided sequence agreed during scoping; reinstate with real rollout data) |
| Guided rollout: migration, role-based training, parallel run, named counterparts | many pages | **NEEDS BACKEND EVIDENCE** (service-model commitment; keep only while the team actually staffs it) |
| "Zero data loss" migration | seo.ts contact FAQ (old), faq.ts (old) | **REMOVE** (softened to parallel-run validation) |
| Reply within one business day | demo form, contact copy | **NEEDS BACKEND EVIDENCE** (operational commitment; keep only while honored) |
| "40–60% reduction in admin tasks", "ROI within the first academic year" | faq.ts (old) | **REMOVE** (removed; reinstate with measured customer data) |
| "Zero-downtime releases", "public changelog" | faq.ts (old) | **REMOVE** (softened; reinstate with release-process evidence / an actual public changelog) |
| Mobile apps for parents/students (iOS + Android) included | faq.ts, comparisons | **NEEDS BACKEND EVIDENCE** (product capability; verify app-store presence before strengthening) |
| Pre-built integrations (payment gateways, government portals), REST APIs, webhooks | faq.ts, /services | **NEEDS BACKEND EVIDENCE** |
| "Headcount-based" / "student + staff" pricing, "implementation and training included" | /school-management-system, comparisons, intent pages, blog (old) | **REMOVE** (contradicted /pricing/: the licence is on active enrolled students in volume bands and implementation is scoped separately; both phrases are forbidden by `check-claims.sh`) |
| "No prices are published" / "no figures are published" | llms.txt, plan matrix, sitemap comment (old) | **REMOVE** as wording (replaced by `pricingAvailability.short` in `content/commercial.ts`: the model is published, figures follow a written proposal after discovery). **Public rate cards are intentionally out of scope** (decision 2026-09-10): this is deliberate enterprise positioning, not an incomplete page. No surface may imply that public numeric pricing is expected or missing, and no figure may be added. |
| Included vs separately scoped (licence covers plan capability, standard apps, standard onboarding; migration, integrations, custom engineering, premium implementation, private/on-prem deployment, exceptional SLA, metered usage scoped separately) | /pricing, /faq, /school-management-system, llms.txt | **NEEDS LEGAL REVIEW** (commercial policy; must match the proposal and order form) |
| "SquareCampus will look expensive to an institution that needs only attendance, fees and report cards" (fit qualification) | /pricing, /faq, llms.txt | **VERIFIED** as positioning (a statement of intent, not a market claim) |

## Identity and access (by plan)

Stated once in `src/content/commercial.ts` (`identity`) and rendered on /pricing,
/security, /faq, /school-management-system and llms.txt. Checked against the
platform implementation on 2026-09-09 (`square_campus.backend.py`,
`platform/auth.py`: Entra ID bearer-token validation for one configured directory,
MFA evidence preserved from `amr`; no credential login route, no Google Workspace,
SAML, SCIM, multi-directory federation or break-glass path implemented).

| Claim | Where | Status |
| --- | --- | --- |
| Every plan includes SquareCampus-managed credentials with role-based access | pricing, security, faq | **LAUNCH-BLOCKING BACKEND DEPENDENCY** (decision 2026-09-10). The website doctrine is the target product contract: credential authentication is the baseline in every plan. The current Python backend authenticates Entra tokens only, which is a known implementation gap to close before launch — the public model is not weakened to match the temporary state. Track in the backend repository. |
| Privileged roles "designed to carry additional sign-in verification" | pricing, security, faq | **NEEDS BACKEND EVIDENCE** (design wording only) |
| Pro: optional Microsoft Entra ID SSO for the institution's own tenant, subject to technical onboarding | pricing, security, faq, blog | **NEEDS BACKEND EVIDENCE** (Entra validation exists for one configured directory; per-institution tenant onboarding is the deployment configuration to evidence) |
| Enterprise: identity governance (multi-directory, group-to-role mappings, SSO enforcement policy, lifecycle controls, identity migration, identity audit) "scoped as Enterprise requirements during technical discovery" | pricing, security, faq | **NEEDS BACKEND EVIDENCE** — worded as scoped requirements, never as shipped features. None of these is implemented today. |
| Google Workspace SSO | — | **ABSENT.** Not implemented anywhere; must not be advertised until it is. `check-claims`/tests forbid "Google Workspace SSO". |
| SAML / SCIM by name | pricing scoped list (old) | **REMOVE** as named capabilities (not implemented; replaced by the generic "identity governance requirements" wording) |
| "Enterprise includes Entra ID SSO for one approved institutional tenant" | pricing, security, faq (old) | **REMOVE** (SSO is optional from Pro; the tenant cap is not the Enterprise differentiator; forbidden by `check-claims.sh`) |
| Break-glass access | — | **ABSENT.** No such mechanism exists; do not describe one. |
| Authorisation stays in SquareCampus; never derived from email/domain alone | security, pricing, faq | **VERIFIED** as design (backend: Entra `tid` is directory metadata only; authority resolved server-side from memberships) |

## Data retention and exit

Public wording lives in `src/content/retention.ts` and renders on `/data-retention/`,
the pricing plan bands, the FAQ and `/llms.txt`. The reviewed retention schedule is
rendered only from rules that pass `publicationBlocker()` (qualified review of the
exact version, recorded by reference); no rule has passed, so the page shows the
empty-schedule notice. Legal research, proposed periods and review records are kept
outside this repository. Approval of website wording is not legal review.

| Claim | Where | Status |
| --- | --- | --- |
| "Your plan does not determine your legal retention obligations. Storage and archive arrangements are specified in your proposal and order form." | /pricing (every plan band and the comparison), llms.txt | **NEEDS LEGAL REVIEW** as commercial policy (must match the proposal and order form); the principle itself is approved website wording (2026-09-28) |
| Institution is the Data Fiduciary for its records; SquareCampus processes them as Data Processor under the DPA | /data-retention | **VERIFIED** as a restatement of the published DPA and Privacy Policy |
| Contract end: delete/anonymise or return where export is agreed; retention for law, disputes, backups | /data-retention, faq.ts | **VERIFIED** as a restatement of DPA §11. Substantive terms unchanged; any change needs counsel |
| Export scope, formats, timing, responsibilities and charges agreed in the order form; no published format or turnaround; no self-service institution-wide export | /data-retention, faq.ts, homepage, /launch-partners FAQ, blog `school-erp-data-exit` | **VERIFIED** as the approved position (2026-09-28). No institution-wide export capability is evidenced in the platform |
| Retention deadlines, preservation holds and consent withdrawal "being built into the platform's data layer", not available for institutional data | /data-retention | **NEEDS BACKEND EVIDENCE** before any stronger wording: design and synthetic-only implementation exist; nothing runs on institutional data |
| Website enquiries: stored with IP address and browser details, passed to the CRM, notified by email; anti-abuse records set to expire automatically | /data-retention | **VERIFIED** against `infra/contact-intake/index.mjs` and the live table configuration (2026-09-28). Submission records carry no expiry |
| No retention period yet for website enquiries or their CRM, email and log copies | /data-retention | **VERIFIED** as a statement of the current gap. Setting a period is an operational decision, not a website change |
| Backup retention periods for production not stated | /data-retention | **VERIFIED** as a statement of the gap. Backup cadence and retention remain **NEEDS BACKEND EVIDENCE** (see Infrastructure claims) |
| Preservation and data requests made in writing and assessed individually; no self-service preservation control | /data-retention | **VERIFIED** as the approved handling arrangement (2026-09-28). No automated or tested fulfilment is claimed |
| Official source references (DPDP Act 2023, DPDP Rules 2025, CBSE Affiliation Bye-Laws Ch. 14) | /data-retention | **VERIFIED** as references only (official URLs read 2026-09-28). No period, interpretation or applicability is drawn from them on the site |
| "Retention schedule is under legal review" | — | **ABSENT.** No qualified legal review is established; forbidden by `check-claims.sh` |
| Statutory penalty figures and consequences | — | **ABSENT** by decision (2026-09-28): not published in this change |
| "Complete exports in standard formats" / "within 30 days of request" | homepage, /launch-partners FAQ, blog "Our own posture", faq.ts (old) | **REMOVE** (removed; forbidden by `check-claims.sh`) |

Still open (not changed in this pass): blog posts `founding-institutional-partner-pilot`
and `eighteen-thousand-rupee-school-erp-true-cost` and the DPDP checklist post describe
exports "in standard formats" as SquareCampus practice; they need the same
reconciliation before those statements are relied on.

## Company & legal facts

| Claim | Where | Status |
| --- | --- | --- |
| SquareCampus is a product of Fairhelm Systems OPC | footer, press, about, competitor-notice | **VERIFIED** (company record; ™ used, not ® — registration pending) |
| SquareCampus™ (trademark pending, not registered) | footer, llms.txt | **VERIFIED** (keep ™; never ® until registration completes) |
| Founder-led; Mohit Gupta, Founder & CTO | about, press | **VERIFIED** (company fact) |
| "Built systems processing 100M+ records daily" (founder bio) | about | **NEEDS BACKEND EVIDENCE** (personal-history claim; keep or remove at founder's discretion) |
| Location: Bangalore, India (footer) | footer | **VERIFIED** (company fact; note: old Mumbai JSON-LD address removed as fabricated) |

## Founding Institutional Partner programme

Programme facts live in `src/content/commercial.ts` (`foundingProgramme`); the copy
in `src/content/founding-partners.ts` derives from them, so the homepage section,
`/launch-partners/`, the higher-education lane, the FAQ and llms.txt cannot
describe different programmes. `tests/commercial.test.ts` fails if the position
count is not exactly two or the discount is not 40%.

| Claim | Where | Status |
| --- | --- | --- |
| Exactly two positions, ever: one school or eligible school institution, one university; the programme closes permanently once both are allocated | all programme surfaces | **VERIFIED** as commercial policy (product decision 2026-09-09; not a scarcity device — no countdown, no "seats remaining") |
| "A strategic capital commitment under a separately executed agreement", material participation in product validation, structured roadmap input | all programme surfaces | **NEEDS LEGAL REVIEW** (the executed agreement, not the website, carries the terms) |
| Protected 40% discount on Enterprise commercial terms | all programme surfaces | **NEEDS LEGAL REVIEW** (must match the executed agreement). No duration is stated or inferred, and "lifetime" is forbidden. |
| White-labelled mobile apps without the standard white-label charge | programme surfaces, /pricing, /faq | **NEEDS LEGAL REVIEW** (entitlement under the agreement) |
| Defined roadmap influence — explicitly not a veto, roadmap ownership, product/architectural control, IP ownership or unlimited custom development; SquareCampus retains final product, architecture, security and engineering authority | programme surfaces | **VERIFIED** as boundary wording |
| Founder-led rollout with a named implementation counterpart | homepage section, /launch-partners | **NEEDS BACKEND EVIDENCE** (service commitment; keep only while the team actually staffs it — same standing as the guided-rollout claim above) |
| Early access to selected capabilities, written consideration of major workflow proposals | /launch-partners | **NEEDS LEGAL REVIEW** (bounded entitlement; never describe as unlimited) |
| "Small cohort", "first cohort", "price protection for the agreed initial term", "pre-agreed expansion bands", "not an investment" | old copy | **REMOVE** (superseded by the two-position model; the cohort and initial-term phrases are forbidden by `check-claims.sh`) |
| Priority escalation and capacity planning around peak cycles | homepage section, /launch-partners | **NEEDS BACKEND EVIDENCE** (operational commitment) |
| Managed digital campus: websites, microsites, hosting, SSL, CDN, backups | /launch-partners | **SCOPED — NOT INCLUDED BY DEFAULT.** The page states site count, migration, traffic, storage and change allowances are defined in the proposal, and that this is not an unlimited creative-services retainer. Do not weaken that note. |
| 60–90 day pilot, written baseline, convert/extend/stop | /launch-partners, /pricing | **VERIFIED** (already the published pricing doctrine; this page reuses it, it does not invent it) |

Deliberately **absent**, and must stay absent from public copy:

- Equity, shares, warrants, board seats, or any securities language. 
- Guaranteed lifetime pricing or a perpetual discount.
- Unlimited development, support, hosting, storage or AI usage.
- Exclusivity, territory rights, or a veto over other customers or sectors.
- Any ownership of SquareCampus source code or intellectual property.
- Named launch partners, customer logos, testimonials or outcome numbers.
- "Limited seats remaining", countdowns, or any invented scarcity number.
  "Two positions, ever" is the programme's actual structure, stated plainly;
  it is never dressed up as urgency.
- Any duration for the 40% protection, and the word "lifetime".

## Machine-readable surfaces

- `/llms.txt` is generated at build time (`src/app/llms.txt/route.ts` from
  `src/content/llms.ts` and `src/content/commercial.ts`). It contains facts and
  links only — no instructions to assistants. `tests/llms.test.ts` checks its
  structure, that every link is an indexable sitemap route, and that no stale
  claim survives.
- Markdown alternates (`/<route>/index.md`) are generated after `next build`
  by `scripts/markdown-alternates.ts` from the rendered HTML of the routes in
  `src/content/markdown-alternates.ts`, and advertised with
  `<link rel="alternate" type="text/markdown">`. `scripts/check-build.ts`
  verifies each one exists, keeps its H1 and carries no stale claim.
- JSON-LD uses stable ids (`/#org`, `/#website`, `/#software`, `<page>#webpage`)
  and the one canonical short description (`product.shortDescription`). No
  AggregateRating, Review, priced Offer, award or customer-count node may be
  added; `check-build` fails the build if one appears.

## Motion assets

The rendered compositions in `public/motion/` are marketing surfaces and are
held to the same standard. They contain **no** customer names, telemetry, fee
collection rates, test scores, uptime figures or certifications. Labels such as
"Campus A" and "Fee ledger" are illustrative structure, not data. The founding
partner composition shows Convert, Extend and Stop with equal visual weight
precisely so it cannot be read as promising conversion.

## Legal documents flagged for counsel review

All substantive legal language was left unedited; each file now carries a
`LEGAL REVIEW` marker comment:

- `/terms-of-service`
- `/privacy-policy`
- `/acceptable-use`
- `/data-processing-addendum`
- `/ai-policy`
- `/competitor-notice` (also set to noindex,nofollow and kept out of customer-facing navigation)

## Enforcement

`bun run build` runs `scripts/check-claims.sh`, which fails the build if any
forbidden pattern ("500+", "India's #1", "only you hold the keys", "bank-grade",
uptime figures, fabricated live-status strings, RTO/RPO numbers, etc.) reappears
in `src/` or `public/llms.txt`.
