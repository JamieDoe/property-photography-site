import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Photo } from "@/content/types";

type PageMetaInput = {
  title: string;
  description: string;
  /** Canonical path, e.g. "/portfolio". */
  path: string;
  image?: Photo;
  /** Use the title as-is instead of applying the site title template. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
};

/** Consistent page metadata: canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle,
  noindex,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const images = image
    ? [{ url: image.src.src, width: image.src.width, height: image.src.height, alt: image.alt }]
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.legalName,
      locale: site.locale,
      type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: images?.map((i) => i.url) },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
