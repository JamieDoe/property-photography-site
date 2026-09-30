import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { DarkCtaBand } from "@/components/sections/DarkCtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Headline } from "@/components/ui/Headline";
import { aboutCopy } from "@/content/pages";
import { projects } from "@/content/portfolio";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: `About ${site.photographer}`,
  description: aboutCopy.metaDescription,
  path: "/about",
  image: aboutCopy.approach.image,
});

export default function AboutPage() {
  const { approach, values } = aboutCopy;
  const strip = [
    { project: projects[0], photo: projects[0].gallery[0] },
    { project: projects[1], photo: projects[1].gallery[4] ?? projects[1].cover },
    { project: projects[2], photo: projects[2].cover },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "About", path: "/about" }]),
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.photographer,
            jobTitle: "Property photographer",
            worksFor: { "@type": "Organization", name: site.legalName },
          },
        ]}
      />

      <section className="gutter grid gap-y-10 pb-20 pt-12 lg:grid-cols-12 lg:items-end lg:gap-x-6 lg:pb-[140px] lg:pt-[110px]">
        <div className="flex flex-col gap-5 lg:col-span-8 lg:gap-8 lg:pb-3">
          <p className="eyebrow text-taupe">{aboutCopy.eyebrow}</p>
          <Headline as="h1" headline={aboutCopy.headline} className="animate-rise text-title" />
          <p className="body-copy max-w-[520px] lg:text-[19px]">{aboutCopy.intro}</p>
        </div>
        <figure className="flex flex-col gap-3.5 lg:col-span-4 lg:col-start-9">
          {/* PLACEHOLDER: replace with a portrait of Jamie on location. */}
          <PlaceholderFrame label={aboutCopy.portraitLabel} className="aspect-[4/5]" />
          <figcaption className="text-sm text-taupe">
            {site.photographer}, photographer
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="approach-heading" className="section-y gutter bg-stone">
        <div className="grid gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-6">
          <Photo
            photo={approach.image}
            className="h-[360px] lg:col-span-5 lg:h-[min(38.9vw,640px)]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:gap-7">
            <p className="eyebrow text-taupe">{approach.eyebrow}</p>
            <Headline id="approach-heading" headline={approach.headline} className="reveal text-subsection" />
            {approach.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="body-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="section-y gutter">
        <Headline id="values-heading" headline={values.headline} className="reveal text-subsection mb-10 max-w-[760px] lg:mb-16" />
        <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
          {values.items.map((item, index) => (
            <li key={item.title} className="flex flex-col gap-3.5 border-t border-ink pt-6">
              <span className="eyebrow text-rust">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-semibold lg:text-[22px]">{item.title}</h3>
              <p className="body-copy lg:text-base">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Recent work" className="gutter grid grid-cols-2 gap-2 pb-20 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pb-[140px]">
        {strip.map(({ project, photo }, index) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            aria-label={`${project.title}, ${project.place}`}
            className={`lift block ${
              index === 0 ? "col-span-2 lg:col-span-5" : index === 1 ? "lg:col-span-3" : "lg:col-span-4"
            }`}
          >
            <Photo
              photo={photo}
              className={
                index === 0
                  ? "h-[340px] lg:h-[min(36.1vw,620px)]"
                  : index === 1
                    ? "h-[220px] lg:h-[min(26.4vw,440px)]"
                    : "h-[220px] lg:h-[min(31.9vw,540px)]"
              }
              sizes={index === 0 ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 30vw, 50vw"}
            />
          </Link>
        ))}
      </section>

      <DarkCtaBand headline={aboutCopy.cta.headline}>
        <Link href="/contact" className="btn btn-light">
          Enquire about a shoot
        </Link>
      </DarkCtaBand>
    </>
  );
}
