/**
 * Founding Institutional Partner programme copy.
 *
 * One source for the homepage section and /launch-partners/ so the two
 * surfaces cannot drift into describing different programmes.
 *
 * Claim discipline (see docs/marketing-claims-register.md and
 * scripts/check-claims.sh): every entitlement here is written as
 * "preferential", "agreed", "defined", "bounded" or "selected". Nothing on
 * this page may imply equity, guaranteed lifetime pricing, unlimited
 * development or support, exclusivity, or a veto over other customers —
 * those belong in a private conversation after legal review, never in public
 * marketing copy. No named partners, logos, testimonials, outcome figures or
 * scarcity counters appear here, because none of them are substantiated.
 */

export const foundingPartners = {
  href: "/launch-partners",

  home: {
    eyebrow: "Founding institutional partners",
    heading: "Don't just adopt the School OS. Help shape it.",
    lead: "SquareCampus is selecting a small first cohort of schools, school groups and education trusts to solve a real operating bottleneck, establish evidence, and shape the operating model before wider rollout.",
    benefits: [
      {
        number: "01",
        title: "Founder-led rollout",
        body: "A named counterpart maps the workflow, coordinates implementation, and validates the result alongside your team.",
      },
      {
        number: "02",
        title: "Protected founding economics",
        body: "Preferential terms for the initial agreement, price protection for the agreed term, pre-agreed expansion bands for additional campuses, and white-labelled mobile apps at no extra cost.",
      },
      {
        number: "03",
        title: "Roadmap influence",
        body: "Structured product-council access, early previews, and a defined innovation allocation for high-value reusable workflows.",
      },
      {
        number: "04",
        title: "Priority in critical cycles",
        body: "Capacity planning and priority escalation around admissions, fee deadlines, examinations, results and parent-communication peaks.",
      },
      {
        number: "05",
        title: "Managed digital campus",
        body: "Optional group and campus websites, admissions microsites, managed hosting, and forms connected to the operating system.",
      },
      {
        number: "06",
        title: "Transition without disruption",
        body: "Parallel validation, scoped migration, and coexistence with current systems until the institution trusts the new operating model.",
      },
    ],
    qualification: {
      eyebrow: "A small cohort by design",
      heading: "Partnership requires commitment on both sides.",
      body: "Founding partnership is for institutions with an executive sponsor, a measurable operating bottleneck, and the willingness to run a disciplined 60–90 day pilot. This is not a free trial or an unlimited custom-development programme.",
    },
    ctaNote:
      "Scope, success measure and commercial terms are agreed in writing before work begins.",
  },

  page: {
    hero: {
      eyebrow: "Founding institutional partner programme",
      heading: "Build the School OS with us—against a real institutional problem.",
      body: "Founding Partners do not receive a generic beta account. We establish a baseline, deploy around one measurable operational bottleneck, validate the result with your team, and use that evidence to decide what should scale next.",
      trustLine: "Measured pilot · Founder-led implementation · No compulsory rip-and-replace",
    },

    pillarsHeading:
      "Ordinary customers buy the platform. Founding Partners help shape how it reaches the institution.",
    pillars: [
      {
        number: "01",
        title: "Better execution",
        summary: "The implementation is run, not handed over.",
        points: [
          "Founder-led institutional discovery",
          "A named implementation counterpart",
          "Parallel validation with current systems",
          "Scoped migration and integration planning",
          "Peak-cycle capacity planning and escalation",
        ],
      },
      {
        number: "02",
        title: "Better economics",
        summary: "The commercial structure is agreed up front and holds.",
        points: [
          "Preferential terms for the initial agreement",
          "Price protection for the agreed initial term",
          "Pre-agreed commercial bands for campus expansion",
          "White-labelled Android and iOS apps under the institution's own branding, at no extra cost",
          "Clearly bounded implementation and digital-campus allowances",
          "No hidden module wall or surprise pass-through markup",
        ],
      },
      {
        number: "03",
        title: "Better influence",
        summary: "The institution's operating reality reaches the roadmap.",
        points: [
          "Structured product-council participation",
          "Early access to selected capabilities",
          "A defined annual innovation allocation",
          "Written consideration of major workflow proposals",
          "Direct operating feedback with Fairhelm leadership",
        ],
      },
    ],

    digitalCampus: {
      eyebrow: "The managed digital campus",
      heading: "Your public digital estate can run with the same operational discipline.",
      body: "Where it is part of the agreed scope, Fairhelm can design, build and operate the institution's group website, campus websites and admissions microsites—connecting enquiries and forms to SquareCampus instead of leaving them in disconnected inboxes.",
      capabilities: [
        "Group and campus websites",
        "Admissions and campaign microsites",
        "Enquiry forms connected to institutional workflows",
        "Managed hosting, SSL, CDN and backups",
        "Role-controlled publishing for campus teams",
        "English/Hindi content support where required",
        "Analytics, performance and accessibility foundations",
        "Domain and institutional content ownership retained by the school",
      ],
      scopeNote:
        "Site count, design system, page migration, traffic, storage and change allowances are defined in the proposal. The programme is not an unlimited creative-services retainer.",
    },

    path: {
      eyebrow: "Partnership path",
      heading: "Start with evidence. Expand only when it earns the right.",
      /**
       * The programme said what it is not ("not a free trial") without ever
       * saying what it is. An institution reading "founding partner" and
       * "shape the roadmap" can reasonably infer a free or subsidised
       * arrangement, and discovering otherwise on the proposal call costs more
       * credibility than saying it here. No figure is published: the sentence
       * establishes that money changes hands and that the terms are written
       * down first, which is all a board needs before the first call.
       */
      paidNote:
        "Founding pilots are paid, scoped commercial engagements. Scope, success measures, fees and conversion terms are agreed in writing before implementation begins.",
      steps: [
        {
          number: "01",
          title: "Diagnose",
          body: "Choose one operating bottleneck whose current cost, delay or ownership problem can be observed.",
        },
        {
          number: "02",
          title: "Baseline",
          body: "Write down the workflow, accountable owners, starting position and one success measure before implementation begins.",
        },
        {
          number: "03",
          title: "Run the pilot",
          body: "Deploy one campus or one agreed workflow bundle for 60–90 days, with named counterparts and parallel validation where needed.",
        },
        {
          number: "04",
          title: "Decide on evidence",
          body: "Convert, extend or stop against the agreed measure. If it works, expand through the protected founding-partner commercial structure.",
        },
      ],
    },

    fit: {
      eyebrow: "Who should apply",
      heading: "Designed for institutions willing to participate, not merely observe.",
      signals: [
        "A principal, trustee, director or group leader will act as executive sponsor",
        "There is a real workflow bottleneck that leadership wants to measure",
        "Campus teams can participate in discovery and weekly implementation reviews",
        "The institution can provide legitimate exports or process documentation needed for the agreed scope",
        "Leadership wants a multi-year operating relationship if the pilot succeeds",
        "The institution values governance, accountability and cross-campus visibility—not merely a cheaper attendance app",
      ],
      boundary:
        "Founding status does not create exclusivity, ownership of SquareCampus intellectual property, veto rights over other customers, or an unlimited bespoke-engineering commitment. Exact entitlements are governed by the proposal and signed order form.",
    },

    /**
     * The questions a trustee actually asks before agreeing to a pilot with a
     * young company — answered without a single new claim. Every answer below
     * points at something the site already substantiates: the written baseline
     * and convert/extend/stop model on /pricing/, the parallel-validation
     * rollout on /rollout/, the export and access posture on /security/.
     *
     * "Who are you?" is answered by naming the risk rather than talking around
     * it. An institution that has already noticed the company is new is not
     * reassured by a page that pretends otherwise.
     */
    objections: {
      eyebrow: "Before you commit",
      heading: "The questions a board asks before it says yes.",
      body: "None of these have flattering answers, so here are the accurate ones.",
      items: [
        {
          question: "You are a new company. Why would we depend on you?",
          answer:
            "You would not — not at first. A pilot is scoped to one campus or one workflow bundle, runs alongside the system you already have, and is judged against a measure written down before it starts. The institution keeps its existing system throughout, and keeps its data in standard export formats regardless of what it decides at the end.",
        },
        {
          question: "What happens if the pilot fails?",
          answer:
            "You stop. Convert, extend and stop are the three published outcomes, and stopping is not a failure state we argue you out of — it is the reason the baseline is written down first. You leave with the measurement, the process documentation and your data.",
        },
        {
          question: "We cannot afford disruption during admissions or fee cycles.",
          answer:
            "Neither can the pilot. Sequencing around admissions, fee deadlines, examinations and results is part of the rollout method, not an accommodation. Critical workflows run in parallel until finance and academic teams trust the numbers.",
        },
        {
          question: "Who actually does the work?",
          answer:
            "A named counterpart, with founder-level involvement in discovery and implementation. That is a consequence of the cohort being small, and it is one of the things founding partners are trading for.",
        },
        {
          question: "Who owns the data, and can we get it out?",
          answer:
            "The institution does, throughout. Access is role-scoped and every approval and override lands on an audit timeline while you operate — and complete exports in standard formats are available if you decide to leave. That is the same posture the platform runs on, not a concession made for pilots.",
        },
        {
          question: "What does it cost to find out?",
          answer:
            "Scope, success measure and commercial terms are agreed in writing before any work begins, so the cost is known before you commit rather than discovered afterwards. The first conversation is a 30-minute diagnosis and costs nothing.",
        },
      ],
    },

    finalCta: {
      eyebrow: "The first conversation",
      heading: "Bring one bottleneck. We will map the operating path around it.",
      body: "Tell us where visibility arrives late, ownership becomes unclear, or staff rebuild the same truth by hand. We will determine whether it belongs in a Founding Institutional Partner pilot.",
      microcopy: "No commitment · 30-minute institutional diagnosis",
    },

    /** Contextual route to the higher-education lane, from /launch-partners/. */
    higherEducationLink: {
      eyebrow: "Universities and multi-school groups",
      heading: "A private university or a multi-school group is a different conversation.",
      body: "The same 60–90 day evidence model applies, but the wedge is usually an exception queue between systems that already exist — admissions-to-enrolment, payment-to-ERP reconciliation, interdepartmental approvals — rather than a school's day-to-day operations.",
      linkLabel: "Read the higher-education lane",
    },
  },
} as const;

