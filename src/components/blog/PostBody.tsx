import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import type { PostBlock } from "@/content/types";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Renders inline Markdown-style links: [label](/path). Internal links use next/link. */
function Inline({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      href.startsWith("/") ? (
        <Link key={start} href={href} className="prose-link text-ink">
          {label}
        </Link>
      ) : (
        <a key={start} href={href} className="prose-link text-ink" rel="noopener">
          {label}
        </a>
      ),
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Article body with editorial typography. */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-6 text-[17px] leading-[1.7] text-body lg:text-lg">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p key={index} className="[text-wrap:pretty]">
                <Inline text={block.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={index} className="display mt-6 text-[30px] leading-[1.05] text-ink lg:text-[36px]">
                {block.text}
              </h2>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List
                key={index}
                className={`flex flex-col gap-2.5 pl-6 marker:text-rust ${block.type === "ul" ? "list-disc" : "list-decimal marker:font-semibold"}`}
              >
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <blockquote
                key={index}
                className="accent my-4 border-l border-ink pl-6 text-[30px] leading-[1.15] text-ink lg:text-[38px]"
              >
                {block.text}
              </blockquote>
            );
          case "image":
            return (
              <figure key={index} className="my-4 flex flex-col gap-3">
                <Photo photo={block.photo} className="aspect-[3/2]" sizes="(min-width: 1024px) 50vw, 100vw" />
                {block.caption && <figcaption className="text-sm text-taupe">{block.caption}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}
