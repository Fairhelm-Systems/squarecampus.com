import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { PageSchema } from "@/components/site/page-schema";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { blogPosts } from "@/content/blog/posts";
import { canonicalUrl, SEO_CONFIG } from "@/lib/seo";

// Editorial "survey" geometry over card banners: lines draw themselves in,
// plotted nodes pop staggered, and a soft light sweep crosses the image.
// Variant shifts the composition so adjacent cards don't repeat.
function CardGeometry({ variant }: { variant: 0 | 1 | 2 }) {
  const lineClass =
    "transition-[stroke-dashoffset] duration-[1100ms] ease-out [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0]";
  const dashClass =
    "transition-[stroke-dashoffset] delay-150 duration-[1300ms] ease-out [stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0]";
  const nodeClass =
    "origin-center scale-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] [transform-box:fill-box] group-hover:scale-100";

  const compositions = [
    {
      line: "M-20 150L150 70L300 108L470 20",
      dash: "M40 12C140 44 240 40 420 96",
      nodes: [
        [150, 70, 11],
        [300, 108, 7],
        [418, 30, 16],
      ],
    },
    {
      line: "M-10 40L130 120L320 60L480 130",
      dash: "M60 150C180 110 300 140 460 60",
      nodes: [
        [130, 120, 9],
        [320, 60, 14],
        [452, 122, 7],
      ],
    },
    {
      line: "M20 -10L110 90L280 40L440 120",
      dash: "M-10 110C120 150 260 90 470 140",
      nodes: [
        [110, 90, 13],
        [280, 40, 8],
        [430, 112, 10],
      ],
    },
  ] as const;
  const c = compositions[variant];

  return (
    <>
      {/* Light sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)] transition-transform duration-[1200ms] ease-out group-hover:translate-x-full" />
      <svg
        viewBox="0 0 480 160"
        aria-hidden="true"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full stroke-white/50 [fill:rgba(255,255,255,0.12)]"
      >
        <path d={c.line} fill="none" strokeWidth="1.6" pathLength={1} className={lineClass} />
        <path
          d={c.dash}
          fill="none"
          strokeWidth="1.2"
          strokeDasharray="6 10"
          pathLength={1}
          className={dashClass}
        />
        {c.nodes.map(([cx, cy, r], i) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={r}
            strokeWidth="1.5"
            className={nodeClass}
            style={{ transitionDelay: `${350 + i * 130}ms` }}
          />
        ))}
      </svg>
      {/* Corner reticle */}
      <div className="pointer-events-none absolute right-4 top-4 size-6 opacity-0 transition-opacity delay-200 duration-500 group-hover:opacity-70">
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/70" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/70" />
        <div className="absolute inset-0 rounded-full border border-white/50" />
      </div>
    </>
  );
}

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const hasPosts = posts.length > 0;

  return (
    <main>
      <PageSchema
        name="Blog"
        description="Writing on school operations, multi-campus governance, migration risk and how institutions evaluate school management systems."
        path="/blog"
      />

      {/*
        Blog + ItemList for the index itself.

        PageSchema says what this page is; this says what it contains. Without
        it, the library is discoverable only by following each card, and a
        crawler or assistant that reads structured data has no way to learn the
        set exists. Every post is listed with its own URL, date and headline —
        all facts already on the page, restated in a form machines read.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${canonicalUrl("/blog")}#blog`,
            name: "SquareCampus Blog",
            description:
              "Writing on school operations, governance, exception handling and how institutions evaluate school management systems.",
            url: canonicalUrl("/blog"),
            inLanguage: SEO_CONFIG.language,
            publisher: { "@id": `${SEO_CONFIG.baseUrl}/#org` },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              "@id": `${canonicalUrl(`/blog/${post.slug}`)}#article`,
              headline: post.title,
              description: post.summary,
              url: canonicalUrl(`/blog/${post.slug}`),
              datePublished: post.date,
              ...(post.tag && { articleSection: post.tag }),
              ...(post.tags?.length && { keywords: post.tags.join(", ") }),
            })),
          }),
        }}
      />

      <SectionShell className="pt-12 sm:pt-16">
        <Reveal immediate className="max-w-3xl space-y-6">
          <p className="section-kicker">Blog</p>
          <h1 className="font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Stories from the SquareCampus team.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Product releases, implementation insights, and behind-the-scenes notes on building an
            operating system for schools and colleges.
          </p>
        </Reveal>
      </SectionShell>

      <SectionShell className="pb-22 pt-0">
        {hasPosts ? (
          <Reveal staggerChildren className="grid gap-4 md:grid-cols-2">
            {posts.map((post, index) => {
              const variant = (index % 3) as 0 | 1 | 2;

              return (
                <article
                  key={post.slug}
                  data-reveal-item
                  className="surface-panel group relative flex flex-col overflow-hidden rounded-[1.6rem] transition-shadow hover:shadow-[0_30px_72px_rgba(8,15,30,0.1)]"
                >
                  {post.image ? (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.image.src}
                        alt={post.image.alt}
                        fill
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,38,0.05),rgba(16,24,38,0.42))]" />
                      <CardGeometry variant={variant} />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-(--line) bg-(--surface-strong) px-3 py-1.5 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground">
                        {post.tag ?? "Update"}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                        {post.date} · {post.readingTime}
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-2xl tracking-[-0.04em]">
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">{post.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-(--brand)">
                      Read the post
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </Reveal>
        ) : (
          <Reveal className="surface-panel-strong rounded-[2rem] p-8 lg:p-10">
            <p className="section-kicker">No posts yet — we&rsquo;re busy shipping</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl tracking-[-0.05em]">
              Product updates, implementation stories, and practical playbooks land here soon.
            </h2>
            <div className="mt-6">
              <ButtonLink
                href="https://www.linkedin.com/company/square-campus"
                label="Follow on LinkedIn"
                external
                variant="secondary"
              />
            </div>
          </Reveal>
        )}
      </SectionShell>
    </main>
  );
}
