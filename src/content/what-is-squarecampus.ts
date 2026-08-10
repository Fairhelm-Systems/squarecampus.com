/**
 * Canonical entity definition for /what-is-squarecampus.
 *
 * This is the page search engines and language models should resolve "what is
 * SquareCampus" against, so the wording here is deliberate and should not be
 * casually reworded. The ERP answer is intentionally nuanced: it neither
 * denies the record-and-workflow capabilities nor lets the product be reduced
 * to an ERP.
 */

export const CANONICAL_DEFINITION =
  "SquareCampus is a School Operating System and institutional decision layer for Indian schools and educational trusts. It includes the operational systems of record institutions expect, but its primary purpose is to connect recurring school cycles to ownership, exception handling, auditability and leadership decisions.";

/**
 * The four layers the platform is organised around.
 *
 * The order matters: outcome first, capabilities second. The capability list
 * is evidence that the backbone is complete — it is not the pitch.
 */
export const systemLayers = [
  {
    id: "record",
    name: "System of Record",
    outcome: "One institutional truth.",
    body: "Students, staff, fees, attendance, assessments and documents live on one model, so a question has one answer rather than one answer per tool.",
    capabilities: [
      "Student, staff and guardian records",
      "Admissions and enrolment",
      "Timetable, attendance and assessment",
      "Fees, concessions and receipts",
      "Documents and institutional history",
    ],
  },
  {
    id: "workflow",
    name: "System of Workflow",
    outcome: "Work moves with an owner.",
    body: "Admissions, collections, results, approvals and parent concerns run as workflows with stages, owners and deadlines — not as tasks held in someone's memory.",
    capabilities: [
      "Stages, owners and deadlines per cycle",
      "Exception routing and escalation",
      "Approvals and overrides",
      "Parent and staff communication",
      "Transport, hostel and campus operations",
    ],
  },
  {
    id: "governance",
    name: "System of Governance",
    outcome: "Every exception is accountable.",
    body: "Policy, approval chains, role boundaries and audit history are institutional configuration, so exceptions escalate to a named desk and leave a trail.",
    capabilities: [
      "Role-based access and campus scope",
      "Trust and campus hierarchy",
      "Approval and governance chains",
      "Audit history and advanced audit exports",
      "Institution-managed identity, including Microsoft Entra ID SSO",
    ],
  },
  {
    id: "intelligence",
    name: "System of Intelligence",
    outcome: "Leadership sees what requires attention.",
    body: "AEGIS reads the governed operational context and returns permission-scoped, source-grounded answers about what changed, why it matters and who owns the response.",
    capabilities: [
      "Operational analytics and command views",
      "Threshold detection across cycles",
      "Permission-scoped, source-grounded answers",
      "Auditable question and answer history",
    ],
  },
] as const;

/**
 * Dashboard vs decision layer. Used to explain AEGIS without positioning it
 * as a chatbot.
 */
export const dashboardVsDecisionLayer = {
  dashboard: ["Attendance decreased", "Fees remain pending", "Reports are overdue"],
  decisionLayer: [
    "Which campus crossed the threshold",
    "When the deviation started",
    "Which workflow is blocked",
    "Who owns the response",
    "What evidence supports the conclusion",
    "What leadership should review next",
  ],
} as const;

export const AEGIS_DEFINITION =
  "AEGIS is the governed intelligence layer inside SquareCampus. It produces permission-scoped, source-grounded and auditable operational answers from institutional context.";

/** V1 boundaries. These are constraints, not roadmap promises. */
export const aegisBoundaries = [
  "Read-only — AEGIS answers questions, it does not act on the institution's behalf",
  "RBAC-scoped — a person only ever sees what their role already permits",
  "Source-grounded — every answer points back to the records it came from",
  "Auditable — questions and answers are recorded like any other institutional action",
  "Human-controlled — decisions remain with the people accountable for them",
] as const;

export const entityFaqs = [
  {
    question: "Is SquareCampus an ERP?",
    answer:
      "SquareCampus includes the core record and workflow capabilities commonly expected from institutional ERP software. However, it is designed and positioned as a School Operating System: a connected operating backbone where school cycles, ownership, exceptions, governance and leadership visibility share one institutional model.",
  },
  {
    question: "What is a School Operating System?",
    answer:
      "A School Operating System is the connected operating backbone an institution runs on. It holds the records a school expects, but it also carries the workflows, ownership, approvals, exceptions and audit history that turn those records into accountable day-to-day operations.",
  },
  {
    question: "What is an institutional decision layer?",
    answer:
      "A system of record stores what happened. A decision layer shows what requires attention, why it matters, who owns it, and what happens next. SquareCampus is built to do both, so leadership does not have to assemble context before acting.",
  },
  {
    question: "Who is SquareCampus built for?",
    answer:
      "Indian schools, educational trusts, church-run school groups and multi-campus institutions. It suits institutions that care about operational control, accountable ownership and leadership visibility — whether they run one campus or many.",
  },
  {
    question: "Is AEGIS a chatbot?",
    answer:
      "No. AEGIS is the governed intelligence layer inside SquareCampus. It produces permission-scoped, source-grounded and auditable operational answers from institutional context. It is read-only, constrained by the asker's existing role permissions, and does not take autonomous decisions.",
  },
  {
    question: "Can SquareCampus replace our existing school ERP?",
    answer:
      "Institutions commonly move to SquareCampus from a school ERP, a set of disconnected tools, or a mix of both. Migration scope, sequencing and how long the existing system runs alongside are agreed during discovery rather than assumed.",
  },
] as const;
