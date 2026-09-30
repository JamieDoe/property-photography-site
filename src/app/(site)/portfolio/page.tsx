import Link from "next/link";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { DarkCtaBand } from "@/components/sections/DarkCtaBand";
import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { portfolioCopy } from "@/content/pages";
import { projectCategories, projects } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Portfolio",
  description: portfolioCopy.metaDescription,
  path: "/portfolio",
  image: projects[0].cover,
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Portfolio", path: "/portfolio" }])} />
      <PageIntro
        eyebrow={portfolioCopy.eyebrow}
        headline={portfolioCopy.headline}
        aside={<p className="body-copy">{portfolioCopy.intro}</p>}
      />
      <PortfolioGrid projects={projects} categories={projectCategories} />
      <DarkCtaBand headline={portfolioCopy.cta.headline} text={portfolioCopy.cta.text}>
        <Link href="/contact" className="btn btn-light">
          Enquire about a shoot
        </Link>
      </DarkCtaBand>
    </>
  );
}
