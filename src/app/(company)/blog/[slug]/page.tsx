import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FloatingHomeButton } from "@/components/marketing/floating-home-button";
import type { BlogSection } from "@/content/blog/posts";
import { blogPostBySlug, blogPosts } from "@/content/blog/posts";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug(slug);
  if (!post) {
    return { title: "Blog | SquareCampus" };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `https://squarecampus.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <FloatingHomeButton href="/" />
      <main className="min-h-[100dvh] bg-neutral-950 px-4 py-16 sm:px-6 lg:px-10">
        <article className="mx-auto flex w-full max-w-4xl flex-col gap-12">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {post.tag ?? "Update"}
              </span>
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                {post.hero.eyebrow}
              </p>
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                {post.hero.lede}
              </p>
            </div>
          </header>

          {post.image ? (
            <figure className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={1200}
                height={675}
                className="h-auto w-full object-cover"
                priority
              />
              <figcaption className="border-t border-white/5 px-6 py-4 text-sm text-neutral-400">
                {post.image.caption}
              </figcaption>
            </figure>
          ) : null}

          <section className="space-y-12">
            {post.sections.map((section) => (
              <BlogSectionBlock key={section.heading} section={section} />
            ))}
          </section>

          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-white">{post.cta.heading}</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">{post.cta.body}</p>
            <Link
              href={post.cta.href}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              {post.cta.label}
            </Link>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-neutral-400">
            <Link href="/blog" className="text-sky-400 hover:text-sky-300">
              Back to blog
            </Link>
            <span>SquareCampus | Building calm systems for schools</span>
          </div>
        </article>
      </main>
    </>
  );
}

function SectionImage({ image }: { image: BlogSection["image"] }) {
  if (!image) return null;

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50">
      <Image
        src={image.src}
        alt={image.alt}
        width={800}
        height={450}
        className="h-auto w-full object-cover"
      />
      {image.caption && (
        <figcaption className="border-t border-white/5 px-4 py-3 text-xs text-neutral-400">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function SectionContent({ section }: { section: BlogSection }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-base leading-relaxed text-neutral-300">
          {paragraph}
        </p>
      ))}
      {section.bullets && (
        <ul className="space-y-2 pl-5 text-sm text-neutral-300">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="list-disc">
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BlogSectionBlock({ section }: { section: BlogSection }) {
  const { image } = section;

  // No image - simple content block
  if (!image) {
    return <SectionContent section={section} />;
  }

  // Image on top
  if (image.orientation === "top") {
    return (
      <div className="space-y-6">
        <SectionImage image={image} />
        <SectionContent section={section} />
      </div>
    );
  }

  // Image on left or right - side-by-side layout
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-2 lg:items-start",
        image.orientation === "right" && "lg:[&>*:first-child]:order-2"
      )}
    >
      <SectionImage image={image} />
      <SectionContent section={section} />
    </div>
  );
}
