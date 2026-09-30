"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { testimonialAttribution } from "@/content/testimonials";
import type { Testimonial } from "@/content/types";

type TestimonialCarouselProps = {
  eyebrow: string;
  testimonials: Testimonial[];
};

/** One quote at a time with previous/next controls. Never auto-advances. */
export function TestimonialCarousel({ eyebrow, testimonials }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const current = testimonials[index];
  const step = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const position = `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;

  const controls =
    count > 1 ? (
      <div className="flex items-center gap-2 lg:gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous testimonial"
          className="flex size-11 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-limestone lg:size-12"
        >
          <ArrowLeft />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next testimonial"
          className="flex size-11 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-limestone lg:size-12"
        >
          <ArrowRight />
        </button>
        <span className="eyebrow ml-2 text-taupe lg:ml-0">{position}</span>
      </div>
    ) : null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Testimonials"
      className="gutter bg-stone py-[72px] lg:py-[130px]"
    >
      <div className="grid gap-y-7 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col justify-between lg:col-span-3">
          <p className="eyebrow text-taupe">{eyebrow}</p>
          <div className="hidden lg:block">{controls}</div>
        </div>
        <figure
          key={current.id}
          aria-live="polite"
          className="animate-fade flex flex-col gap-7 lg:col-span-9 lg:gap-10"
        >
          <blockquote className="accent text-[34px] leading-[1.1] [text-wrap:balance] lg:text-[58px] lg:leading-[1.08]">
            “{current.quote}”
          </blockquote>
          <figcaption className="flex items-center gap-4 text-sm lg:text-[15px]">
            <span aria-hidden="true" className="hidden h-px w-10 bg-ink lg:block" />
            <span className="font-semibold">{current.name}</span>
            <span className="text-taupe">{testimonialAttribution(current)}</span>
          </figcaption>
        </figure>
        <div className="lg:hidden">{controls}</div>
      </div>
    </section>
  );
}
