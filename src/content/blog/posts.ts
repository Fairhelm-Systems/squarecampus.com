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
    slug: "why-squarecampus-exists",
    title: "Why SquareCampus exists: calm systems for real schools",
    summary:
      "We built SquareCampus to replace fragmented tools with one reliable operating system, so schools can focus on students instead of software gaps.",
    date: "2026-01-22",
    tag: "Mission",
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
          "School leaders told us the same story over and over: critical data sat in silos, reports contradicted each other, and staff were expected to stitch everything together by hand. One principal described her morning routine as 'playing detective' just to understand how many students had paid fees that week.",
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
        heading: "What we learned from 50+ school visits",
        paragraphs: [
          "Before writing a single line of code, we spent six months visiting schools across Maharashtra, Gujarat, Karnataka, and Tamil Nadu. We sat with principals, bursars, class teachers, transport coordinators, and parents. We watched them work. We asked them what broke, what frustrated them, and what they wished existed.",
          "The patterns were consistent across school sizes and boards. Fee collection was always a pain point—not because parents didn't want to pay, but because the process was fragmented and confusing. Attendance data existed but wasn't actionable. Report cards took weeks to generate because data lived in different places. Communication with parents was either too much or too little, never quite right.",
          "Most importantly, we learned that schools are not looking for more features. They are looking for fewer problems. They want software that disappears into the background and lets them focus on education. That insight shaped everything we built.",
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
          "The cost of fragmented school software is not just inefficiency—it is stress. We met a school accountant who spent every Saturday reconciling fee data between their ERP, their payment gateway, and their accounting software. She had been doing this for three years. That is 150 Saturdays lost to a problem that software should have solved.",
          "We met a principal who could not answer a trustee's question about student strength by board because the data was split across four different systems with four different definitions of 'active student.' We met a transport coordinator who managed 40 bus routes using WhatsApp groups and a printed spreadsheet because the official software was 'too complicated.'",
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
          "We also understand that data residency matters. All SquareCampus data is stored in India, on Indian infrastructure, under Indian jurisdiction. This is not just a compliance checkbox—it is a reflection of our belief that Indian schools should not have to send their students' data overseas.",
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
          "SquareCampus is not finished. No software ever is. We are continuously improving based on feedback from the schools we serve. Our roadmap includes deeper analytics, better mobile experiences, and expanded integrations with the tools schools already use. But we will never sacrifice stability for speed.",
          "We are also building a community. Schools that use SquareCampus can learn from each other—sharing workflows, templates, and best practices. We host sessions where principals can discuss operational challenges with peers. We believe that the best ideas often come from educators themselves, and our job is to turn those ideas into software that works.",
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
