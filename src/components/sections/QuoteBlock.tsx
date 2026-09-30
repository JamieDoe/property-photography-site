import { testimonialAttribution } from "@/content/testimonials";
import type { Testimonial } from "@/content/types";

/** A single testimonial set large in the serif italic. */
export function QuoteBlock({ testimonial, eyebrow }: { testimonial: Testimonial; eyebrow: string }) {
  return (
    <section className="gutter bg-stone py-[72px] lg:py-[120px]">
      <div className="grid gap-y-7 lg:grid-cols-12 lg:gap-x-6">
        <p className="eyebrow text-taupe lg:col-span-3">{eyebrow}</p>
        <figure className="flex flex-col gap-7 lg:col-span-9 lg:gap-8">
          <blockquote className="accent text-[34px] leading-[1.1] [text-wrap:balance] lg:text-[48px]">
            “{testimonial.quote}”
          </blockquote>
          <figcaption className="text-sm lg:text-[15px]">
            <span className="font-semibold">{testimonial.name}</span>{" "}
            <span className="text-taupe">— {testimonialAttribution(testimonial)}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
