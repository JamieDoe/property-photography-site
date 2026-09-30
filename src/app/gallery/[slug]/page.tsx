import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientGalleryView } from "@/components/gallery/ClientGalleryView";
import { Wordmark } from "@/components/layout/Wordmark";
import { DownloadIcon } from "@/components/ui/Icons";
import { galleries, getGallery } from "@/content/galleries";
import { site } from "@/content/site";

/*
 * Private client gallery. V1 galleries are unlisted: never linked from the
 * site, excluded from the sitemap and robots, and marked noindex. Add access
 * control (password, magic link or accounts) here or in a proxy later
 * without changing the gallery UI.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return galleries.map((gallery) => ({ slug: gallery.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const gallery = getGallery(slug);
  return {
    title: gallery ? `${gallery.title} · Private gallery` : "Private gallery",
    robots: { index: false, follow: false, nocache: true },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });
}

export default async function GalleryPage({ params }: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  const gallery = getGallery(slug);
  if (!gallery) notFound();

  const downloadAllHref = `/gallery/${gallery.slug}/download`;
  const count = gallery.images.length;

  return (
    <div className="min-h-dvh pb-32 lg:pb-24">
      <header className="gutter flex h-[60px] items-center justify-between border-b border-rule lg:h-[88px]">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label={`${site.legalName}, home`}>
            <Wordmark descriptor={false} />
          </Link>
          <span aria-hidden="true" className="hidden h-[22px] w-px bg-rule lg:block" />
          <span className="eyebrow hidden text-taupe lg:inline">Private gallery</span>
        </div>
        <span className="eyebrow text-taupe lg:hidden">Private gallery</span>
        <p className="hidden text-sm text-taupe lg:block">
          Questions?{" "}
          <a href={`mailto:${site.contact.email}`} className="prose-link text-ink">
            {site.contact.email}
          </a>
        </p>
      </header>

      <main id="main">
        <section className="gutter flex flex-col gap-6 pb-5 pt-7 lg:flex-row lg:items-end lg:justify-between lg:pb-10 lg:pt-16">
          <div className="flex flex-col gap-2.5 lg:gap-4">
            <span className="eyebrow hidden text-taupe lg:block">Prepared for {gallery.preparedFor}</span>
            <h1 className="display text-[30px] lg:text-[64px]">{gallery.title}</h1>
            <p className="text-[13px] text-taupe lg:text-[15px]">
              {count} images · Delivered {formatDate(gallery.deliveredAt)}
              <span className="hidden lg:inline"> · Available until {formatDate(gallery.availableUntil)}</span>
            </p>
          </div>
          <div className="hidden flex-col items-end gap-2.5 lg:flex">
            <a href={downloadAllHref} download className="btn">
              <DownloadIcon />
              Download all
            </a>
            <span className="text-xs text-taupe">ZIP · full-resolution originals</span>
          </div>
        </section>

        <section aria-label="Images" className="gutter">
          <ClientGalleryView images={gallery.images} title={gallery.title} downloadAllHref={downloadAllHref} />
        </section>

        <p className="gutter mt-10 text-[13px] text-taupe">
          Select any image to view it full screen. Images are licensed for marketing this property.
        </p>
      </main>
    </div>
  );
}
