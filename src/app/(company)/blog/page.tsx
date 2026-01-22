"use client";
import Link from "next/link";
import { motion } from "@/lib/motion";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "@/icons";
import { blogPosts } from "@/content/blog/posts";

export default function BlogPage() {
  const hasPosts = blogPosts.length > 0;

  return (
    <>
      <main className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-16 sm:px-6 lg:px-10">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[128px]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10">
          {/* Header */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-neutral-400 backdrop-blur-sm">
              <BookOpen className="h-3 w-3" />
              Blog
            </div>
            <div className="space-y-3">
              <h1 className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
                Stories from the SquareCampus team
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-300">
                Updates, timelines, and behind-the-scenes notes on how we're building an
                operating system for schools and colleges. Product releases, implementation
                insights, and ideas from the field.
              </p>
            </div>
          </motion.section>

          {/* Content */}
          {hasPosts ? (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950 shadow-xl shadow-black/20 transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <CardContent className="relative flex h-full flex-col gap-3 p-6">
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 uppercase tracking-[0.2em]">
                            {post.tag ?? "Update"}
                          </span>
                          <span>{post.date}</span>
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-lg font-semibold text-white">{post.title}</h2>
                          <p className="text-sm leading-relaxed text-neutral-300">{post.summary}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                            {post.readingTime}
                          </p>
                        </div>
                        <div className="mt-auto pt-3">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 transition-all hover:gap-3 hover:text-sky-300"
                          >
                            Read more →
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (
            // Empty state while the first wave of posts is still being prepared
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="relative overflow-hidden border border-dashed border-white/10 bg-gradient-to-br from-neutral-900/60 to-neutral-950/80 shadow-xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                <CardContent className="relative space-y-4 p-8">
                  <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-3">
                    <BookOpen className="h-6 w-6 text-sky-400" />
                  </div>
                  <p className="text-lg font-semibold text-white">
                    No posts yet, we're busy shipping.
                  </p>
                  <p className="text-sm leading-relaxed text-neutral-300">
                    We'll publish product updates, implementation stories, and practical
                    playbooks here soon. Until then, follow us on LinkedIn for updates and new
                    releases.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2 text-xs">
                    <Link
                      href="https://www.linkedin.com/company/square-campus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold uppercase tracking-[0.22em] text-white transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                    >
                      Follow on LinkedIn
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}
        </div>
      </main>
      <FloatingHomeButton href="/" label="Back to home" />
    </>
  );
}