/**
 * The higher-education Founding Institutional Partner lane.
 *
 * Separate copy, deliberately, and separate discipline. The site is
 * school-led and stays school-led; this page exists because private
 * universities and multi-school groups are worth approaching at the workflow
 * level, and approaching them with school copy would be transparent.
 *
 * Three rules this copy does not break, because breaking them would be worse
 * than not having the page:
 *
 *  1. It never claims SquareCampus is a university ERP, SIS or LMS. It is the
 *     governed layer over the ones the institution already runs.
 *  2. Clinical and hospital information systems are named as out of scope.
 *     A teaching hospital is not a pilot wedge, and saying so protects the
 *     conversation more than staying silent would.
 *  3. No accreditation, regulatory, medical or patient-care claim appears
 *     anywhere on it. Governance of an administrative workflow is not
 *     compliance certification, and the two must not be blurred.
 */
export const higherEducationPartners = {
  href: "/launch-partners/higher-education",

  hero: {
    eyebrow: "Founding institutional partners · Higher education",
    heading: "Your systems are not the problem. The space between them is.",
    body: "Private universities and multi-school groups rarely lack software. They run an ERP, an LMS, one or more payment portals, an identity provider and several communication channels — and lose weeks in the gaps between them, where a case is stalled, unowned, and visible to nobody until someone escalates. SquareCampus is the governed layer across that space.",
    trustLine:
      "Runs alongside your existing ERP, LMS, payment and identity systems · One bounded workflow · Paid, scoped pilot",
  },

  honesty: {
    eyebrow: "What this is, precisely",
    heading: "Not a university ERP. A governed operating layer over the one you have.",
    body: "It is worth being exact about this before anything else, because the wrong expectation wastes both sides' time.",
    isNot: [
      "Not a replacement for your student information system or ERP of record",
      "Not a learning management system, and not a competitor to the one you run",
      "Not a payment gateway, an identity provider, or a finance ledger",
      "Not a clinical, hospital or patient-care system, and not proposed for one",
    ],
    is: [
      "A governed layer that watches the workflow across those systems",
      "An exception queue with a named owner and a due position for every open case",
      "An append-only record of who decided what, when, and on what basis",
      "A leadership view of a bounded operational workflow that is current without an export",
    ],
  },

  wedges: {
    eyebrow: "Where a pilot starts",
    heading: "Five wedges that produce evidence inside one term.",
    body: "Each one is bounded, already measurable today, and does not require switching off anything the institution depends on.",
    items: [
      {
        number: "01",
        title: "Admissions-to-enrolment exception ownership",
        body: "Applications that clear one stage and stall at the next — document verification, fee confirmation, seat allocation, registration. The exception gets an owner and a position instead of living in an inbox.",
      },
      {
        number: "02",
        title: "Payment-success-to-ERP reconciliation",
        body: "Payments that succeed at the gateway and do not land cleanly against the record. The mismatch is raised as an exception, routed, and closed with a recorded reason rather than reconciled by hand at month end.",
      },
      {
        number: "03",
        title: "Interdepartmental approvals and stalled cases",
        body: "Requests that cross academic, finance, registry and administrative boundaries and lose their owner at each handover. Latency becomes visible while it is still recoverable.",
      },
      {
        number: "04",
        title: "Leadership visibility across one bounded workflow",
        body: "A current view of one workflow — what is open, who owns it, what is overdue and what was decided — without a department preparing a deck for it.",
      },
      {
        number: "05",
        title: "Evidence collection and accountable closure",
        body: "Administrative and operational workflows outside clinical and hospital systems, where a decision needs a recorded reason and an auditable close.",
      },
    ],
    exclusion:
      "Clinical and hospital information systems are outside the suggested pilot scope. Where an institution operates a teaching hospital, the pilot is scoped to non-clinical administrative workflows only, and SquareCampus makes no medical, patient-care, accreditation or regulatory claim.",
  },

  coexistence: {
    eyebrow: "How it sits",
    heading: "Above or alongside. Nothing is switched off to find out whether this works.",
    body: "During the pilot the institution's ERP, LMS, payment portals, forms and identity provider stay exactly where they are and stay authoritative. SquareCampus governs the workflow that runs across them.",
    layers: [
      {
        title: "Systems of record stay in place",
        body: "The ERP or SIS remains the record. SquareCampus does not ask to become it, and does not require a migration to start.",
      },
      {
        title: "The workflow is governed across them",
        body: "A case is tracked from the event that starts it to the decision that closes it, regardless of how many systems it touches on the way.",
      },
      {
        title: "Ownership is explicit, not implied",
        body: "Every open exception has a named accountable owner and a position. Nothing sits in a shared mailbox waiting to be noticed.",
      },
      {
        title: "The decision is recorded",
        body: "Approvals, overrides and refusals land on an append-only timeline with the reason attached, scoped to the role that took them.",
      },
    ],
  },

  evidence: {
    eyebrow: "The 60–90 day evidence model",
    heading: "The same discipline as every founding pilot, scoped to a university.",
    steps: [
      {
        number: "01",
        title: "One bounded scope",
        body: "One workflow, or one non-clinical constituent school or department. Not the institution, and not a phased programme dressed up as a pilot.",
      },
      {
        number: "02",
        title: "One written baseline",
        body: "The current position — volumes, delays, ownership gaps — written down before implementation, so the result is measured rather than argued.",
      },
      {
        number: "03",
        title: "One named executive sponsor",
        body: "A Registrar, Dean, Finance lead, COO or CIO who owns the outcome internally and can convene the people the workflow crosses.",
      },
      {
        number: "04",
        title: "Parallel validation where needed",
        body: "Anything finance or registry teams must trust runs alongside the existing process until the numbers agree.",
      },
      {
        number: "05",
        title: "Convert, extend or stop",
        body: "Judged against the measure agreed at the start. Stopping is a published outcome, not a failure state we argue you out of.",
      },
    ],
    paidNote:
      "Founding pilots are paid, scoped commercial engagements. Scope, success measures, fees and conversion terms are agreed in writing before implementation begins.",
  },

  /** Written for the people who each have to say yes for a pilot to happen. */
  leadership: {
    eyebrow: "Who this has to convince",
    heading: "Five people, five different questions.",
    items: [
      {
        role: "President / Vice Chancellor",
        question: "What does this change at my level?",
        answer:
          "One bounded workflow stops arriving as an escalation and starts arriving as a current position. The pilot is small enough to stop and specific enough to judge.",
      },
      {
        role: "Registrar",
        question: "Does this add another system for my office to run?",
        answer:
          "It governs the ones you already run. The registry keeps its system of record; what changes is that a stalled case has an owner and a position instead of a follow-up email.",
      },
      {
        role: "Dean / Academic leader",
        question: "Will this reach into academic judgement?",
        answer:
          "No. The scope is administrative and operational workflow — where a case is, who owns it, and whether a decision was recorded. Academic decisions stay with the people who make them.",
      },
      {
        role: "Finance leader",
        question: "What happens to reconciliation?",
        answer:
          "Mismatches between payment success and the record become routed exceptions with a recorded closure, and run in parallel with the existing process until finance trusts the numbers.",
      },
      {
        role: "CIO / IT leader",
        question: "What is the integration and data burden?",
        answer:
          "Scoped to the workflow in the pilot, agreed in writing before implementation, and read-oriented where the existing system stays authoritative. Access is role-scoped and exports are available in standard formats throughout.",
      },
    ],
  },

  finalCta: {
    eyebrow: "The first conversation",
    heading: "Bring one bottleneck. We will map the governed path around it.",
    body: "A 30-minute diagnosis of one workflow: where it stalls, who should own it, what a bounded pilot would cover, and whether it belongs in the founding cohort at all.",
    microcopy: "No commitment · 30-minute institutional diagnosis",
  },
} as const;

/**
 * The demo form records where an enquiry came from. `founding-partner` is the
 * only intent the CTAs pass today; anything else in the query string falls
 * back to the default so a crafted URL cannot inject a value.
 */
export const FOUNDING_PARTNER_DEMO_HREF = "/demo/?intent=founding-partner";
