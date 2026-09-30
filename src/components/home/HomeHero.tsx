"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Headline } from "@/components/ui/Headline";
import type { Headline as HeadlineContent, Photo } from "@/content/types";

export type HeroSlide = {
  photo: Photo;
  title: string;
  place: string;
  detail?: string;
  href: string;
};

type HomeHeroProps = {
  headline: HeadlineContent;
  intro: string;
  slides: HeroSlide[];
};

/**
 * Full-bleed homepage hero. The first featured project loads with priority;
 * visitors can step through the others. Nothing auto-advances.
 */
export function HomeHero({ headline, intro, slides }: HomeHeroProps) {
  const [active, setActive] = useState(0);
  // Only mount images once they have been requested, so the page loads one hero image.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const current = slides[active];

  const show = (index: number) => {
    setLoaded((prev) => new Set(prev).add(index));
    setActive(index);
  };

  return (
    <section
      aria-label="Introduction"
      className="surface-dark relative isolate flex h-[88svh] min-h-[620px] max-h-[980px] items-end overflow-hidden text-limestone lg:h-[100svh] lg:min-h-[720px]"
    >
      <div className="animate-settle absolute inset-0 -z-20">
        {slides.map((slide, index) =>
          loaded.has(index) ? (
            <Image
              key={slide.href}
              src={slide.photo.src}
              alt={index === active ? slide.photo.alt : ""}
              fill
              sizes="100vw"
              preload={index === 0}
              placeholder="blur"
              className={`object-cover transition-opacity duration-700 ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null,
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,8,10,.5)_0,rgba(8,8,10,0)_18%,rgba(8,8,10,0)_38%,rgba(8,8,10,.72)_100%)] lg:bg-[linear-gradient(180deg,rgba(8,8,10,.5)_0,rgba(8,8,10,0)_20%,rgba(8,8,10,0)_42%,rgba(8,8,10,.66)_100%)]"
      />

      <div className="gutter grid w-full gap-y-8 pb-9 lg:grid-cols-12 lg:items-end lg:gap-x-6 lg:pb-[76px]">
        <div className="animate-rise flex flex-col gap-[22px] lg:col-span-9 lg:gap-0">
          <Headline as="h1" headline={headline} className="text-hero" />
          <p className="max-w-[540px] text-base leading-[1.55] text-limestone/90 lg:mt-[30px] lg:text-[19px]">
            {intro}
          </p>
          <div className="mt-1 flex flex-col gap-2.5 sm:flex-row sm:gap-3 lg:mt-[38px]">
            <Link href="/portfolio" className="btn btn-light">
              View portfolio
            </Link>
            <Link href="/contact" className="btn btn-light-outline">
              Enquire about a shoot
            </Link>
          </div>
        </div>

        <div className="hidden flex-col items-end gap-3.5 text-right lg:col-span-3 lg:col-start-10 lg:flex">
          <span className="eyebrow opacity-80">Featured project</span>
          <Link href={current.href} className="text-[15px] leading-normal hover:opacity-80" aria-live="polite">
            {current.title}, {current.place}
            {current.detail && (
              <>
                <br />
                {current.detail}
              </>
            )}
          </Link>
          {slides.length > 1 && (
            <div className="-mr-1 mt-0.5 flex" role="group" aria-label="Featured projects">
              {slides.map((slide, index) => (
                <button
                  key={slide.href}
                  type="button"
                  onClick={() => show(index)}
                  aria-label={`Show ${slide.title}, ${slide.place}`}
                  aria-pressed={index === active}
                  className="group flex h-11 w-[42px] items-center justify-center"
                >
                  <span
                    className={`block h-0.5 w-9 transition-colors ${
                      index === active ? "bg-limestone" : "bg-limestone/35 group-hover:bg-limestone/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
