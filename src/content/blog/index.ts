import type { Post, PostBlock, PostCategory } from "../types";
import { posts } from "./posts";

export { posts };

export const postCategories: { id: PostCategory; label: string }[] = [
  { id: "preparing", label: "Preparing your home" },
  { id: "agents", label: "For agents" },
  { id: "editing", label: "Behind the edit" },
  { id: "local", label: "Local" },
];

export function categoryLabel(category: PostCategory): string {
  return postCategories.find((item) => item.id === category)?.label ?? category;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): Post {
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const post = getPost(slug);
  const others = posts.filter((item) => item.slug !== slug);
  const sameCategory = others.filter((item) => item.category === post?.category);
  const rest = others.filter((item) => item.category !== post?.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

function blockText(block: PostBlock): string {
  switch (block.type) {
    case "ul":
    case "ol":
      return block.items.join(" ");
    case "image":
      return block.caption ?? "";
    default:
      return block.text;
  }
}

/** Whole minutes at ~220 words per minute, minimum 1. */
export function readingTime(post: Post): number {
  const words = post.body.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });
}

/** Listing data for cards: everything but the body. */
export function toPostSummary(post: Post) {
  const { slug, title, headline, excerpt, category, image } = post;
  return { slug, title, headline, excerpt, category, image, meta: `${categoryLabel(category)} · ${readingTime(post)} min` };
}
