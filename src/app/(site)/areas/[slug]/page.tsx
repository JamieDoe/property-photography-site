import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/media/Photo";
import { ImageCta } from "@/components/sections/ImageCta";
import { PageIntro } from "@/components/sections/PageIntro";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Headline } from "@/components/ui/Headline";
import { ArrowRight } from "@/components/ui/Icons";
import { getLocation, locationHref, locations } from "@/content/locations";
import { getProjectsByArea, projects } from "@/content/portfolio";
import { getAreaTestimonial } from "@/content/testimonials";
import type { Location } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return pageMetadata({
    title: `Property photography in ${location.name}`,
    description: location.metaDescription,
    path: locationHref(location.slug),
    image: location.hero,
  });
}

export default async function LocationPage({ params }: PageProps<"/areas/[slug]">) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const local = getProjectsByArea(location.slug);
  const work = (local.length >= 2 ? local : [...local, ...projects.filter((p) => p.area !== location.slug)]).slice(0, 2);
  const testimonial = getAreaTestimonial(location.slug);
  const nearby = location.nearby.map(getLocation).filter((l): l is Location => Boolean(l));
  const path = locationHref(location.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Areas", path: "/areas" },
            { name: location.name, path },
          ]),
          serviceSchema({
            name: `Property photography in ${location.name}`,
            description: location.metaDescription,
            path,
            area: location,
          }),
        ]}
      />

      <PageIntro
        eyebrow={`Areas / ${location.name}`}
        headline={location.headline}
        aside={
          <>
            <p className="body-copy">{location.intro}</p>
            <Link href="/contact#dates" className="btn">
              Check availability in {location.name}
            </Link>
          </>
        }
      />

      <div className="relative h-[420px] overflow-hidden lg:h-[min(48.6vw,820px)]">
        <div className="animate-settle absolute inset-0">
          <Photo photo={location.hero} className="h-full w-full" sizes="100vw" preload />
        </div>
      </div>

      <section aria-labelledby="coverage-heading" className="section-y gutter">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-6">
          <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-[26px]">
            <p className="eyebrow text-taupe">Covering {location.name}</p>
            <Headline id="coverage-heading" headline={location.coverageHeadline} className="reveal text-subsection" />
          </div>
          <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
            {location.coverage.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="body-copy">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-col gap-3">
              <h3 className="eyebrow text-taupe">Neighbourhoods</h3>
              <ul className="flex flex-wrap gap-2">
                {location.neighbourhoods.map((place) => (
                  <li key={place} className="inline-flex h-10 items-center border border-rule-strong px-4 text-[15px]">
                    {place}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-taupe">Postcodes: {location.postcodes.join(", ")}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="notes-heading" className="gutter pb-20 lg:pb-[140px]">
        <h2 id="notes-heading" className="eyebrow mb-8 text-taupe lg:mb-10">
          Photographing homes in {location.name}
        </h2>
        <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
          {location.notes.map((note, index) => (
            <li key={note.title} className="flex flex-col gap-3.5 border-t border-ink pt-6">
              <span className="eyebrow text-rust">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-semibold lg:text-[22px]">{note.title}</h3>
              <p className="body-copy lg:text-base">{note.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="work-heading" className="gutter pb-20 lg:pb-[140px]">
        <div className="mb-8 flex items-end justify-between lg:mb-10">
          <h2 id="work-heading" className="eyebrow text-taupe">
            {local.length > 0 ? `Recent work in ${location.name}` : "Recent work nearby"}
          </h2>
          <Link href="/portfolio" className="text-link">
            View our work
          </Link>
        </div>
        <div className="grid gap-y-12 lg:grid-cols-12 lg:items-start lg:gap-x-6">
          {work.map((project, index) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className={`lift flex flex-col gap-4 lg:gap-[18px] ${
                index === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:mt-[8.3vw]"
              }`}
            >
              <Photo
                photo={project.highlights[0] ?? project.cover}
                className={index === 0 ? "h-[400px] lg:h-[min(41.7vw,700px)]" : "h-[340px] lg:h-[min(33.3vw,560px)]"}
                sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
              />
              <span className="flex items-baseline justify-between gap-4">
                <span className="card-title text-xl lg:text-[22px]">{project.title}</span>
                <span className="text-sm text-taupe lg:text-[15px]">{project.place.split(",")[0]}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {testimonial && <QuoteBlock testimonial={testimonial} eyebrow={`From ${location.name}`} />}

      <section aria-labelledby="nearby-heading" className="section-y gutter">
        <h2 id="nearby-heading" className="eyebrow mb-8 text-taupe lg:mb-10">
          Nearby areas
        </h2>
        <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
          {nearby.map((area) => (
            <li key={area.slug}>
              <Link href={locationHref(area.slug)} className="lift group flex flex-col gap-4 lg:gap-[18px]">
                <Photo
                  photo={area.card}
                  alt=""
                  className="h-[260px] lg:h-[min(26.4vw,440px)]"
                  sizes="(min-width: 768px) 32vw, 100vw"
                />
                <span className="flex items-center justify-between">
                  <span className="display text-[34px] lg:text-[40px]">{area.name}</span>
                  <ArrowRight size={24} strokeWidth={1.3} className="transition-colors group-hover:text-rust" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ImageCta photo={projects[0].cover} headline={location.cta}>
        <Link href="/contact" className="btn btn-light">
          Enquire about a shoot
        </Link>
        <Link href="/pricing" className="btn btn-light-outline">
          See pricing
        </Link>
      </ImageCta>
    </>
  );
}
