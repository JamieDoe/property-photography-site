import { media } from "./media";
import type { ClientGallery, GalleryImage, Photo } from "./types";

/*
 * Private client galleries.
 *
 * MOCK DATA for V1. Galleries are unlisted: reachable only by their link,
 * excluded from the sitemap and marked noindex. When storage and
 * authentication are added, replace this module with a data source that
 * returns the same `ClientGallery` shape (e.g. `getGallery(slug)` backed by a
 * database and object storage) and the gallery UI will not need to change.
 */

function sequence(prefix: string, items: [Photo, string][]): GalleryImage[] {
  return items.map(([photo, room], index) => ({
    ...photo,
    room,
    fileName: `${prefix}-${String(index + 1).padStart(2, "0")}.jpg`,
  }));
}

export const galleries: ClientGallery[] = [
  {
    slug: "example-road-locks-heath",
    title: "14 Example Road, Locks Heath",
    preparedFor: "[Client / Agency]",
    deliveredAt: "2026-09-24",
    availableUntil: "2026-12-24",
    access: "unlisted",
    images: sequence("locks-heath", [
      [media.twilightExterior, "Front · twilight"],
      [media.frontElevation, "Front elevation"],
      [media.staircase, "Hallway"],
      [media.livingRoom, "Living room"],
      [media.kitchen, "Kitchen"],
      [media.interiorDetail, "Kitchen detail"],
      [media.livingRoom, "Dining"],
      [media.bedroom, "Principal bedroom"],
      [media.bathroom, "Ensuite"],
      [media.bedroom, "Bedroom two"],
      [media.bathroom, "Family bathroom"],
      [media.garden, "Rear garden"],
    ]),
  },
];

export function getGallery(slug: string): ClientGallery | undefined {
  return galleries.find((gallery) => gallery.slug === slug);
}
