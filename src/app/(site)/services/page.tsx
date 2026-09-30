import Link from "next/link";
import { DarkCtaBand } from "@/components/sections/DarkCtaBand";
import { PageIntro } from "@/components/sections/PageIntro";
import { ServiceFeature, UpcomingServices } from "@/components/services/ServiceFeature";
import { JsonLd } from "@/components/seo/JsonLd";
import { servicesCopy } from "@/content/pages";
import { media } from "@/content/media";
import { availableServices } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Services",
  description: servicesCopy.metaDescription,
  path: "/services",
  image: media.frontElevation,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />
      <PageIntro
        eyebrow={servicesCopy.eyebrow}
        headline={servicesCopy.headline}
        aside={<p className="body-copy">{servicesCopy.intro}</p>}
      />
      <section aria-label="Available services" className="gutter pb-20 lg:pb-[140px]">
        <div className="flex flex-col gap-16">
          {availableServices.map((service, index) => (
            <ServiceFeature key={service.slug} service={service} index={index + 1} headingLevel="h2" />
          ))}
        </div>
        <UpcomingServices className="mt-14 lg:mt-24" />
      </section>
      <DarkCtaBand headline={servicesCopy.cta.headline} text={servicesCopy.cta.text}>
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
