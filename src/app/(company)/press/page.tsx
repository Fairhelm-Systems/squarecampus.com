import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";

type PressItem = {
  slug: string;
  title: string;
  date: string;
  outlet: string;
  summary: string;
  href?: string;
};

// Press releases & coverage — add items here as they go live.
const pressItems: PressItem[] = [];

const companyFacts = [
  {
    title: "Overview",
    body: "SquareCampus is an operating system for schools and colleges, connecting admissions, academics, finance, and communication into one platform.",
  },
  {
    title: "Founded",
    body: "SquareCampus is a product of Fairhelm Systems (OPC) Private Limited, incorporated in India on 5 August 2026, founded and led by Mohit Gupta, sole founder.",
  },
  {
    title: "Media contact",
    body: "For media enquiries, please write to press@squarecampus.com.",
  },
] as const;

export default function PressPage() {
  const hasPress = pressItems.length > 0;

  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <Reveal className="max-w-3xl space-y-6">
          <p className="section-kicker">Press</p>
          <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Press resources &amp; media contact.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            For journalists, partners, and event organizers who need a concise view of what
            SquareCampus does and how to reach us.
          </p>
        </Reveal>
      </SectionShell>

      <SectionShell eyebrow="Company snapshot" title="The short version" className="pt-0">
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-3">
          {companyFacts.map((item) => (
            <article
              key={item.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <p className="section-kicker">{item.title}</p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell eyebrow="Coverage" title="Press releases &amp; coverage" className="pb-22 pt-0">
        <Reveal>
          {hasPress ? (
            <div className="grid gap-4">
              {pressItems.map((item) => (
                <article
                  key={item.slug}
                  className="surface-panel flex flex-col gap-4 rounded-[1.6rem] p-6 md:flex-row md:items-start md:justify-between"
                >
                  <div>
                    <p className="section-kicker">
                      {item.outlet} · {item.date}
                    </p>
                    <h2 className="mt-3 font-display text-2xl tracking-[-0.04em]">{item.title}</h2>
                    <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                      {item.summary}
                    </p>
                  </div>
                  {item.href ? (
                    <ButtonLink
                      href={item.href}
                      label="View article"
                      external
                      variant="secondary"
                    />
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="surface-panel-strong rounded-[2rem] p-8 lg:p-10">
              <p className="section-kicker">No press releases published yet</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl tracking-[-0.05em]">
                Announcements and coverage will appear here as we grow.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                For official quotes, background, or data points, reach out and we&rsquo;ll respond
                with what you need.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="mailto:press@squarecampus.com" label="Email media contact" />
                <ButtonLink
                  href="https://www.linkedin.com/company/square-campus"
                  label="Follow on LinkedIn"
                  external
                  variant="secondary"
                />
              </div>
            </div>
          )}
        </Reveal>
      </SectionShell>
    </main>
  );
}
