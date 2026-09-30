"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/lightbox/Lightbox";
import { DownloadIcon } from "@/components/ui/Icons";
import type { GalleryImage } from "@/content/types";

type ClientGalleryViewProps = {
  images: GalleryImage[];
  title: string;
  downloadAllHref: string;
};

/** Image grid with fullscreen viewer and per-image downloads. */
export function ClientGalleryView({ images, title, downloadAllHref }: ClientGalleryViewProps) {
  const [index, setIndex] = useState<number | null>(null);
  const items = images.map((image) => ({
    photo: image,
    caption: image.room,
    fileName: image.fileName,
  }));

  return (
    <>
      <ul className="grid grid-cols-2 gap-1.5 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-7">
        {images.map((image, i) => (
          <li key={image.fileName} className="group relative">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View ${image.room} (${image.fileName}) full screen`}
              className="relative block aspect-square w-full cursor-zoom-in overflow-hidden bg-[#8f8474] lg:aspect-[3/2]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 24vw, 50vw"
                placeholder="blur"
                loading={i < 4 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </button>
            <a
              href={image.src.src}
              download={image.fileName}
              aria-label={`Download ${image.room} (${image.fileName})`}
              className="absolute right-2.5 top-2.5 hidden size-10 items-center justify-center bg-limestone/95 text-ink opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 lg:flex [@media(hover:none)]:opacity-100"
            >
              <DownloadIcon size={16} />
            </a>
            <p className="hidden justify-between pt-2 text-xs text-taupe lg:flex">
              <span>{image.fileName}</span>
              <span>{image.room}</span>
            </p>
          </li>
        ))}
      </ul>

      {/* Mobile: Download all stays within thumb reach. */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-rule bg-limestone px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-3 lg:hidden">
        <a href={downloadAllHref} download className="btn w-full">
          <DownloadIcon />
          Download all ({images.length})
        </a>
      </div>

      <Lightbox items={items} index={index} onChange={setIndex} label={`${title}: image viewer`} allowDownload />
    </>
  );
}
