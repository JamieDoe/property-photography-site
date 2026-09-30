import Link from "next/link";
import { notFound } from "next/navigation";
import { LightboxButton, LightboxProvider } from "@/components/lightbox/LightboxProvider";
import { Photo } from "@/components/media/Photo";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { DarkCtaBand } from "@/components/sections/DarkCtaBand";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Headline } from "@/components/ui/Headline";
import { ArrowLeft, ArrowRight, ExpandIcon } from "@/components/ui/Icons";
import { getLocation } from "@/content/locations";
import { portfolioCopy } from "@/content/pages";
import { getNextProject, getProject, projectNumber, projects } from "@/content/portfolio";
import { getPackage } from "@/content/pricing";
import { getTestimonial } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const location = getLocation(project.area);
  return pageMetadata({
    title: `${project.title}, ${project.place.split(",")[0]} | Portfolio`,
    description: `${project.propertyType} in ${project.place}${
      location && !project.place.includes(location.name) ? `, ${location.name}` : ""
    }: ${project.shoot.join(", ").toLowerCase()} photography. ${project.description.split(". ")[0]}.`,
    path: `/portfolio/${project.slug}`,
    image: project.cover,
  });
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const location = getLocation(project.area);
  const next = getNextProject(project.slug);
  const testimonial = project.testimonialId ? getTestimonial(project.testimonialId) : undefined;
  const pkg = project.package ? getPackage(project.package) : undefined;
  const count = project.gallery.length;
  const lightboxItems = project.gallery.map((photo) => ({ photo, caption: photo.caption }));

  const details = [
    { term: "Location", value: location ? `${project.place.split(",")[0]}, ${location.name}` : project.place },
    { term: "Property", value: project.propertyType },
    { term: "Shoot", value: project.shoot.join(" · ") },
    ...(pkg ? [{ term: "Package", value: pkg.name }] : []),
  ];

  return (
    <LightboxProvider items={lightboxItems} label={`${project.title}: image viewer`}>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />

      <section
        aria-label="Cover image"
        className="surface-dark relative isolate flex h-[560px] items-end overflow-hidden text-limestone lg:h-[min(100svh,880px)] lg:min-h-[640px]"
      >
        <div className="animate-settle absolute inset-0 -z-20">
          <Photo photo={project.cover} className="h-full w-full" sizes="100vw" preload />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,10,.5)_0,rgba(8,8,10,0)_22%,rgba(8,8,10,0)_65%,rgba(8,8,10,.55)_100%)]"
        />
        <div className="gutter flex w-full items-center justify-between pb-[18px] lg:items-end lg:pb-10">
          <Link href="/portfolio" className="flex min-h-11 items-center gap-2.5 text-sm hover:opacity-70">
            <ArrowLeft />
            All projects
          </Link>
          <LightboxButton className="btn btn-light-outline btn-sm gap-2.5 px-4 lg:px-[22px]">
            <ExpandIcon size={16} />
            <span>
              <span className="lg:hidden">{count} images</span>
              <span className="hidden lg:inline">View all {count} images</span>
            </span>
          </LightboxButton>
        </div>
      </section>

      <section className="gutter pb-10 pt-11 lg:pb-[120px] lg:pt-[110px]">
        <div className="grid gap-y-5 lg:grid-cols-12 lg:items-end lg:gap-x-6">
          <div className="flex flex-col gap-5 lg:col-span-8 lg:gap-[26px]">
            <p className="eyebrow text-taupe">
              Project {projectNumber(project.slug)} · {project.place.split(",")[0]}
            </p>
            <Headline as="h1" headline={project.headline} className="animate-rise text-title" />
          </div>
          <p className="body-copy lg:col-span-4 lg:col-start-9">{project.description}</p>
        </div>
        <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-rule pt-[22px] lg:mt-20 lg:grid-cols-4 lg:gap-x-6 lg:pt-7">
          {details.map((detail) => (
            <div key={detail.term} className="flex flex-col gap-1.5 lg:gap-2">
              <dt className="eyebrow text-taupe">{detail.term}</dt>
              <dd className="text-[15px] lg:text-[17px]">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Project photographs" className="pb-10 lg:pb-0">
        <ProjectGallery photos={project.gallery} />
      </section>

      {testimonial && (
        <div className="mt-10 lg:mt-[120px]">
          <QuoteBlock testimonial={testimonial} eyebrow="From the client" />
        </div>
      )}

      <section aria-label="Next project" className="gutter py-10 lg:py-[110px]">
        <Link
          href={`/portfolio/${next.slug}`}
          className="lift group flex items-center gap-4 border-y border-rule py-6 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:py-10"
        >
          <Photo
            photo={next.cover}
            alt=""
            className="size-[88px] shrink-0 lg:order-3 lg:col-span-3 lg:h-[180px] lg:w-auto"
            sizes="(min-width: 1024px) 24vw, 88px"
          />
          <span className="eyebrow hidden text-taupe lg:order-1 lg:col-span-2 lg:block">Next project</span>
          <span className="flex grow flex-col gap-1.5 lg:order-2 lg:col-span-6">
            <span className="eyebrow text-taupe lg:hidden">Next project</span>
            <span className="text-lg font-semibold lg:hidden">
              {next.title}, {next.place.split(",")[0]}
            </span>
            <span className="display hidden text-[64px] lg:block">
              {next.title.split(",")[0]}, <span className="accent">{next.place.split(",")[0]}</span>
            </span>
          </span>
          <span className="transition-colors group-hover:text-rust lg:order-4 lg:col-span-1 lg:justify-self-end">
            <ArrowRight size={20} strokeWidth={1.3} className="lg:size-7" />
          </span>
        </Link>
      </section>

      <DarkCtaBand headline={portfolioCopy.projectCta.headline}>
        <Link href="/contact" className="btn btn-light">
          Enquire about a shoot
        </Link>
        <Link href="/pricing" className="btn btn-light-outline">
          See pricing
        </Link>
      </DarkCtaBand>
    </LightboxProvider>
  );
}
