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
        body: "Preferential terms for the initial agreement, price protection for the agreed term, and pre-agreed expansion bands for additional campuses.",
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

    finalCta: {
      eyebrow: "The first conversation",
      heading: "Bring one bottleneck. We will map the operating path around it.",
      body: "Tell us where visibility arrives late, ownership becomes unclear, or staff rebuild the same truth by hand. We will determine whether it belongs in a Founding Institutional Partner pilot.",
      microcopy: "No commitment · 30-minute institutional diagnosis",
    },
  },
} as const;

/**
 * The demo form records where an enquiry came from. `founding-partner` is the
 * only intent the CTAs pass today; anything else in the query string falls
 * back to the default so a crafted URL cannot inject a value.
 */
export const FOUNDING_PARTNER_DEMO_HREF = "/demo/?intent=founding-partner";
