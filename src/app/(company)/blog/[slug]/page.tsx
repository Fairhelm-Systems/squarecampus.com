import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/site/button-link";
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
    alternates: {
      canonical: `https://squarecampus.com/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `https://squarecampus.com/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-12">
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="rounded-full border border-(--line) bg-(--surface) px-3 py-1.5">
              {post.tag ?? "Update"}
            </span>
            <span>{post.date}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="space-y-4">
            <p className="section-kicker">{post.hero.eyebrow}</p>
            <h1 className="font-display text-3xl leading-tight tracking-[-0.05em] sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              {post.hero.lede}
            </p>
          </div>
        </header>

        {post.image ? (
          <figure className="surface-panel overflow-hidden rounded-[1.6rem]">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              priority
            />
            <figcaption className="border-t border-(--line) px-6 py-4 text-sm text-muted-foreground">
              {post.image.caption}
            </figcaption>
          </figure>
        ) : null}

        <section className="flex flex-col gap-12">
          {post.sections.map((section) => (
            <BlogSectionBlock key={section.heading} section={section} />
          ))}
        </section>

        <section className="surface-panel-strong rounded-[2rem] p-6 sm:p-8">
          <h3 className="font-display text-2xl tracking-[-0.04em]">{post.cta.heading}</h3>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">{post.cta.body}</p>
          <div className="mt-6">
            <ButtonLink href={post.cta.href} label={post.cta.label} />
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-(--line) pt-8 text-sm text-muted-foreground">
          <Link href="/blog" className="font-medium text-foreground hover:underline">
            ← Back to blog
          </Link>
          <span>SquareCampus · Building calm systems for schools</span>
        </div>
      </article>
    </main>
  );
}

function SectionImage({ image }: { image: BlogSection["image"] }) {
  if (!image) return null;

  return (
    <figure className="surface-panel overflow-hidden rounded-[1.4rem]">
      <Image
        src={image.src}
        alt={image.alt}
        width={800}
        height={450}
        className="h-auto w-full object-cover"
      />
      {image.caption && (
        <figcaption className="border-t border-(--line) px-4 py-3 text-xs text-muted-foreground">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function SectionContent({ section }: { section: BlogSection }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-2xl tracking-[-0.04em]">{section.heading}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-base leading-8 text-muted-foreground">
          {paragraph}
        </p>
      ))}
      {section.bullets && (
        <ul className="flex flex-col gap-2 pl-5 text-base text-muted-foreground">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="list-disc leading-7">
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

  if (!image) {
    return <SectionContent section={section} />;
  }

  if (image.orientation === "top") {
    return (
      <div className="flex flex-col gap-6">
        <SectionImage image={image} />
        <SectionContent section={section} />
      </div>
    );
  }

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
