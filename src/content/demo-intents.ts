/**
 * /demo/ copy, in its two intents.
 *
 * There is one page and one form. `?intent=founding-partner` switches the
 * framing from a generic guided demo to a Founding Institutional Partner
 * diagnosis; anything else (including no parameter at all) gets the guided
 * demo exactly as it was.
 *
 * How the switch happens, and why it is done this way:
 *
 *  - Both variants are server-rendered into the same static HTML and one of
 *    them is hidden with CSS, keyed off `data-demo-intent` on <html>. A tiny
 *    synchronous script sets that attribute before the page paints (the same
 *    mechanism the theme uses), so a visitor arriving on the founding-partner
 *    link never sees the generic heading flash first.
 *  - The site is a static export: there is no server to branch on a query
 *    string, and a second URL would split the canonical and the crawl.
 *  - Only the two keys below are honoured. The raw parameter is never
 *    rendered, stored or echoed back, so a crafted URL cannot inject copy.
 *
 * Claim discipline is the same as /launch-partners/ (see
 * content/founding-partners.ts): no equity or investment language, no
 * exclusivity, no guaranteed outcome, no published price.
 */

export const DEMO_INTENT_ATTRIBUTE = "data-demo-intent";

/** The founding-partner variant's attribute value. */
export const FOUNDING_PARTNER_INTENT = "founding-partner";

export const demoIntents = {
  demo: {
    eyebrow: "Guided demo",
    heading: "Bring the patchwork. We will show the operating model.",
    lead: "A SquareCampus demo is not a feature parade. It is a guided review of how your institution currently runs, where the current stack breaks, and how a School OS changes the day-to-day reality for operators and leadership.",
    points: [
      "Built for schools, colleges, and multi-campus institutions in India.",
      "Structured for leadership, operations, finance, and academic stakeholders.",
      "Grounded in rollout, controls, adoption, and coexistence with what you already run.",
    ],
    form: {
      eyebrow: "Request walkthrough",
      heading: "Tell us what is not working.",
      body: "The more specific you are, the better the session. Admissions chaos, fee operations, parent communication overload, fragmented reporting, or all of the above.",
      submitLabel: "Request Demo",
      emailSubmitLabel: "Request Demo via Email",
      idleNote:
        "We reply with a guided walkthrough plan and the right stakeholders to bring into the evaluation.",
    },
    expectations: {
      eyebrow: "What to expect",
      heading: "A serious evaluation session, not a generic sales call",
      body: "SquareCampus should feel credible to institutional buyers. The demo process reflects that.",
    },
    close: {
      eyebrow: "Confidence check",
      heading: "The goal is clarity.",
      body: "By the end of the session, your team should know where SquareCampus would sit against the systems you already run, what a first deployment would involve, and how the operating-layer model changes reporting, communication and institutional control.",
      points: [
        "One connected system for operations, not a collection of isolated demos.",
        "A serious India-first product posture across language, trust, and compliance realities.",
        "A rollout conversation that respects calendar pressure and internal complexity.",
      ],
    },
  },

  "founding-partner": {
    eyebrow: "Founding institutional partner",
    heading: "Bring one operational bottleneck. We will map the governed path around it.",
    lead: "This is not a product walkthrough. It is a diagnosis: we look at one workflow that currently loses time, ownership or money, and establish whether it belongs in a Founding Institutional Partner pilot.",
    points: [
      "SquareCampus may sit above or alongside your existing ERP, LMS, payment, identity and communication systems during the pilot.",
      "One bounded workflow or one campus, a written baseline, and one agreed success measure.",
      "Founding pilots are paid, scoped commercial engagements, agreed in writing before implementation begins.",
    ],
    form: {
      eyebrow: "Request a diagnosis",
      heading: "Describe the bottleneck, not the wishlist.",
      body: "Tell us where visibility arrives late, ownership becomes unclear, or staff rebuild the same truth by hand. The more precise the bottleneck, the more useful the first conversation.",
      submitLabel: "Request a partnership diagnosis",
      emailSubmitLabel: "Request a partnership diagnosis via email",
      idleNote:
        "We reply with a written view of whether this belongs in a founding pilot, and what a bounded scope would look like.",
    },
    expectations: {
      eyebrow: "What to expect",
      heading: "A 30-minute diagnosis, then a written scope or an honest no",
      body: "Founding partnership is a commercial engagement with an evidence test attached. The first conversation is shaped accordingly.",
    },
    close: {
      eyebrow: "Coexistence, not compulsory replacement",
      heading: "Nothing is switched off to find out whether this works.",
      body: "A founding pilot runs beside the systems the institution already depends on. SquareCampus governs the workflow across them — routing exceptions, assigning ownership, and recording what happened — while the current ERP, LMS, payment portal and identity provider stay in place. What gets replaced later, if anything, is the institution's decision, taken after the evidence exists.",
      points: [
        "Your current systems keep running throughout the pilot.",
        "Parallel validation on anything finance or academic teams must trust.",
        "Convert, extend or stop against the measure agreed at the start.",
      ],
    },
  },
} as const;

export type DemoIntentKey = keyof typeof demoIntents;

/**
 * Sets `data-demo-intent` on <html> before first paint, so neither variant
 * flashes on a direct hit. Client-side navigations do not re-run an inline
 * script, so `ContactForm` keeps the attribute in sync after hydration.
 *
 * Deliberately tiny and total: any value other than the one key below leaves
 * the attribute unset, which is the generic guided-demo state.
 */
export const demoIntentScript = `
(() => {
  try {
    var intent = new URLSearchParams(window.location.search).get("intent");
    if (intent === "${FOUNDING_PARTNER_INTENT}") {
      document.documentElement.setAttribute("${DEMO_INTENT_ATTRIBUTE}", "${FOUNDING_PARTNER_INTENT}");
    }
  } catch (error) {}
})();
`;
