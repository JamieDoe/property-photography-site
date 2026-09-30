import Link from "next/link";
import { AudienceToggle } from "@/components/pricing/AudienceToggle";
import { PackageCard } from "@/components/pricing/PackageCard";
import { ImageCta } from "@/components/sections/ImageCta";
import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Headline } from "@/components/ui/Headline";
import { pricingCopy } from "@/content/pages";
import { audienceNotes, comparison, extras, formatPrice, packages, travelNote } from "@/content/pricing";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Pricing",
  description: pricingCopy.metaDescription,
  path: "/pricing",
  image: pricingCopy.cta.image,
});

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <>
        <span aria-hidden="true">✓</span>
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="font-normal text-taupe">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className={value === "Add-on" ? "font-normal text-taupe" : ""}>{value}</span>;
}

export default function PricingPage() {
  const tiers = packages.filter((pkg) => pkg.id !== "bespoke");
  const extrasSummary = extras
    .flatMap(({ name, price }) =>
      price === "coming-later"
        ? []
        : [`${name.toLowerCase()} ${formatPrice(price)}${price.unit ? ` ${price.unit}` : ""}`],
    )
    .join(", ");

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Pricing", path: "/pricing" }])} />
      <PageIntro
        eyebrow={pricingCopy.eyebrow}
        headline={pricingCopy.headline}
        aside={<AudienceToggle notes={audienceNotes} />}
      />

      <section aria-label="Packages" className="gutter pb-20 lg:pb-[120px]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} headingLevel="h2" />
          ))}
        </div>
      </section>

      <section aria-labelledby="compare-heading" className="gutter pb-20 lg:pb-[140px]">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col gap-5 lg:col-span-3 lg:gap-[22px]">
            <p className="eyebrow text-taupe">Compare</p>
            <Headline id="compare-heading" headline={pricingCopy.compareHeadline} className="reveal text-[40px] lg:text-[48px]" />
          </div>
          <div className="min-w-0 lg:col-span-9">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Package comparison</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[34%] lg:w-[34%]">
                    <span className="sr-only">Feature</span>
                  </th>
                  {tiers.map((pkg) => (
                    <th key={pkg.id} scope="col" className="eyebrow h-14 pr-2 text-[10px] tracking-[0.08em] sm:text-[11px] sm:tracking-[0.14em] lg:h-16 lg:pr-4 lg:text-xs">
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-t border-rule last:border-b">
                    <th scope="row" className="h-14 pr-2 text-sm font-medium text-body lg:h-16 lg:pr-4 lg:text-base">
                      {row.label}
                    </th>
                    {tiers.map((pkg) => (
                      <td key={pkg.id} className="h-14 pr-2 text-sm font-semibold lg:h-16 lg:pr-4 lg:text-base">
                        <Cell value={row.values[pkg.id as keyof typeof row.values]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-10 text-[15px] leading-relaxed text-taupe lg:ml-[calc(25%+6px)] lg:mt-14">
          Extras: {extrasSummary}. {travelNote}{" "}
          <Link href="/services/property-photography" className="prose-link text-ink">
            See what&rsquo;s included
          </Link>
          .
        </p>
      </section>

      <ImageCta photo={pricingCopy.cta.image} headline={pricingCopy.cta.headline} text={pricingCopy.cta.text} scrim="flat">
        <Link href="/contact" className="btn btn-light">
          Enquire about a shoot
        </Link>
      </ImageCta>
    </>
  );
}
