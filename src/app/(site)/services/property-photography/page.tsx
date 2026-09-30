import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { ExtrasTable } from "@/components/pricing/ExtrasTable";
import { PackageCard } from "@/components/pricing/PackageCard";
import { ImageCta } from "@/components/sections/ImageCta";
import { FaqList } from "@/components/services/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { Headline } from "@/components/ui/Headline";
import { ArrowRight, CheckIcon } from "@/components/ui/Icons";
import { media } from "@/content/media";
import { servicesCopy } from "@/content/pages";
import { projects } from "@/content/portfolio";
import { extras, packages } from "@/content/pricing";
import { propertyPhotography as service } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/structured-data";

const path = "/services/property-photography";

export const metadata = pageMetadata({
  title: "Property photography",
  description: service.metaDescription!,
  path,
  image: service.image,
});

export default function PropertyPhotographyPage() {
  const tiered = packages.filter((pkg) => pkg.price !== "quote");
  const bespoke = packages.find((pkg) => pkg.price === "quote");
  const examples = [
    { project: projects[0], photo: projects[0].gallery[0] },
    { project: projects[1], photo: projects[1].gallery.find((p) => p.src === media.bathroom.src) ?? projects[1].cover },
    { project: projects[5], photo: projects[5].gallery.at(-1) ?? projects[5].cover },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ]),
          serviceSchema({ name: service.name, description: service.summary, path }),
          ...(service.faqs ? [faqSchema(service.faqs)] : []),
        ]}
      />

      {/* Hero: copy left, photograph bleeding off the right edge */}
      <section className="grid lg:h-[min(860px,calc(100svh-var(--header-h)))] lg:min-h-[680px] lg:grid-cols-12 lg:gap-x-6 lg:pl-[var(--gutter)]">
        <div className="gutter flex flex-col justify-end gap-5 pb-10 pt-12 lg:col-span-6 lg:gap-7 lg:px-0 lg:pb-[88px] lg:pr-6 xl:col-span-5">
          <p className="eyebrow text-taupe">Services / 01</p>
          <Headline
            as="h1"
            headline={service.headline!}
            className="animate-rise text-[clamp(3.1rem,1.4rem+5.4vw,6.5rem)]"
          />
          <p className="body-copy lg:text-[19px]">{service.intro}</p>
          <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <Link href="/contact" className="btn">
              Enquire about a shoot
            </Link>
            <Link href="/pricing" className="btn btn-outline">
              See packages
            </Link>
          </div>
        </div>
        <div className="relative h-[440px] overflow-hidden lg:col-span-6 lg:h-auto xl:col-span-7">
          <div className="animate-settle absolute inset-0">
            <Photo photo={service.image!} className="h-full w-full" sizes="(min-width: 1024px) 58vw, 100vw" preload />
          </div>
        </div>
      </section>

      {/* What's included */}
      {service.included && (
        <section aria-labelledby="included-heading" className="section-y gutter bg-stone">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
            <div className="flex flex-col gap-5 lg:col-span-4 lg:gap-[26px]">
              <p className="eyebrow text-taupe">What&rsquo;s included</p>
              <Headline id="included-heading" headline={service.included.headline} className="reveal text-subsection" />
              <p className="body-copy">{service.included.intro}</p>
            </div>
            <ul className="grid sm:grid-cols-2 sm:gap-x-10 lg:col-span-7 lg:col-start-6">
              {service.included.items.map((item) => (
                <li key={item.title} className="flex items-start gap-4 border-t border-[#c9c0b0] py-[22px]">
                  <CheckIcon className="mt-[3px] shrink-0 text-rust" />
                  <div>
                    <h3 className="mb-1.5 text-[17px] font-semibold">{item.title}</h3>
                    <p className="text-[15px] leading-[1.55] text-taupe">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Process */}
      {service.process && (
        <section aria-labelledby="process-heading" className="section-y gutter">
          <div className="mb-10 flex flex-col gap-5 lg:mb-[72px] lg:gap-[26px]">
            <p className="eyebrow text-taupe">How it works</p>
            <Headline id="process-heading" headline={service.process.headline} className="reveal text-subsection" />
          </div>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {service.process.steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 border-t border-ink pt-6 lg:gap-4">
                <span aria-hidden="true" className="display text-[44px] text-rust lg:text-[56px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold lg:text-[21px]">{step.title}</h3>
                <p className="body-copy text-[15px] lg:text-[15px]">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Packages */}
      <section aria-labelledby="packages-heading" className="section-y gutter bg-stone">
        <div className="mb-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5 lg:gap-[26px]">
            <p className="eyebrow text-taupe">Packages</p>
            <Headline id="packages-heading" headline={servicesCopy.packagesHeadline} className="reveal text-subsection" />
          </div>
          <Link href="/pricing" className="text-link self-start lg:self-auto">
            Full pricing &amp; comparison <ArrowRight />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {tiered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} detail="summary" />
          ))}
        </div>
        {bespoke && (
          <div className="mt-4 flex flex-col gap-4 border border-rule-strong p-7 sm:flex-row sm:items-center sm:justify-between lg:mt-6 lg:px-9">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl font-semibold">{bespoke.name}</h3>
              <p className="text-[15px] text-taupe">{bespoke.audience}</p>
            </div>
            <Link href="/contact?package=bespoke" className="text-link self-start sm:self-auto">
              Request a quote
            </Link>
          </div>
        )}
      </section>

      {/* Extras */}
      <section aria-labelledby="extras-heading" className="section-y gutter">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col gap-5 lg:col-span-4 lg:gap-[26px]">
            <p className="eyebrow text-taupe">Optional extras</p>
            <Headline id="extras-heading" headline={servicesCopy.extrasHeadline} className="reveal text-subsection" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ExtrasTable extras={extras} />
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section aria-labelledby="examples-heading" className="gutter pb-20 lg:pb-[140px]">
        <div className="mb-8 flex items-end justify-between lg:mb-10">
          <h2 id="examples-heading" className="eyebrow text-taupe">
            Recent property shoots
          </h2>
          <Link href="/portfolio" className="text-link">
            View our work
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-12 lg:items-end lg:gap-6">
          {examples.map(({ project, photo }, index) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              aria-label={`${project.title}, ${project.place}`}
              className={`lift block ${
                index === 0
                  ? "col-span-2 lg:col-span-6"
                  : index === 1
                    ? "lg:col-span-3"
                    : "lg:col-span-3"
              }`}
            >
              <Photo
                photo={photo}
                className={
                  index === 0
                    ? "h-[360px] lg:h-[min(43vw,720px)]"
                    : index === 1
                      ? "h-[240px] lg:h-[min(30.5vw,520px)]"
                      : "h-[240px] lg:h-[min(36vw,600px)]"
                }
                sizes={index === 0 ? "(min-width: 1024px) 48vw, 100vw" : "(min-width: 1024px) 24vw, 50vw"}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {service.faqs && (
        <section aria-labelledby="faq-heading" className="section-y gutter bg-stone">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
            <div className="flex flex-col gap-5 lg:col-span-4 lg:gap-[26px]">
              <p className="eyebrow text-taupe">FAQ</p>
              <Headline id="faq-heading" headline={servicesCopy.faqHeadline} className="reveal text-subsection" />
              <p className="body-copy">
                Anything else?{" "}
                <Link href="/contact" className="prose-link">
                  Send a message
                </Link>
                .
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <FaqList faqs={service.faqs} />
            </div>
          </div>
        </section>
      )}

      <ImageCta photo={media.twilightExterior} headline={servicesCopy.cta.headline} text={servicesCopy.cta.text}>
        <Link href="/contact#dates" className="btn btn-light">
          Check availability
        </Link>
        <Link href="/contact" className="btn btn-light-outline">
          Enquire about a shoot
        </Link>
      </ImageCta>
    </>
  );
}
