/**
 * Security FAQ.
 *
 * Single source for both the rendered accordion on /security and that route's
 * FAQPage JSON-LD. It previously lived only inside the layout, which meant the
 * structured data declared answers that appeared nowhere on the page.
 */
export const securityFaqs = [
  {
    question: "Where is data hosted?",
    answer:
      "SquareCampus is designed with an India-first hosting posture. Hosting details and data-flow documentation are shared during the security review process.",
  },
  {
    question: "How is data encrypted?",
    answer:
      "Data is encrypted in transit and at rest as part of the platform's baseline design. Implementation details are available under the security review process.",
  },
  {
    question: "Who can access data?",
    answer:
      "Access is role-based and least-privileged by design, with administrative access logged and traceable.",
  },
  {
    question: "Do you support vendor security questionnaires?",
    answer:
      "Yes. We provide questionnaire support and can share security documentation and summaries on request.",
  },
  {
    question: "Can staff sign in with our own Microsoft accounts?",
    answer:
      "Microsoft Entra ID SSO is available as an Enterprise capability for one approved institutional tenant, subject to technical onboarding. Authentication happens in your tenant under your MFA and Conditional Access policies, while SquareCampus continues to govern campus, role, record and workflow permissions.",
  },
] as const;
