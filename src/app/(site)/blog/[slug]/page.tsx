import Link from "next/link";
import { notFound } from "next/navigation";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { Photo } from "@/components/media/Photo";
import { DarkCtaBand } from "@/components/sections/DarkCtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Headline } from "@/components/ui/Headline";
import { ArrowLeft } from "@/components/ui/Icons";
import {
  categoryLabel,
  formatPostDate,
  getPost,
  getRelatedPosts,
  posts,
  readingTime,
  toPostSummary,
} from "@/content/blog";
import { journalCopy } from "@/content/pages";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Journal", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="gutter pb-10 pt-10 lg:pb-16 lg:pt-[90px]">
          <Link href="/blog" className="mb-8 inline-flex min-h-11 items-center gap-2.5 text-sm text-taupe hover:text-ink lg:mb-12">
            <ArrowLeft />
            Journal
          </Link>
          <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
            <div className="flex flex-col gap-5 lg:col-span-8 lg:gap-7">
              <p className="eyebrow text-taupe">
                {categoryLabel(post.category)} · {readingTime(post)} min read
              </p>
              <Headline
                as="h1"
                headline={post.headline ?? { lead: post.title, accent: "" }}
                className="animate-rise text-[44px] lg:text-[84px]"
              />
            </div>
            <p className="body-copy lg:col-span-4 lg:col-start-9">{post.excerpt}</p>
          </div>
        </header>

        <Photo
          photo={post.image}
          className="h-[300px] lg:mx-[var(--gutter)] lg:h-[min(48.6vw,760px)]"
          sizes="100vw"
          preload
        />

        <div className="gutter grid gap-y-8 py-12 lg:grid-cols-12 lg:gap-x-6 lg:py-[110px]">
          <aside className="flex flex-row gap-6 border-t border-rule pt-5 text-sm lg:col-span-3 lg:flex-col lg:gap-5 lg:self-start lg:pt-6">
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-taupe">Written by</span>
              <span className="font-semibold">{site.photographer}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-taupe">Published</span>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-5">
            <PostBody blocks={post.body} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="gutter border-t border-rule pb-20 pt-12 lg:pb-[140px] lg:pt-16">
          <h2 id="related-heading" className="eyebrow mb-10 text-taupe">
            Keep reading
          </h2>
          <ul className="grid gap-x-6 gap-y-14 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <PostCard post={toPostSummary(item)} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <DarkCtaBand headline={journalCopy.cta.headline}>
        <Link href="/contact" className="btn btn-light">
          Enquire about a shoot
        </Link>
      </DarkCtaBand>
    </>
  );
}
