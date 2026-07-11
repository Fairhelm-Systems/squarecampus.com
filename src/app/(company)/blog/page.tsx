import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/site/button-link";
import { Reveal } from "@/components/site/reveal";
import { SectionShell } from "@/components/site/section-shell";
import { blogPosts } from "@/content/blog/posts";

export default function BlogPage() {
  const hasPosts = blogPosts.length > 0;

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
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                data-reveal-item
                className="surface-panel group relative flex flex-col rounded-[1.6rem] p-6 transition-shadow hover:shadow-[0_30px_72px_rgba(8,15,30,0.1)]"
              >
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
