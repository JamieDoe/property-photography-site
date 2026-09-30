"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, CloseIcon, DownloadIcon } from "@/components/ui/Icons";
import type { Photo } from "@/content/types";

export type LightboxItem = {
  photo: Photo;
  caption?: string;
  /** When set (and downloads are allowed) a download action is shown. */
  fileName?: string;
};

type LightboxProps = {
  items: LightboxItem[];
  /** Open image index, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
  label: string;
  allowDownload?: boolean;
};

const SWIPE_THRESHOLD = 50;

/**
 * Fullscreen image viewer built on the native <dialog>: focus is trapped and
 * restored by the browser, Escape closes it, arrow keys and swipes browse.
 */
export function Lightbox({ items, index, onChange, label, allowDownload = false }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerStart = useRef<number | null>(null);
  const isOpen = index !== null;
  const count = items.length;
  const current = index !== null ? items[index] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Keep the page behind the viewer from scrolling.
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const go = (delta: number) => {
    if (index === null) return;
    onChange((index + delta + count) % count);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  const onPointerDown = (event: React.PointerEvent) => {
    pointerStart.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (pointerStart.current === null) return;
    const dx = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  const position = index !== null ? `${index + 1} / ${count}` : "";
  const showDownload = allowDownload && current?.fileName;

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={() => onChange(null)}
      onKeyDown={onKeyDown}
      className="lightbox surface-dark open:flex open:flex-col open:animate-fade"
    >
      {current && index !== null && (
        <>
          <div className="flex h-16 shrink-0 items-center justify-between pl-5 pr-2 lg:h-20 lg:pl-10 lg:pr-6">
            <p className="flex items-center gap-5 text-sm">
              <span className="font-semibold">{position}</span>
              {(current.caption || current.fileName) && (
                <span className="hidden text-ash sm:inline">
                  {[current.fileName, current.caption].filter(Boolean).join(" · ")}
                </span>
              )}
            </p>
            <div className="flex items-center gap-2">
              {showDownload && (
                <a
                  href={current.photo.src.src}
                  download={current.fileName}
                  className="btn btn-light-outline btn-sm hidden sm:inline-flex"
                >
                  <DownloadIcon size={16} />
                  Download
                </a>
              )}
              <button
                type="button"
                onClick={() => onChange(null)}
                aria-label="Close viewer"
                className="flex size-12 items-center justify-center hover:bg-limestone/10"
                autoFocus
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div
            className="relative grow touch-pan-y select-none lg:mx-[120px] lg:mb-14"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <Image
              key={index}
              src={current.photo.src}
              alt={current.photo.alt}
              fill
              sizes="(min-width: 1024px) calc(100vw - 240px), 100vw"
              placeholder="blur"
              className="animate-fade object-contain"
              draggable={false}
            />
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-8 top-1/2 hidden size-14 -translate-y-1/2 items-center justify-center border border-limestone/35 bg-night/40 hover:bg-limestone/10 lg:flex"
              >
                <ArrowLeft size={20} strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-8 top-1/2 hidden size-14 -translate-y-1/2 items-center justify-center border border-limestone/35 bg-night/40 hover:bg-limestone/10 lg:flex"
              >
                <ArrowRight size={20} strokeWidth={1.4} />
              </button>
            </>
          )}

          {/* Small screens: caption, browse controls and download at the thumb end. */}
          <div className="flex shrink-0 flex-col gap-3.5 px-5 pb-7 pt-3 lg:hidden">
            <div className="flex items-center justify-between gap-4">
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="flex size-11 items-center justify-center border border-limestone/35"
                >
                  <ArrowLeft />
                </button>
              )}
              <p className="text-center text-[13px] text-ash">
                {current.caption}
                {current.fileName && <span className="block">{current.fileName}</span>}
              </p>
              {count > 1 && (
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="flex size-11 items-center justify-center border border-limestone/35"
                >
                  <ArrowRight />
                </button>
              )}
            </div>
            {showDownload && (
              <a href={current.photo.src.src} download={current.fileName} className="btn btn-light-outline w-full">
                <DownloadIcon />
                Download this image
              </a>
            )}
            {count > 1 && <p className="text-center text-xs text-ash">Swipe or use the arrows to browse</p>}
          </div>

          <p aria-live="polite" className="sr-only">
            Image {position}
            {current.caption ? `: ${current.caption}` : ""}
          </p>
        </>
      )}
    </dialog>
  );
}
