import Link from "next/link";
import { JournalIndex } from "@/components/blog/JournalIndex";
import { DarkCtaBand } from "@/components/sections/DarkCtaBand";
import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFeaturedPost, postCategories, posts, toPostSummary } from "@/content/blog";
import { journalCopy } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Journal: property photography advice",
  description: journalCopy.metaDescription,
  path: "/blog",
  image: getFeaturedPost().image,
});

export default function JournalPage() {
  const usedCategories = postCategories.filter((category) => posts.some((post) => post.category === category.id));

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Journal", path: "/blog" }])} />
      <PageIntro
        eyebrow={journalCopy.eyebrow}
        headline={journalCopy.headline}
        aside={<p className="body-copy">{journalCopy.intro}</p>}
      />
      <JournalIndex
        posts={posts.map(toPostSummary)}
        featured={toPostSummary(getFeaturedPost())}
        categories={usedCategories}
      />
      <DarkCtaBand headline={journalCopy.cta.headline}>
        <Link href="/contact" className="btn btn-light">
          Enquire about a shoot
        </Link>
      </DarkCtaBand>
    </>
  );
}
