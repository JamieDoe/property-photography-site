import type { NextRequest } from "next/server";
import { getGallery } from "@/content/galleries";
import { createZip } from "@/lib/zip";

/**
 * "Download all": streams a ZIP of every image in a gallery.
 *
 * V1 reads the (mock) gallery images from this deployment's own static
 * assets. When galleries move to object storage, fetch the originals from
 * storage here (or redirect to a pre-built archive) and enforce access
 * before building the archive.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/gallery/[slug]/download">) {
  const { slug } = await ctx.params;
  const gallery = getGallery(slug);
  if (!gallery) return new Response("Gallery not found", { status: 404 });

  const origin = request.nextUrl.origin;
  const files = await Promise.all(
    gallery.images.map(async (image) => {
      const response = await fetch(new URL(image.src.src, origin));
      if (!response.ok) throw new Error(`Could not read ${image.fileName}`);
      return { name: image.fileName, data: new Uint8Array(await response.arrayBuffer()) };
    }),
  ).catch(() => null);

  if (!files) return new Response("Images are temporarily unavailable. Please try again.", { status: 502 });

  return new Response(createZip(files), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${gallery.slug}.zip"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
