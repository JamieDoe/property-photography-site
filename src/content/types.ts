import type { StaticImageData } from "next/image";

/**
 * Shared content types.
 *
 * Everything the site displays is described here and populated from the
 * modules in `src/content/`. Pages and components only read this data, so
 * adding a project, location, testimonial or post is a content change, not a
 * code change.
 */

export type Photo = {
  src: StaticImageData;
  /** Describe what is in the frame, not what the photo is for. */
  alt: string;
};

export type CaptionedPhoto = Photo & {
  /** Short room/space label, e.g. "Principal bedroom". */
  caption?: string;
  /** Optional sentence shown beside the image in editorial layouts. */
  note?: string;
};

/** A headline in two halves: the grotesk lead and the serif italic accent. */
export type Headline = {
  lead: string;
  accent: string;
};

export type LocationSlug = "fareham" | "gosport" | "portsmouth" | "southampton";

export type PackageId = "essential" | "standard" | "premium" | "bespoke";

export type ProjectCategory = "houses" | "apartments" | "new-builds" | "twilight";

export type Project = {
  slug: string;
  title: string;
  headline: Headline;
  /** Service area the property sits in; links the project to its location page. */
  area: LocationSlug;
  /** Town, village or neighbourhood shown on cards, e.g. "Locks Heath". */
  place: string;
  propertyType: string;
  categories: ProjectCategory[];
  /** What was photographed, e.g. ["Interiors", "Exteriors", "Twilight"]. */
  shoot: string[];
  package?: PackageId;
  description: string;
  cover: CaptionedPhoto;
  /** Extra images used where a project is featured (homepage compositions). */
  highlights: CaptionedPhoto[];
  gallery: CaptionedPhoto[];
  testimonialId?: string;
  featured?: boolean;
  /** Sample project for development; remove or replace before launch. */
  placeholder?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  town?: string;
  area?: LocationSlug;
  /** Placeholder copy; must be replaced with a real, attributable quote. */
  placeholder?: boolean;
};

export type Neighbourhood = string;

export type LocalNote = {
  title: string;
  text: string;
};

export type Location = {
  slug: LocationSlug;
  name: string;
  headline: Headline;
  intro: string;
  /** Heading for the local-coverage section. */
  coverageHeadline: Headline;
  coverage: string[];
  neighbourhoods: Neighbourhood[];
  postcodes: string[];
  notes: LocalNote[];
  hero: CaptionedPhoto;
  card: Photo;
  /** Short list for the areas index / homepage rows. */
  highlights: string[];
  nearby: LocationSlug[];
  cta: Headline;
  metaDescription: string;
};

export type ServiceStatus = "available" | "coming-later";

export type ServiceStep = { title: string; text: string };

export type IncludedItem = { title: string; text: string };

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  status: ServiceStatus;
  summary: string;
  headline?: Headline;
  intro?: string;
  image?: CaptionedPhoto;
  included?: { headline: Headline; intro: string; items: IncludedItem[] };
  process?: { headline: Headline; steps: ServiceStep[] };
  faqs?: Faq[];
  metaDescription?: string;
};

export type Price = {
  /** Whole pounds. `null` means not yet set: rendered as a visible placeholder. */
  amount: number | null;
  /** Optional qualifier such as "per 5 images". */
  unit?: string;
};

export type Package = {
  id: PackageId;
  name: string;
  price: Price | "quote";
  audience: string;
  features: string[];
  /** Shorter feature list used on the service page. */
  summaryFeatures: string[];
  recommended?: boolean;
  cta: string;
};

export type Extra = {
  name: string;
  detail: string;
  price: Price | "coming-later";
};

export type ComparisonRow = {
  label: string;
  values: Record<Exclude<PackageId, "bespoke">, string | boolean>;
};

export type PostCategory = "preparing" | "agents" | "editing" | "local";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; photo: Photo; caption?: string };

export type Post = {
  slug: string;
  title: string;
  /** Optional split headline for the featured slot and article hero. */
  headline?: Headline;
  excerpt: string;
  category: PostCategory;
  publishedAt: string;
  image: Photo;
  body: PostBlock[];
  featured?: boolean;
};

export type GalleryImage = Photo & {
  room: string;
  /** Download file name, e.g. "locks-heath-01.jpg". */
  fileName: string;
};

export type ClientGallery = {
  slug: string;
  title: string;
  preparedFor: string;
  deliveredAt: string;
  availableUntil: string;
  images: GalleryImage[];
  /**
   * Access model. V1 galleries are unlisted (reachable by link only). A
   * future version can add "password" or "account" and enforce it in a proxy
   * or the page without changing the gallery UI.
   */
  access: "unlisted";
};
