import { ArrowUpRight, Check, CircleHelp, MapPinned, Workflow } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { intentPageBySlug, intentPages } from "@/content/intent-pages";
import { siteCtas } from "@/content/site-content";
import { canonicalUrl, createAlternates, createBreadcrumbSchema, SEO_CONFIG } from "@/lib/seo";

/**
 * Search-intent pages, one per query cluster, rendered from
 * `src/content/intent-pages.ts`. Flat keyword slugs on purpose: the URL is
 * part of the answer. Static routes under this group take precedence, and
 * `dynamicParams = false` means only listed slugs are exported.
 */

type PageProps = {
  params: Promise<{ intent: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return intentPages.map((page) => ({ intent: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { intent } = await params;
  const page = intentPageBySlug(intent);
  if (!page) {
    return { title: "SquareCampus" };
  }
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: createAlternates(`/${page.slug}`),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonicalUrl(`/${page.slug}`),
    },
  };
}

export default async function IntentPage({ params }: PageProps) {
  const { intent } = await params;
  const page = intentPageBySlug(intent);
  if (!page) {
    return null;
  }

  const path = `/${page.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SEO_CONFIG.baseUrl}${path}#webpage`,
        name: page.metaTitle,
        description: page.metaDescription,
        url: canonicalUrl(path),
        inLanguage: SEO_CONFIG.language,
        isPartOf: { "@id": `${SEO_CONFIG.baseUrl}/#website` },
      },
      createBreadcrumbSchema([
        { name: "Home", url: SEO_CONFIG.baseUrl },
        { name: "School Management System", url: canonicalUrl("/school-management-system") },
        { name: page.keyword, url: canonicalUrl(path) },
      ]),
      {
        "@type": "FAQPage",
        "@id": `${SEO_CONFIG.baseUrl}${path}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SectionShell className="pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <Reveal immediate className="space-y-6">
            <p className="section-kicker">
              <Link href="/school-management-system/" className="hover:text-foreground">
                School management system
              </Link>{" "}
              · {page.keyword}
            </p>
            <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-[3.6rem]">
              {page.h1}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">{page.lede}</p>
            <div className="flex flex-wrap gap-2">
              {page.audience.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-(--line) bg-(--surface) px-3 py-2 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteCtas.demoHref} label="Book a guided demo" variant="cta" />
              <ButtonLink
                href={siteCtas.platformHref}
                label="See the platform"
                variant="secondary"
              />
            </div>
          </Reveal>

          {/* The direct answer. Written to stand alone: this is the block a
              search engine lifts into a snippet or an assistant quotes. */}
          <Reveal
            immediate
            delay={120}
            className="surface-panel-strong rounded-[1.8rem] p-6 lg:p-7"
          >
            <p className="section-kicker">Direct answer</p>
            <h2 className="mt-4 font-display text-2xl tracking-[-0.04em]">
              {page.definition.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">{page.definition.body}</p>
            <p className="mt-5 border-t border-(--line) pt-4 text-sm leading-6 text-muted-foreground">
              SquareCampus includes these capabilities and is positioned as a School Operating
              System.{" "}
              <Link
                href="/what-is-squarecampus/"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Read the canonical definition
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="How it runs in SquareCampus"
        title="Each step has an owner and leaves a record"
        body="A module list hides the real question: does the work connect? These are the workflows as they run in production."
      >
        <Reveal staggerChildren className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {page.workflows.map((item) => (
            <article
              key={item.title}
              data-reveal-item
              className="surface-panel rounded-[1.6rem] p-6"
            >
              <Workflow className="size-5 text-(--brand)" />
              <h3 className="mt-5 font-display text-xl tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Built for India"
        title="The realities Indian schools run on"
        body="Boards, fee structures, trusts and parent channels are configuration here, not customisation projects."
      >
        <Reveal className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="surface-panel-strong rounded-[1.8rem] p-7">
            <div className="flex items-center gap-2">
              <MapPinned className="size-4 text-(--brand)" />
              <p className="section-kicker">India-first specifics</p>
            </div>
            <ul className="mt-5 grid gap-3">
              {page.indiaSpecifics.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <Check className="mt-1 size-3.5 shrink-0 text-(--brand)" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-panel rounded-[1.8rem] p-7">
            <div className="flex items-center gap-2">
              <CircleHelp className="size-4 text-(--teal)" />
              <p className="section-kicker">What to check in any vendor</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Ask these of every vendor you evaluate, including us. The answers separate a connected
              system from a set of modules.
            </p>
            <ol className="mt-5 grid gap-3">
              {page.evaluation.map((item, index) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-(--surface-muted) font-mono text-[0.6rem] text-muted-foreground">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Questions"
        title={`${page.keyword}: common questions`}
        body="Short answers, the way a buyer asks them. The FAQ page covers evaluation, security and rollout in more depth."
      >
        <Reveal className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="grid gap-3">
            {page.faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="surface-panel rounded-[1.4rem] border-0 px-6"
              >
                <AccordionTrigger className="py-5 text-left font-display text-lg tracking-[-0.03em] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-7 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            More on evaluation, security and rollout in the{" "}
            <Link href="/faq/" className="text-foreground underline-offset-4 hover:underline">
              FAQ
            </Link>
            .
          </p>
        </Reveal>
      </SectionShell>

      <SectionShell
        eyebrow="Related"
        title="Keep reading"
        body="The pages a buyer on this question usually reads next."
      >
        <Reveal staggerChildren className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {page.related.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-reveal-item
              className="surface-panel group flex items-start justify-between gap-4 rounded-[1.4rem] p-5 transition-colors hover:border-(--line-strong)"
            >
              <span>
                <span className="block font-display text-lg tracking-[-0.03em] text-foreground">
                  {link.label}
                </span>
                <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                  {link.note}
                </span>
              </span>
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-(--brand)" />
            </Link>
          ))}
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-16">
        <Reveal className="surface-panel-strong rounded-[2rem] p-8 text-center sm:p-10">
          <p className="section-kicker">Next step</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl tracking-[-0.05em] sm:text-4xl">
            Bring one real bottleneck. We will show how it runs.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            A guided demo on your own scenario, followed by a written scope, from a{" "}
            <Link href="/about/" className="text-foreground underline-offset-4 hover:underline">
              founder-led team
            </Link>
            . No figures on the site, no pressure in the call.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href={siteCtas.demoHref} label="Book a guided demo" variant="cta" />
            <ButtonLink href="/pricing/" label="How pricing works" variant="secondary" />
          </div>
        </Reveal>
      </SectionShell>
    </main>
  );
}
