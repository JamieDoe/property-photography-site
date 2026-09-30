"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import { Headline } from "@/components/ui/Headline";
import type { PostCategory } from "@/content/types";
import { PostCard, type PostSummary } from "./PostCard";

type JournalIndexProps = {
  /** Summaries only: full post bodies stay on the server. */
  posts: PostSummary[];
  featured: PostSummary;
  categories: { id: PostCategory; label: string }[];
};

/** Journal listing: category filter, a featured post and an image-led grid. */
export function JournalIndex({ posts, featured, categories }: JournalIndexProps) {
  const [filter, setFilter] = useState<PostCategory | "all">("all");
  const inFilter = (post: PostSummary) => filter === "all" || post.category === filter;
  const showFeatured = inFilter(featured);
  const rest = posts.filter((post) => post.slug !== featured.slug && inFilter(post));

  return (
    <>
      <div className="gutter -mt-2 mb-12 lg:mb-16">
        <div role="group" aria-label="Filter posts" className="rail -mx-5 gap-2 px-5 md:-mx-10 md:px-10 lg:mx-0 lg:px-0">
          {[{ id: "all" as const, label: "All" }, ...categories].map((category) => (
            <button
              key={category.id}
              type="button"
              className="chip"
              aria-pressed={filter === category.id}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {showFeatured && (
        <section aria-label="Featured post" className="gutter pb-16 lg:pb-[120px]">
          <Link
            href={`/blog/${featured.slug}`}
            className="lift group grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-6"
          >
            <Photo
              photo={featured.image}
              alt=""
              className="h-[300px] lg:col-span-7 lg:h-[min(41.7vw,700px)]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9 lg:gap-[22px] lg:pb-2">
              <span className="eyebrow text-taupe">Featured · {featured.meta}</span>
              <Headline
                as="h2"
                headline={featured.headline ?? { lead: featured.title, accent: "" }}
                className="text-[40px] leading-none lg:text-[52px]"
              />
              <p className="body-copy">{featured.excerpt}</p>
              <span className="text-link self-start group-hover:text-rust">Read the guide</span>
            </div>
          </Link>
        </section>
      )}

      <section aria-label="All posts" className="gutter pb-20 lg:pb-[140px]">
        {rest.length > 0 ? (
          <ul className="grid gap-x-6 gap-y-14 border-t border-rule pt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16 lg:pt-16">
            {rest.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          !showFeatured && <p className="body-copy border-t border-rule pt-12">No posts in this category yet.</p>
        )}
      </section>
    </>
  );
}
