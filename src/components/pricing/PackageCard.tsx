import Link from "next/link";
import { formatPrice } from "@/content/pricing";
import type { Package } from "@/content/types";

type PackageCardProps = {
  pkg: Package;
  /** "full" lists every feature (pricing page); "summary" the short list (service page). */
  detail?: "full" | "summary";
  headingLevel?: "h2" | "h3";
};

/** A package with its price, audience, features and enquiry action. */
export function PackageCard({ pkg, detail = "full", headingLevel = "h3" }: PackageCardProps) {
  const Heading = headingLevel;
  const dark = pkg.recommended;
  const { price } = pkg;
  const quote = price === "quote";
  const features = detail === "full" ? pkg.features : pkg.summaryFeatures;

  return (
    <article
      className={`flex flex-col gap-[18px] border p-7 lg:px-8 lg:py-9 ${
        dark
          ? "surface-dark border-ink bg-ink text-limestone"
          : quote
            ? "border-stone bg-stone"
            : "border-rule bg-limestone"
      }`}
    >
      <div className="flex items-center justify-between">
        <Heading className={`eyebrow ${dark ? "text-sand" : "text-taupe"}`}>{pkg.name}</Heading>
        {pkg.recommended && <span className="eyebrow text-apricot">Recommended</span>}
      </div>
      {price === "quote" ? (
        <p className="display py-2 text-[40px] leading-[1.05] lg:text-[44px]">Let&rsquo;s talk</p>
      ) : (
        <p className="display text-[52px] lg:text-[60px]">
          <span className="sr-only">Price: </span>
          {formatPrice(price)}
        </p>
      )}
      <p className={`min-h-[46px] text-[15px] leading-normal ${dark ? "text-sand" : "text-taupe"}`}>
        {pkg.audience}
      </p>
      {features.length > 0 && (
        <ul>
          {features.map((feature) => (
            <li
              key={feature}
              className={`border-t py-[11px] text-[15px] leading-normal ${dark ? "border-line-dark" : "border-rule-soft"}`}
            >
              {feature}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/contact?package=${pkg.id}`}
        className={`btn mt-auto ${dark ? "btn-light" : quote ? "" : "btn-outline"}`}
      >
        {pkg.cta}
        <span className="sr-only"> — {pkg.name}</span>
      </Link>
    </article>
  );
}
