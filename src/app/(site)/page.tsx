import Link from "next/link";
import { AreasList } from "@/components/areas/AreasList";
import { HomeHero } from "@/components/home/HomeHero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { WhyWorkWithUs } from "@/components/home/WhyWorkWithUs";
import { ImageCta } from "@/components/sections/ImageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Headline } from "@/components/ui/Headline";
import { homeCopy } from "@/content/pages";
import { getFeaturedProjects, projects } from "@/content/portfolio";
import { site } from "@/content/site";
import { getHomeTestimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";
import { localBusinessSchema, websiteSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: `Property photography for Hampshire | ${site.legalName}`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
  image: projects[0].cover,
});

export default function HomePage() {
  const heroSlides = projects.slice(0, 4).map((project) => ({
    photo: project.cover,
    title: project.title,
    place: project.place.split(",")[0],
    detail: project.cover.caption,
    href: `/portfolio/${project.slug}`,
  }));
  const testimonials = getHomeTestimonials();
  const { selectedWork, services, why, areas, cta } = homeCopy;

  return (
    <>
      <JsonLd data={[localBusinessSchema(), websiteSchema()]} />

      <HomeHero headline={homeCopy.hero.headline} intro={homeCopy.hero.intro} slides={heroSlides} />

      <SelectedWork
        eyebrow={selectedWork.eyebrow}
        headline={selectedWork.headline}
        intro={selectedWork.intro}
        projects={getFeaturedProjects(3)}
      />

      <ServicesOverview eyebrow={services.eyebrow} headline={services.headline} intro={services.intro} />

      <WhyWorkWithUs eyebrow={why.eyebrow} headline={why.headline} image={why.image} points={why.points} />

      <section aria-labelledby="areas-heading" className="section-y gutter">
        <div className="mb-7 grid gap-y-6 lg:mb-16 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="flex flex-col gap-5 lg:col-span-7 lg:gap-7">
            <p className="eyebrow text-taupe">{areas.eyebrow}</p>
            <Headline id="areas-heading" headline={areas.headline} className="reveal text-section" />
          </div>
          <p className="body-copy lg:col-span-4 lg:col-start-9">{areas.intro}</p>
        </div>
        <AreasList />
      </section>

      {testimonials.length > 0 && (
        <TestimonialCarousel eyebrow={homeCopy.testimonials.eyebrow} testimonials={testimonials} />
      )}

      <ImageCta photo={cta.image} eyebrow={cta.eyebrow} headline={cta.headline} text={cta.text} size="lg">
        <Link href="/contact" className="btn btn-light">
          Enquire about a shoot
        </Link>
        <Link href="/contact#dates" className="btn btn-light-outline">
          Check availability
        </Link>
      </ImageCta>
    </>
  );
}
