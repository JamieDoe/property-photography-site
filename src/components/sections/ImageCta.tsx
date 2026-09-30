import { Photo } from "@/components/media/Photo";
import { Headline } from "@/components/ui/Headline";
import type { Headline as HeadlineContent, Photo as PhotoContent } from "@/content/types";

type ImageCtaProps = {
  photo: PhotoContent;
  eyebrow?: string;
  headline: HeadlineContent;
  text?: string;
  children: React.ReactNode;
  /** Height of the band on large screens. */
  size?: "md" | "lg";
  /** "gradient": left-to-right scrim. "flat": even scrim for busy images. */
  scrim?: "gradient" | "flat";
};

/**
 * Full-bleed photograph with a call to action over its darkest third.
 * Text sits bottom-left on mobile and centre-left on desktop.
 */
export function ImageCta({
  photo,
  eyebrow,
  headline,
  text,
  children,
  size = "md",
  scrim = "gradient",
}: ImageCtaProps) {
  return (
    <section
      className={`surface-dark relative isolate flex min-h-[600px] items-end overflow-hidden text-limestone lg:items-center ${
        size === "lg" ? "lg:min-h-[860px]" : "lg:min-h-[640px]"
      }`}
    >
      <Photo photo={photo} alt="" sizes="100vw" className="absolute! inset-0 -z-20" />
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 ${
          scrim === "flat"
            ? "bg-[rgba(14,13,10,.55)]"
            : "bg-[linear-gradient(180deg,rgba(14,13,10,.15)_0,rgba(14,13,10,.78)_100%)] lg:bg-[linear-gradient(90deg,rgba(14,13,10,.72)_0,rgba(14,13,10,.3)_55%,rgba(14,13,10,0)_100%)]"
        }`}
      />
      <div className="gutter w-full pb-10 pt-32 lg:py-[120px]">
        <div className="flex max-w-[820px] flex-col items-start gap-5 lg:gap-8">
          {eyebrow && <p className="eyebrow opacity-85">{eyebrow}</p>}
          <Headline headline={headline} className="reveal text-cta" />
          {text && (
            <p className="max-w-[500px] text-base leading-[1.55] text-limestone/90 lg:text-[19px]">{text}</p>
          )}
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3 lg:mt-2">{children}</div>
        </div>
      </div>
    </section>
  );
}
