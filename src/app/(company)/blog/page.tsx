import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { blogPosts } from "@/content/blog/posts";

// Decorative geometry in the same editorial language as the home page
// overlays: thin survey lines, plotted nodes, one dashed arc. Variant shifts
// the composition so adjacent cards don't repeat.
function CardGeometry({ variant }: { variant: 0 | 1 | 2 }) {
  const compositions = [
    <g key="a">
      <path d="M-20 150L150 70L300 108L470 20" fill="none" strokeWidth="1.6" />
      <path d="M40 12C140 44 240 40 420 96" fill="none" strokeWidth="1.2" strokeDasharray="6 10" />
      <circle cx="150" cy="70" r="11" strokeWidth="1.4" />
      <circle cx="300" cy="108" r="7" strokeWidth="1.4" />
      <circle cx="418" cy="30" r="16" strokeWidth="1.6" />
    </g>,
    <g key="b">
      <path d="M-10 40L130 120L320 60L480 130" fill="none" strokeWidth="1.6" />
      <path
        d="M60 150C180 110 300 140 460 60"
        fill="none"
        strokeWidth="1.2"
        strokeDasharray="6 10"
      />
      <circle cx="130" cy="120" r="9" strokeWidth="1.4" />
      <circle cx="320" cy="60" r="14" strokeWidth="1.6" />
      <circle cx="452" cy="122" r="7" strokeWidth="1.4" />
    </g>,
    <g key="c">
      <path d="M20 -10L110 90L280 40L440 120" fill="none" strokeWidth="1.6" />
      <path
        d="M-10 110C120 150 260 90 470 140"
        fill="none"
        strokeWidth="1.2"
        strokeDasharray="6 10"
      />
      <circle cx="110" cy="90" r="13" strokeWidth="1.6" />
      <circle cx="280" cy="40" r="8" strokeWidth="1.4" />
      <circle cx="430" cy="112" r="10" strokeWidth="1.4" />
    </g>,
  ] as const;

  return (
    <svg
      viewBox="0 0 480 160"
      aria-hidden="true"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full stroke-white/35 opacity-0 transition-opacity duration-500 [fill:rgba(255,255,255,0.08)] group-hover:opacity-100"
    >
      {compositions[variant]}
    </svg>
  );
}

// Fallback banner for posts without a hero image: the same geometry over a
// quiet brand-tinted field, always visible.
function AbstractBanner({ variant }: { variant: 0 | 1 | 2 }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-[linear-gradient(135deg,color-mix(in_oklch,var(--brand),transparent_82%),color-mix(in_oklch,var(--teal),transparent_88%))]">
      <svg
        viewBox="0 0 480 160"
        aria-hidden="true"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full stroke-(--brand) opacity-40 [fill:color-mix(in_oklch,var(--brand),transparent_80%)]"
      >
        {variant === 0 ? (
          <g>
            <path d="M-20 150L150 70L300 108L470 20" fill="none" strokeWidth="1.6" />
            <circle cx="150" cy="70" r="11" strokeWidth="1.4" />
            <circle cx="418" cy="30" r="16" strokeWidth="1.6" />
          </g>
        ) : variant === 1 ? (
          <g>
            <path d="M-10 40L130 120L320 60L480 130" fill="none" strokeWidth="1.6" />
            <circle cx="320" cy="60" r="14" strokeWidth="1.6" />
            <circle cx="130" cy="120" r="9" strokeWidth="1.4" />
          </g>
        ) : (
          <g>
            <path d="M20 -10L110 90L280 40L440 120" fill="none" strokeWidth="1.6" />
            <circle cx="110" cy="90" r="13" strokeWidth="1.6" />
            <circle cx="280" cy="40" r="8" strokeWidth="1.4" />
          </g>
        )}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,var(--surface))]" />
    </div>
  );
}

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const hasPosts = posts.length > 0;

  return (
    <main>
      <SectionShell className="pt-12 sm:pt-16">
        <Reveal className="max-w-3xl space-y-6">
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
                  ) : (
                    <AbstractBanner variant={variant} />
                  )}

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
