export type SectionImage = {
  src: string;
  alt: string;
  caption?: string;
  orientation: "top" | "left" | "right";
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  image?: SectionImage;
};

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tag?: string;
  /** Topic tags surfaced as chips, og article:tag, and JSON-LD keywords. */
  tags?: string[];
  readingTime: string;
  hero: {
    eyebrow: string;
    lede: string;
  };
  sections: BlogSection[];
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  cta: {
    heading: string;
    body: string;
    href: string;
    label: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-school-management-system",
    title: "How to Choose a School Management System in 2026: A Buyer's Guide for Indian Schools",
    summary:
      "A vendor-neutral evaluation framework for Indian schools and school groups: the questions that actually separate vendors, the red flags procurement should treat as disqualifying, and a 25-point checklist you can take into any demo.",
    date: "2026-07-10",
    tag: "Buyer's guide",
    tags: [
      "school management system",
      "school ERP evaluation",
      "procurement checklist",
      "Indian schools",
    ],
    readingTime: "9 min read",
    image: {
      src: "/images/blog/buyers-guide-hero.webp",
      alt: "Empty school meeting room prepared for a vendor evaluation, printed documents and water glasses at each seat.",
      caption: "The evaluation is won before the demo starts — by the questions on the table.",
    },
    hero: {
      eyebrow: "Evaluation framework",
      lede: "Every school ERP demo looks good. Every brochure checks every box. This guide is the framework we wish every school had before talking to any vendor — including us. Use it against SquareCampus too; if a vendor can't survive its own buying guide, that tells you something.",
    },
    sections: [
      {
        heading: "Start with the institution, not the feature list",
        paragraphs: [
          "Feature-matrix shopping is how most school ERP evaluations begin, and it is why most of them fail. Every serious vendor in India will show you admissions, fees, attendance, exams, transport, and a parent app. If your comparison spreadsheet has fifty feature rows, expect every vendor to tick all fifty. The matrix cannot separate them, because features are not where these products differ.",
          "Where they differ is structure: whether the modules share one record of each student or sync copies between databases, whether permissions model how a real institution delegates authority, whether the vendor can migrate your existing data without losing a term, and whether anyone will put infrastructure answers in writing. Those differences decide what your staff's daily life looks like in year two — long after the demo is forgotten.",
          "So before any demo, write down your institution's actual operating problems. Not 'we need a fee module' but 'reconciling fees across our three campuses takes our accountant four days every month'. Specific problems make demos falsifiable. Generic requirements make every demo look like a win.",
        ],
      },
      {
        heading: "The five questions that actually separate vendors",
        paragraphs: [
          "If you ask only five things in an evaluation, ask these — and require the answers in writing, because written answers survive procurement, audits, and vendor account-manager changes.",
        ],
        bullets: [
          "Is it one data model or stitched modules? Ask: 'When an admission is confirmed, what updates automatically — and what needs re-entry or a sync job?' Re-entry and sync jobs are where data drift is born.",
          "How does the permission model map to our structure? A trust with campuses, principals, department heads, and shared finance staff needs scoped, hierarchical access — not three flat roles named admin, teacher, and parent.",
          "What is the migration and rollout process, exactly? Who cleans the data, what runs in parallel, what is the rollback plan, and who owns the timeline? 'We'll handle it' is not a process.",
          "Where does our data physically live, and what happens if we leave? Region and provider in writing, export formats in writing, deletion policy in writing.",
          "What does the price include, and what triggers a new invoice? Per-module pricing, per-user pricing, and 'the parent app is an add-on' are the three most common sources of year-two budget surprises.",
        ],
        image: {
          src: "/images/blog/buyers-guide-questions.webp",
          alt: "Hands reviewing a printed checklist beside a laptop during a school software evaluation meeting.",
          caption: "Written answers survive procurement; verbal ones survive only the meeting.",
          orientation: "right",
        },
      },
      {
        heading: "Red flags worth treating as disqualifying",
        paragraphs: [
          "Some patterns show up so reliably before bad outcomes that procurement teams should treat them as disqualifying rather than negotiable.",
        ],
        bullets: [
          "Self-declared rankings and adoption counts with no evidence. Ask for the source; watch what happens.",
          "Uptime or reliability promises that do not appear in the contract. A number a vendor won't sign is a decoration, not a commitment.",
          "Refusal to answer infrastructure questions in writing — 'it's secure, trust us' is an answer about their sales process, not their security.",
          "A demo that cannot deviate from the script. Ask them to run one of your real workflows live; polished rails around a fixed path usually mean the product is thin off the path.",
          "No named implementation owner. If rollout is 'the support team', your go-live is a ticket queue.",
          "Exit friction: no export commitment, no deletion commitment, or contracts that make leaving expensive. Vendors confident in their product make leaving easy.",
        ],
      },
      {
        heading: "The 25-question evaluation checklist",
        paragraphs: [
          "Take this into every vendor conversation. Score each answer: in writing, verbal only, or refused. The pattern across vendors will be more informative than any single answer.",
        ],
        bullets: [
          "Data & migration — 1. What historical data can you migrate, and what will be lost? 2. Who maps our current data structure to yours? 3. Is there a parallel run before cutover? 4. What is the rollback plan if go-live fails? 5. Can we export everything, in standard formats, at any time?",
          "Governance & access — 6. Can policy be set at trust level with campus-level execution? 7. Can access be scoped by campus, department, and workflow? 8. Is every change attributable to a user with a timestamp? 9. Can we see an audit trail for any record, on demand? 10. How are staff departures and role changes handled?",
          "Finance & compliance — 11. Can it model our actual fee structures: terms, concessions, transport slabs, arrears? 12. How does reconciliation work across campuses and payment channels? 13. Are receipts and approvals audit-ready without manual assembly? 14. What GST and statutory reporting does it produce? 15. How does it support our obligations under Indian data protection law?",
          "Communication & daily use — 16. How do parents receive updates, in which languages? 17. Can communication be tied to context — class, fee status, incident? 18. What does a teacher's daily attendance-and-marks flow actually look like? 19. What happens during exam weeks and admission season, when load spikes? 20. What training do staff get, and for how long?",
          "Infrastructure & commercials — 21. Which cloud region and provider host our data, in writing? 22. What is the backup and recovery design, in writing? 23. What exactly does the quoted price include, and what costs extra? 24. What does support look like after go-live — named person or ticket queue? 25. If we leave in three years, what do you commit to, in writing?",
        ],
      },
      {
        heading: "How to run the evaluation",
        paragraphs: [
          "Shortlist three vendors at most — evaluation quality drops fast beyond that. Send the checklist before demos and require written answers; a vendor's handling of the questionnaire is a preview of their handling of your rollout.",
          "Then run scripted demos on your workflows, not theirs: bring a real (anonymised) fee structure, a real timetable problem, a real multi-campus reporting need, and ask each vendor to walk through the same three scenarios. Comparable demos beat impressive ones.",
          "Finally, insist on a parallel run for at least one critical workflow — usually fees or attendance — before full cutover. The vendors who welcome parallel runs are the ones whose products survive them.",
        ],
        image: {
          src: "/images/blog/buyers-guide-demo.webp",
          alt: "Two people in a school office reviewing a laptop together during a working session.",
          caption: "Scripted demos on your workflows beat impressive demos on theirs.",
          orientation: "left",
        },
      },
      {
        heading: "Where SquareCampus fits — and where it may not",
        paragraphs: [
          "SquareCampus is built as one governed system of record for Indian schools and school groups: a unified institutional data model, trust-level governance with campus-level autonomy, guided migration with parallel runs, and infrastructure questions answered in writing as part of every evaluation. Pricing is headcount-based with all modules and mobile apps included.",
          "We are not the right fit for everyone. If your priority is classroom content and LMS depth rather than institutional operations, or you want open-source software your own IT team hosts and modifies, other vendors serve those needs better — our comparison pages say so by name. We would rather lose an evaluation honestly than win it with a checkbox matrix.",
          "Whoever you evaluate, use the checklist. It will make every vendor — including us — earn the decision.",
        ],
      },
    ],
    cta: {
      heading: "Run this checklist against us",
      body: "Book a demo and bring the 25 questions. We answer all of them in writing — it is how we think evaluations should work.",
      href: "/demo",
      label: "Book a guided demo",
    },
  },
  {
    slug: "multi-campus-school-governance",
    title: "Running Multi-Campus School Groups: Centralised Control vs Campus Autonomy",
    summary:
      "Why school groups oscillate between head-office bottlenecks and campus drift, the governance model that resolves the tension, and what it requires from software: policy at the trust level, execution at the campus level, accountability everywhere.",
    date: "2026-07-17",
    tag: "Governance",
    tags: [
      "multi-campus school groups",
      "school governance",
      "centralisation vs autonomy",
      "school trusts India",
    ],
    readingTime: "7 min read",
    image: {
      src: "/images/blog/multi-campus-hero.webp",
      alt: "Two school campus buildings of different architecture seen across a green boundary at sunrise.",
      caption:
        "One institution, many campuses — the governance question every group eventually faces.",
    },
    hero: {
      eyebrow: "Multi-campus operations",
      lede: "Every school group eventually faces the same fork: centralise everything and choke campuses on head-office approvals, or grant autonomy and watch standards drift apart. The fork is false — but escaping it takes a governance model, not just a bigger ERP licence.",
    },
    sections: [
      {
        heading: "The false choice every group faces",
        paragraphs: [
          "Centralise everything, and the head office becomes the bottleneck: every concession, every refund, every timetable exception queues for someone two cities away who lacks the local context to decide well. Campus teams stop deciding and start escalating, and the group's pace becomes the pace of its busiest administrator.",
          "Grant full autonomy, and drift sets in: each campus develops its own fee-head naming, its own definition of an active student, its own report formats. Nothing is wrong at any single campus — but at the group level, numbers stop adding up, and every board meeting begins with an argument about whose spreadsheet is right.",
          "Most groups oscillate between the two poles, re-centralising after an audit scare, re-delegating after a bottleneck crisis. The oscillation itself is the cost: staff relearn processes, data models change mid-year, and institutional memory lives in workarounds.",
        ],
      },
      {
        heading: "What actually breaks at two campuses and beyond",
        paragraphs: [
          "The failure modes are remarkably consistent across groups, boards, and sizes. They are worth naming precisely, because a software evaluation should test against them.",
        ],
        bullets: [
          "Definition drift: 'active student', 'defaulter', and 'admitted' quietly mean different things at different campuses, so consolidated reports silently compare unlike numbers.",
          "Reconciliation as a job description: someone at head office spends days each month stitching campus exports into one picture — and the picture is stale on arrival.",
          "Approval ambiguity: nobody can say, in one sentence, who may approve a concession of what size at which campus — so exceptions are either bottlenecked or invisible.",
          "Audit exposure: when records live in per-campus systems and spreadsheets, answering 'who changed this and when' takes an investigation instead of a click.",
          "Policy latency: a fee-policy change decided at the trust takes weeks to actually reach every campus's daily practice, if it fully arrives at all.",
        ],
        image: {
          src: "/images/blog/multi-campus-paperwork.webp",
          alt: "A school office desk stacked with separate bundles of files and ledgers awaiting reconciliation.",
          caption: "Reconciliation as a job description: the recurring cost of fragmented records.",
          orientation: "right",
        },
      },
      {
        heading: "The model that works: policy at the trust, execution at the campus",
        paragraphs: [
          "The groups that escape the oscillation converge on the same structure. The trust level owns policy: fee frameworks, approval limits, academic calendar boundaries, data definitions, and access rules. Campuses own execution inside those guardrails: they run admissions, collect fees, mark attendance, manage staff, and make the local exceptions the policy explicitly delegates to them.",
          "The connective tissue is accountability rather than permission-seeking. A campus does not ask head office to approve a routine concession; it applies the delegated rule, and the action lands on a shared, auditable timeline that the trust can inspect at any time. Escalation is reserved for genuine exceptions — which is what makes escalation meaningful again.",
          "This is governance in the institutional sense: not surveillance of campuses, and not blind trust either, but delegated authority with visible execution. It is how well-run trusts already think; the problem is that most school software cannot express it.",
        ],
        image: {
          src: "/images/blog/multi-campus-boardroom.webp",
          alt: "An empty school trust boardroom with a polished table and a single closed folder at the head seat.",
          caption: "Policy at the trust, execution at the campus, accountability everywhere.",
          orientation: "top",
        },
      },
      {
        heading: "What the model demands from software",
        paragraphs: [
          "Translate that governance model into system requirements and the vendor conversation becomes precise.",
        ],
        bullets: [
          "One institutional data model: a student, a fee head, and a term mean the same thing at every campus, so consolidated numbers are aggregations — not reconciliations.",
          "Hierarchical, scoped access: trust administrators see the group, principals see their campus, and delegation limits are enforced by the system rather than by memory.",
          "Campus-level variation as configuration, not forks: where policy allows local difference, it is configured within the model — never by running a separate system.",
          "A single auditable timeline: every approval, override, and edit is attributable across campuses, so 'who changed this and when' is a lookup, not a project.",
          "Live consolidated visibility: the trust-level picture updates as campuses operate — attendance, collections, exceptions — without anyone preparing a pack.",
        ],
      },
      {
        heading: "Questions group leadership should ask any vendor",
        paragraphs: [
          "If you run or advise a multi-campus group, these questions expose in one demo whether a product models governance or merely multiplies logins.",
        ],
        bullets: [
          "Show me a fee policy defined once at the trust and applied at two campuses with a permitted local variation. Where does the variation live?",
          "A campus admin tries to exceed their concession limit. What exactly happens — and what does the trust see afterwards?",
          "Show me group-level collections right now, then drill into one campus, one class, one student — without an export at any step.",
          "Add a new campus. What must be recreated from scratch, and what does it inherit from the trust?",
          "Show me the audit trail for one record that two different roles at two campuses have touched.",
        ],
      },
      {
        heading: "Where SquareCampus fits",
        paragraphs: [
          "This governance model is not a feature we added; it is the thesis SquareCampus is built on — trust-level governance with campus-level autonomy, on one governed system of record. Policies, approval chains, and data definitions are set once at the institution; campuses execute inside guardrails; and every action lands on the same auditable timeline that leadership reads live.",
          "If your group is caught in the centralise-or-drift oscillation, the most useful demo is your own structure: bring your campuses, your fee frameworks, and your approval rules, and see the model expressed in software. And bring the five questions above — for us and for whoever else you evaluate.",
        ],
      },
    ],
    cta: {
      heading: "See your group's structure in the system",
      body: "Bring your campuses, fee frameworks, and approval rules to a guided demo — we will map trust-level governance with campus-level autonomy to how your group actually runs.",
      href: "/demo",
      label: "Book a multi-campus demo",
    },
  },
  {
    slug: "why-squarecampus-exists",
    title: "Why SquareCampus exists: calm systems for real schools",
    summary:
      "We built SquareCampus to replace fragmented tools with one reliable operating system, so schools can focus on students instead of software gaps.",
    date: "2026-01-22",
    tag: "Mission",
    tags: ["school operating system", "school software India", "founder note"],
    readingTime: "6 min read",
    hero: {
      eyebrow: "Founder note",
      lede: "Schools deserve software that feels predictable, respectful, and accountable. SquareCampus is our response to the chaos schools were forced to manage every day. This is the story of why we built it, what we believe, and how we think about the future of school operations.",
    },
    image: {
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=675&fit=crop",
      alt: "Students in a modern classroom environment with natural light.",
      caption:
        "Schools are mission-critical environments. The software that runs them should reflect that seriousness.",
    },
    sections: [
      {
        heading: "The problem we refuse to normalize",
        paragraphs: [
          "Walk into any school office in India during admission season, fee collection week, or report card distribution. You will find staff switching between five different applications, cross-referencing three spreadsheets, and manually copying data from one system to another. This is not a failure of the people. It is a failure of the tools they were given.",
          "The story repeats across institutions: critical data sits in silos, reports contradict each other, and staff are expected to stitch everything together by hand. For many principals, the morning routine is detective work just to understand how many students paid fees that week.",
          "We decided not to normalize that reality. A school is a mission-critical environment, not a startup experiment. The software must reduce risk, not create it. When a parent asks about their child's attendance or a trustee needs a financial report, the answer should be one click away—not a 30-minute data reconciliation exercise.",
        ],
        bullets: [
          "Single source of truth for admissions, academics, finance, and operations.",
          "Clear accountability on who changed what and when.",
          "Predictable workflows that do not collapse when staff changes.",
          "Real-time data that leadership can trust without manual verification.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop",
          alt: "Person working with documents and a laptop, representing administrative work.",
          caption: "Administrative staff deserve tools that work with them, not against them.",
          orientation: "right",
        },
      },
      {
        heading: "What school operations actually look like",
        paragraphs: [
          "Spend time inside school offices — with principals, bursars, class teachers, transport coordinators, and parents — and the patterns repeat across school sizes and boards. Fee collection is a pain point, not because parents don't want to pay, but because the process is fragmented and confusing. Attendance data exists but isn't actionable. Report cards take weeks to generate because data lives in different places. Communication with parents is either too much or too little, never quite right.",
          "Most importantly, schools are not looking for more features. They are looking for fewer problems. They want software that disappears into the background and lets them focus on education. That insight shaped everything we built.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=450&fit=crop",
          alt: "Teacher interacting with students in a classroom setting.",
          caption: "Every feature we build is informed by real conversations with educators.",
          orientation: "top",
        },
      },
      {
        heading: "An operating system, not another tool",
        paragraphs: [
          "SquareCampus is designed as a system of record, not a loose collection of features. Every module—admissions, academics, fees, transport, communication—speaks the same language, shares the same identities, and respects the same permissions model. When you update a student's class section, that change propagates everywhere: fee structures, transport routes, timetables, and parent notifications.",
          "That design choice eliminates handoffs and removes the hidden labor of reconciling different dashboards. It also protects students and staff by ensuring data is accurate and auditable. You cannot accidentally send a fee reminder to a student who has already paid, because the system knows.",
          "We call it a School OS because it functions like an operating system for your campus. Just as your phone's OS coordinates between apps, camera, and notifications, SquareCampus coordinates between departments, processes, and stakeholders. The principal sees a dashboard. The accountant sees a ledger. The parent sees an app. But underneath, it is all the same data, the same truth.",
        ],
        bullets: [
          "Unified identity: one student record across all modules.",
          "Cascading updates: change once, reflect everywhere.",
          "Permission inheritance: define once at the org level, customize at the branch level.",
          "Audit trails: every change logged with who, what, when, and why.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
          alt: "Modern dashboard interface showing connected data systems.",
          caption: "Every module shares the same identity model and permissions architecture.",
          orientation: "left",
        },
      },
      {
        heading: "The burden of broken systems",
        paragraphs: [
          "The cost of fragmented school software is not just inefficiency—it is stress. Picture the accountant who spends every Saturday reconciling fee data between an ERP, a payment gateway, and accounting software. Over three years, that is 150 Saturdays lost to a problem software should have solved.",
          "Or the principal who cannot answer a trustee's question about student strength by board because the data is split across four systems with four different definitions of 'active student.' Or the transport coordinator managing 40 bus routes through WhatsApp groups and a printed spreadsheet because the official software is 'too complicated.'",
          "These are not edge cases. These are the everyday realities of Indian schools. And the people dealing with them are not complainers—they are dedicated professionals who have learned to work around their tools instead of with them. SquareCampus exists because they deserve better.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop",
          alt: "Person overwhelmed with paperwork and documents.",
          caption:
            "Schools should not have to choose between doing their job and fighting their software.",
          orientation: "right",
        },
      },
      {
        heading: "Reliability is a promise, not a slogan",
        paragraphs: [
          "Schools cannot pause operations when a system slows down. Fee collection cannot wait. Attendance must be marked. Report cards must go out. We engineer for predictable performance, clear audit trails, and secure access boundaries. When a school trusts us with their data, we treat that trust as sacred.",
          "This is why we invest in infrastructure discipline: automated backups, redundant systems, and proactive monitoring. It is why we obsess over role-based access controls—ensuring that a class teacher can see their students but not the salary data of their colleagues. It is why we build consistent reporting that leadership can share with trustees without double-checking every number.",
          "Reliability also means responsive support. When something goes wrong—and in software, something always eventually goes wrong—schools need a partner who picks up the phone and fixes the problem. Not a chatbot. Not a ticket queue. A human who understands school operations and can resolve issues quickly.",
        ],
        bullets: [
          "Operational visibility for principals and finance teams in real-time.",
          "Data safeguards aligned to Indian compliance expectations including DPDP Act.",
          "Structured onboarding so teams know exactly what to do on day one.",
          "Named success partners, not anonymous support tickets.",
          "Clear incident communication when issues arise.",
        ],
      },
      {
        heading: "Built for Indian schools, specifically",
        paragraphs: [
          "India's education landscape is unique. We have CBSE, ICSE, state boards, international boards—each with different grading patterns, exam structures, and reporting requirements. We have schools that run on single campuses and education groups that manage 50+ branches. We have urban schools with digital-native parents and rural schools where SMS is still the primary communication channel.",
          "SquareCampus is built for this complexity. Our fee structures support the installment patterns that Indian parents expect. Our report cards generate in the formats that different boards require. Our communication module handles WhatsApp, SMS, email, and app notifications because different parents prefer different channels. Our multi-campus architecture supports everything from centralized control to federated management.",
          "We also understand that data residency matters. SquareCampus is designed to keep institutional data in India, in an Indian cloud region. This is not just a compliance checkbox—it is a reflection of our belief that Indian schools should not have to send their students' data overseas.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop",
          alt: "Diverse group of students in school uniforms.",
          caption: "Built for the diversity and complexity of Indian education.",
          orientation: "top",
        },
      },
      {
        heading: "The mission we are accountable to",
        paragraphs: [
          "Our mission is to give schools a dependable operating system that removes friction for staff and protects student data. Every feature must reinforce that mission, or it does not ship. We are not building for vanity metrics. We are not trying to become a 'super app' that does everything poorly. We are building for stability, trust, and long-term partnership with the institutions that educate the next generation.",
          "This means saying no to features that add complexity without adding value. It means investing in boring infrastructure work that users never see but always benefit from. It means treating every school's data as if it were our own children's data—with care, respect, and appropriate paranoia about security.",
          "We know we are not the only option in the market. Schools can choose from dozens of ERPs, each promising transformation and innovation. What we offer instead is predictability. We offer software that works the same way today as it will work next year. We offer a team that shows up, listens, and improves. We offer a system you can trust.",
        ],
      },
      {
        heading: "What comes next",
        paragraphs: [
          "SquareCampus is not finished. No software ever is. We improve continuously based on feedback from the institutions we work with. Our roadmap includes deeper analytics, better mobile experiences, and expanded integrations with the tools schools already use. But we will never sacrifice stability for speed.",
          "We also want to build a community. Schools that use SquareCampus should be able to learn from each other—sharing workflows, templates, and best practices. We believe that the best ideas often come from educators themselves, and our job is to turn those ideas into software that works.",
          "If you are a school leader reading this, know that we built SquareCampus for you. Not for venture capitalists. Not for awards. For you, your staff, your students, and their parents. We would be honored to show you how it works.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop",
          alt: "Team collaboration and discussion in a modern workspace.",
          caption: "We're building this with schools, not just for them.",
          orientation: "left",
        },
      },
    ],
    cta: {
      heading: "See how the system fits your campus",
      body: "If you want a calm, audit-friendly operating system built for Indian schools, we would like to show you how SquareCampus maps to your workflows. Book a 30-minute demo and see the difference a unified system makes.",
      href: "/contact-us",
      label: "Book a guided demo",
    },
  },
];

export const blogPostBySlug = (slug: string) => blogPosts.find((post) => post.slug === slug);
