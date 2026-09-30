"use client";

import { createContext, use, useState } from "react";
import { ExpandIcon } from "@/components/ui/Icons";
import { Lightbox, type LightboxItem } from "./Lightbox";

const OpenLightbox = createContext<(index: number) => void>(() => {});

/**
 * Wraps server-rendered image layouts so any image can open the fullscreen
 * viewer. Only the triggers and the viewer ship as client code.
 */
export function LightboxProvider({
  items,
  label,
  children,
}: {
  items: LightboxItem[];
  label: string;
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <OpenLightbox value={setIndex}>
      {children}
      <Lightbox items={items} index={index} onChange={setIndex} label={label} />
    </OpenLightbox>
  );
}

/** Invisible full-cover button over an image, with a small expand affordance. */
export function ImageTrigger({ index, label }: { index: number; label: string }) {
  const open = use(OpenLightbox);
  return (
    <button
      type="button"
      onClick={() => open(index)}
      aria-label={label}
      className="group/trigger absolute inset-0 cursor-zoom-in"
    >
      <span className="surface-dark absolute right-4 top-4 flex size-11 items-center justify-center bg-ink/55 text-limestone opacity-0 transition-opacity group-hover/trigger:opacity-100 group-focus-visible/trigger:opacity-100">
        <ExpandIcon />
      </span>
    </button>
  );
}

/** A visible button that opens the viewer, e.g. "View all 12 images". */
export function LightboxButton({
  index = 0,
  className = "",
  children,
}: {
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const open = use(OpenLightbox);
  return (
    <button type="button" onClick={() => open(index)} className={className}>
      {children}
    </button>
  );
}
