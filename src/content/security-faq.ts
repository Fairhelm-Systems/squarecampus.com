/**
 * Security FAQ.
 *
 * Single source for both the rendered accordion on /security and that route's
 * FAQPage JSON-LD. It previously lived only inside the layout, which meant the
 * structured data declared answers that appeared nowhere on the page.
 */
import { identity } from "./commercial";

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
    question: "Can an institution use normal SquareCampus credentials?",
    answer: `Yes. ${identity.baseline.body}`,
  },
  {
    question: "Can staff sign in with our own Microsoft accounts?",
    answer: `From Pro, yes. ${identity.pro.body}`,
  },
  {
    question: "What identity options does Enterprise add?",
    answer: identity.enterprise.body,
  },
  {
    question: "Who decides what a signed-in user may do?",
    answer: identity.principle,
  },
] as const;
