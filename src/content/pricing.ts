import type { ComparisonRow, Extra, Package, PackageId, Price } from "./types";

/*
 * Pricing. The single source for every price shown on the site.
 *
 * PLACEHOLDER: no prices have been set yet. `amount: null` renders a visible
 * "[£ ]" placeholder so an unpriced package can never look final. Set whole
 * pound amounts (e.g. `amount: 150`) when pricing is confirmed. Bracketed
 * values such as "[N]" and "[X]" are also placeholders.
 */

export const packages: Package[] = [
  {
    id: "essential",
    name: "Essential",
    price: { amount: null },
    audience: "Flats and smaller homes, up to [2] bedrooms.",
    features: [
      "Up to [N] edited images",
      "Interiors & front exterior",
      "Private online gallery",
      "Delivery in [X] working days",
    ],
    summaryFeatures: ["Up to [N] edited images", "Interiors & front exterior", "Delivery in [X] days"],
    cta: "Enquire",
  },
  {
    id: "standard",
    name: "Standard",
    price: { amount: null },
    audience: "Most family homes, [3–4] bedrooms.",
    features: [
      "Up to [N] edited images",
      "Interiors, exteriors & garden",
      "Private online gallery",
      "Delivery in [X] working days",
    ],
    summaryFeatures: ["Up to [N] edited images", "Interiors, exteriors & garden", "Delivery in [X] days"],
    recommended: true,
    cta: "Enquire",
  },
  {
    id: "premium",
    name: "Premium",
    price: { amount: null },
    audience: "Larger, standout or high-value homes.",
    features: [
      "Up to [N] edited images",
      "Everything in Standard",
      "Twilight exterior included",
      "Priority delivery",
    ],
    summaryFeatures: ["Up to [N] edited images", "Everything in Standard + twilight", "Priority delivery"],
    cta: "Enquire",
  },
  {
    id: "bespoke",
    name: "Bespoke",
    price: "quote",
    audience: "New-build developments, lettings portfolios and regular agency work.",
    features: ["Volume and repeat rates", "Consistent style across listings", "Flexible scheduling"],
    summaryFeatures: [],
    cta: "Request a quote",
  },
];

export const extras: Extra[] = [
  { name: "Twilight exterior", detail: "Shot at dusk", price: { amount: null } },
  { name: "Additional images", detail: "Per [5] images", price: { amount: null, unit: "per [5] images" } },
  { name: "Express delivery", detail: "Next working day", price: { amount: null } },
  { name: "Floor plan", detail: "Coming later", price: "coming-later" },
  { name: "Aerial photography", detail: "Coming later", price: "coming-later" },
];

export const comparison: ComparisonRow[] = [
  { label: "Edited images", values: { essential: "[N]", standard: "[N]", premium: "[N]" } },
  { label: "Interiors", values: { essential: true, standard: true, premium: true } },
  { label: "Front exterior", values: { essential: true, standard: true, premium: true } },
  { label: "Rear exterior & garden", values: { essential: false, standard: true, premium: true } },
  { label: "Twilight exterior", values: { essential: "Add-on", standard: "Add-on", premium: true } },
  { label: "Portal & print sizes", values: { essential: true, standard: true, premium: true } },
  { label: "Private gallery", values: { essential: true, standard: true, premium: true } },
  { label: "Delivery", values: { essential: "[X] days", standard: "[X] days", premium: "Priority" } },
];

export const audienceNotes = {
  homeowners:
    "Selling privately or ahead of listing? Book direct and share the images with your agent.",
  agents:
    "Regular instructions? Ask about agency rates and a consistent house style across your listings.",
} as const;

export const travelNote =
  "Prices include travel within Fareham, Gosport, Portsmouth and Southampton.";

export function formatPrice(price: Price): string {
  return price.amount === null ? "[£ ]" : `£${price.amount.toLocaleString("en-GB")}`;
}

export function getPackage(id: PackageId): Package | undefined {
  return packages.find((pkg) => pkg.id === id);
}

/** Lowest set package price, or null while prices are placeholders. */
export function lowestPrice(): Price {
  const amounts = packages
    .map((pkg) => (pkg.price === "quote" ? null : pkg.price.amount))
    .filter((amount): amount is number => amount !== null);
  return { amount: amounts.length ? Math.min(...amounts) : null };
}
