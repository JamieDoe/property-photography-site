import { Photo } from "@/components/media/Photo";
import { Headline } from "@/components/ui/Headline";
import type { Headline as HeadlineContent, Photo as PhotoContent } from "@/content/types";

type WhyWorkWithUsProps = {
  eyebrow: string;
  headline: HeadlineContent;
  image: PhotoContent;
  points: readonly { title: string; text: string }[];
};

/** Dark section: heading, a tall bleed image on mobile / left column on desktop, four points. */
export function WhyWorkWithUs({ eyebrow, headline, image, points }: WhyWorkWithUsProps) {
  return (
    <section aria-labelledby="why-heading" className="surface-dark section-y gutter bg-ink text-limestone">
      <div className="grid gap-y-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-16">
        <div className="flex flex-col gap-5 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:gap-7">
          <p className="eyebrow text-sand-muted">{eyebrow}</p>
          <Headline id="why-heading" headline={headline} className="reveal text-section-sm" />
        </div>
        <Photo
          photo={image}
          className="-mx-5 h-[400px] md:-mx-10 lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:h-[min(52.8vw,860px)]"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <ul className="flex flex-col gap-7 lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12 lg:self-end">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="flex flex-col gap-2.5 border-t border-line-dark pt-[18px] lg:gap-3 lg:pt-[22px]"
            >
              <span className="eyebrow text-sand-muted">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-semibold lg:text-[22px]">{point.title}</h3>
              <p className="text-[15px] leading-relaxed text-sand lg:text-base">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
