/*
 * Business details used across the site, metadata and structured data.
 *
 * Values marked PLACEHOLDER must be confirmed before launch.
 */

export const site = {
  /** Brand name from the design ("SOLENT" wordmark). PLACEHOLDER: confirm trading name. */
  name: "Solent",
  legalName: "Solent Property Photography",
  descriptor: "Property Photography",
  photographer: "Jamie Doe",
  tagline: "Property photography for Hampshire, by photographer Jamie Doe.",
  description:
    "Interior, exterior and twilight property photography for estate agents and homeowners across Fareham, Gosport, Portsmouth and Southampton.",
  /** Set NEXT_PUBLIC_SITE_URL in production. PLACEHOLDER fallback. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
  locale: "en_GB",
  contact: {
    /** PLACEHOLDER: replace with the real business address. */
    email: "hello@example.com",
    /** Optional. Leave null to hide. */
    phone: null as string | null,
    /** Optional WhatsApp number in international format, e.g. "447700900000". */
    whatsapp: null as string | null,
    /** PLACEHOLDER: typical reply time shown on the contact page. */
    replyTime: "[X] hours",
  },
  region: "Hampshire",
  /** Rough base used for local business structured data. */
  baseTown: "Fareham",
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Areas", href: "/areas" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const exploreNav: NavItem[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
];

export const enquireCta = { label: "Enquire", href: "/contact" } as const;
