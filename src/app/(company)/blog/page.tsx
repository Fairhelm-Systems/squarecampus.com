import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";

export const metadata: Metadata = {
  title: "Blog | SquareCampus",
  description:
    "Product updates, implementation stories, and practical insights from the SquareCampus team.",
};

type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tag?: string;
};

// When the operation expands, just drop new posts into this array
// or wire it up to a CMS / MDX loader.
const posts: BlogPost[] = [
  // Example for later:
  // {
  //   slug: "launching-squarecampus",
  //   title: "Launching SquareCampus",
  //   summary:
  //     "Why we built an operating system for modern schools and colleges.",
  //   date: "2025-12-01",
  //   tag: "Product",
  // },
];

export default function BlogPage() {
  const hasPosts = posts.length > 0;

  return (
    <>
      <main className="bg-neutral-950 min-h-[100dvh] px-4 py-16 sm:px-6 lg:px-10 flex flex-col">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10">
          {/* Header */}
          <section className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/80">
              Blog
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-neutral-50 md:text-4xl">
                Stories from the SquareCampus team
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Updates, timelines, and behind-the-scenes notes on how we&apos;re
                building an operating system for schools and colleges. Product
                releases, implementation insights, and ideas from the field.
              </p>
            </div>
          </section>

          {/* Content */}
          {hasPosts ? (
            <section className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {posts.map((post) => (
                  <Card
                    key={post.slug}
                    className="border border-neutral-800/70 bg-neutral-900/60 transition-colors hover:border-neutral-300/70"
                  >
                    <CardContent className="flex h-full flex-col gap-3 p-5">
                      <div className="flex items-center justify-between text-xs text-neutral-400">
                        <span className="uppercase tracking-[0.2em]">
                          {post.tag ?? "Update"}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-sm font-semibold text-neutral-50">
                          {post.title}
                        </h2>
                        <p className="text-xs leading-relaxed text-neutral-300">
                          {post.summary}
                        </p>
                      </div>
                      <div className="mt-3">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-200 underline-offset-4 hover:text-white hover:underline"
                        >
                          Read more
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : (
            // Empty state while the first wave of posts is still being prepared
            <section className="space-y-6">
              <Card className="border border-dashed border-neutral-800 bg-neutral-900/60">
                <CardContent className="space-y-4 p-6">
                  <p className="text-sm font-semibold text-neutral-50">
                    No posts yet, we&apos;re busy shipping.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    We&apos;ll publish product updates, implementation stories,
                    and practical playbooks here soon. Until then, follow us on
                    LinkedIn for updates and new releases.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <Link
                      href="https://www.linkedin.com/company/square-campus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 font-semibold uppercase tracking-[0.22em] text-neutral-200 transition hover:border-neutral-300 hover:text-white"
                    >
                      Follow on LinkedIn
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </main>
      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
