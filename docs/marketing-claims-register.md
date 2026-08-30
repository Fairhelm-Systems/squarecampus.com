# Marketing Claims Register

Last updated: 2026-07-14 (repositioning: "Sovereign School OS for Indian school groups").

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
| "SSO-ready" | /school-management-system FAQ | **NEEDS BACKEND EVIDENCE** (kept as conditional capability statement) |
| MFA for administrative access, remote device wipe | /security JSON-LD (old) | **REMOVE** (removed; reinstate with internal IT policy evidence) |
| India data residency / "hosted in India by default, no cross-border transfers" | /security (old), faq.ts (old), blog | **NEEDS BACKEND EVIDENCE** — softened everywhere to "designed with an India-first hosting/residency posture". Hard residency guarantees also **NEEDS LEGAL REVIEW** before contractual use. |
| "Designed to support DPDP Act / IT Act 2000 obligations" | faq.ts, /school-management-system | **NEEDS LEGAL REVIEW** (kept in softened "designed to support" form) |
| "GDPR aligned", "SOC 2 practices" | /security metadata (old) | **REMOVE** (removed; no certification/assessment evidence) |
| "Bank-grade security" | /security, /infrastructure (old) | **REMOVE** (removed; forbidden phrase) |
| Data export within 30 days of exit + deletion per retention policy | faq.ts | **NEEDS LEGAL REVIEW** (service commitment; align with ToS/DPA) |
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
| Headcount-based pricing, all modules included, no hidden fees | multiple | **NEEDS LEGAL REVIEW** (pricing commitment; align with actual contracts) |

## Company & legal facts

| Claim | Where | Status |
| --- | --- | --- |
| SquareCampus is a product of Fairhelm Systems OPC | footer, press, about, competitor-notice | **VERIFIED** (company record; ™ used, not ® — registration pending) |
| SquareCampus™ (trademark pending, not registered) | footer, llms.txt | **VERIFIED** (keep ™; never ® until registration completes) |
| Founder-led; Mohit Gupta, Founder & CTO | about, press | **VERIFIED** (company fact) |
| "Built systems processing 100M+ records daily" (founder bio) | about | **NEEDS BACKEND EVIDENCE** (personal-history claim; keep or remove at founder's discretion) |
| Location: Bangalore, India (footer) | footer | **VERIFIED** (company fact; note: old Mumbai JSON-LD address removed as fabricated) |

## Founding Institutional Partner programme

The programme copy lives in one file, `src/content/founding-partners.ts`, so
the homepage section and `/launch-partners/` cannot describe different
programmes. Every entitlement is worded as *preferential*, *agreed*, *defined*,
*bounded* or *selected*.

| Claim | Where | Status |
| --- | --- | --- |
| Founder-led rollout with a named implementation counterpart | homepage section, /launch-partners | **NEEDS BACKEND EVIDENCE** (service commitment; keep only while the team actually staffs it — same standing as the guided-rollout claim above) |
| Preferential terms, price protection for the agreed initial term, pre-agreed expansion bands | homepage section, /launch-partners | **NEEDS LEGAL REVIEW** (must match the proposal and signed order form; the page says so explicitly) |
| Structured product-council access, early previews, a defined annual innovation allocation | /launch-partners | **NEEDS LEGAL REVIEW** (bounded entitlement; never describe as unlimited) |
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
  "A small cohort by design" is a statement of intent, not a count.

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
