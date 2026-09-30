import type { Headline as HeadlineContent } from "@/content/types";

type HeadlineProps = {
  headline: HeadlineContent;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  id?: string;
};

/**
 * Display headline: extended grotesk lead with a serif italic accent,
 * e.g. "Property photography *for Hampshire.*"
 */
export function Headline({ headline, as: Tag = "h2", className = "", id }: HeadlineProps) {
  return (
    <Tag id={id} className={`display ${className}`}>
      {headline.lead} <span className="accent">{headline.accent}</span>
    </Tag>
  );
}
