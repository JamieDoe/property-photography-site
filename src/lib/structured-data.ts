import { locations } from "@/content/locations";
import { site } from "@/content/site";
import type { Faq, Location, Post } from "@/content/types";
import { absoluteUrl } from "./seo";
import { categoryLabel } from "@/content/blog";

/*
 * schema.org builders. Rendered with <JsonLd />.
 * Only facts held in the content layer are published; nothing is inferred.
 */

const businessId = absoluteUrl("/#business");

function areaServed(subset: Location[] = locations) {
  return subset.map((location) => ({
    "@type": "City",
    name: location.name,
    containedInPlace: { "@type": "AdministrativeArea", name: site.region },
  }));
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: site.legalName,
    description: site.description,
    url: absoluteUrl("/"),
    email: site.contact.email,
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    founder: { "@type": "Person", name: site.photographer, jobTitle: "Property photographer" },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.baseTown,
      addressRegion: site.region,
      addressCountry: "GB",
    },
    areaServed: areaServed(),
    knowsAbout: ["Property photography", "Interior photography", "Architectural photography"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.legalName,
    url: absoluteUrl("/"),
    publisher: { "@id": businessId },
    inLanguage: "en-GB",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  area,
}: {
  name: string;
  description: string;
  path: string;
  area?: Location;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Property photography",
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": businessId },
    areaServed: areaServed(area ? [area] : undefined),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    articleSection: categoryLabel(post.category),
    image: absoluteUrl(post.image.src.src),
    url: absoluteUrl(`/blog/${post.slug}`),
    author: { "@type": "Person", name: site.photographer },
    publisher: { "@id": businessId },
    inLanguage: "en-GB",
  };
}
