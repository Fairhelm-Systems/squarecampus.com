import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { PageSchema } from "@/components/site/page-schema";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { blogPosts } from "@/content/blog/posts";
import { canonicalUrl, SEO_CONFIG } from "@/lib/seo";

/**
 * Card banner treatment. The photo is the editorial content, so the hover
 * stays quiet: the image eases in, the bottom scrim deepens, and a reading
 * pill rises into the corner. Posts without a photo get a typographic banner
 * in the same frame so the grid stays even.
 */
function BannerHover({ readingTime }: { readingTime: string }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(16,24,38,0.02),rgba(16,24,38,0.34))] transition-opacity duration-500 group-hover:opacity-100 sm:opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(8,15,30,0.55))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white opacity-0 backdrop-blur-sm transition-[opacity,translate] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="size-1.5 rounded-full bg-(--teal)" />
        Read · {readingTime.replace(" read", "")}
      </span>
    </>
  );
}

function TypographicBanner({ tag, title }: { tag: string; title: string }) {
  const initial =
    title
      .replace(/^(The|A|An)\s+/i, "")
      .trim()
      .charAt(0) || "S";
  return (
    <div className="relative aspect-video overflow-hidden bg-[linear-gradient(135deg,#070b14,#0e1626_55%,#132040)]">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-2 font-display text-[13rem] leading-none tracking-[-0.08em] text-white/[0.06] transition-transform duration-700 ease-out group-hover:-translate-y-2"
      >
        {initial}
      </span>
      <span className="absolute left-6 top-6 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/60">
        SquareCampus · {tag}
      </span>
      <span className="absolute inset-x-6 bottom-6 h-px bg-[linear-gradient(90deg,var(--brand),var(--teal),transparent)] opacity-60" />
    </div>
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
            {posts.map((post) => (
              <article
                key={post.slug}
                data-reveal-item
                className="surface-panel group relative flex flex-col overflow-hidden rounded-[1.6rem] transition-[box-shadow,border-color] duration-500 hover:border-(--line-strong) hover:shadow-[0_30px_72px_rgba(8,15,30,0.12)]"
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
                    <BannerHover readingTime={post.readingTime} />
                  </div>
                ) : (
                  <TypographicBanner tag={post.tag ?? "Update"} title={post.title} />
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-(--line) bg-(--surface-strong) px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {post.tag ?? "Update"}
                    </span>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
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
            ))}
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
