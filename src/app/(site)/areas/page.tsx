import Link from "next/link";
import { AreasList } from "@/components/areas/AreasList";
import { Photo } from "@/components/media/Photo";
import { DarkCtaBand } from "@/components/sections/DarkCtaBand";
import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Headline } from "@/components/ui/Headline";
import { locations } from "@/content/locations";
import { media } from "@/content/media";
import { areasCopy } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Areas we cover",
  description: areasCopy.metaDescription,
  path: "/areas",
  image: media.frontElevation,
});

export default function AreasPage() {
  const postcodes = locations.flatMap((location) => location.postcodes);

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Areas", path: "/areas" }]), localBusinessSchema()]} />
      <PageIntro
        eyebrow={areasCopy.eyebrow}
        headline={areasCopy.headline}
        aside={<p className="body-copy">{areasCopy.intro}</p>}
      />

      <section aria-label="Towns" className="gutter pb-20 lg:pb-[140px]">
        <AreasList headingLevel="h2" />
      </section>

      <section aria-labelledby="range-heading" className="section-y gutter bg-stone">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-6">
          <Photo
            photo={media.garden}
            className="h-[320px] lg:col-span-5 lg:h-[min(38.9vw,620px)]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:gap-7">
            <Headline id="range-heading" headline={areasCopy.rangeHeadline} className="reveal text-subsection" />
            <p className="body-copy">{areasCopy.range}</p>
            <div className="flex flex-col gap-3">
              <h3 className="eyebrow text-taupe">Postcodes covered</h3>
              <ul className="flex flex-wrap gap-2">
                {postcodes.map((postcode) => (
                  <li key={postcode} className="inline-flex h-10 items-center border border-rule-strong px-4 text-[15px]">
                    {postcode}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <DarkCtaBand headline={areasCopy.cta.headline}>
        <Link href="/contact" className="btn btn-light">
          Enquire about a shoot
        </Link>
        <Link href="/pricing" className="btn btn-light-outline">
          See pricing
        </Link>
      </DarkCtaBand>
    </>
  );
}
