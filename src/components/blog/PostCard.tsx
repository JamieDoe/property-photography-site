import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import type { Post } from "@/content/types";

export type PostSummary = Pick<Post, "slug" | "title" | "headline" | "excerpt" | "category" | "image"> & {
  /** e.g. "For agents · 4 min" */
  meta: string;
};

export function PostCard({ post, headingLevel = "h3" }: { post: PostSummary; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/blog/${post.slug}`} className="lift group flex flex-col gap-4">
      <Photo
        photo={post.image}
        alt=""
        className="aspect-[3/2]"
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
      />
      <span className="eyebrow text-taupe">{post.meta}</span>
      <Heading className="card-title text-[22px] leading-[1.15] [text-wrap:balance] group-hover:text-rust lg:text-2xl">
        {post.title}
      </Heading>
    </Link>
  );
}
