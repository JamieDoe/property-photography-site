import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { locations } from "@/content/locations";
import { projects } from "@/content/portfolio";
import { availableServices } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

/** Public pages only. Client galleries are deliberately excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/portfolio", "/services", "/pricing", "/areas", "/about", "/contact", "/blog"];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...availableServices.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...locations.map((location) => ({
      url: absoluteUrl(`/areas/${location.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/portfolio/${project.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
