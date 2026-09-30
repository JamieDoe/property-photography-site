import { Headline } from "@/components/ui/Headline";
import type { Headline as HeadlineContent } from "@/content/types";

type PageIntroProps = {
  eyebrow: string;
  headline: HeadlineContent;
  /** Right-hand column: a short intro and/or an action. */
  aside?: React.ReactNode;
  /** Extra content under the heading row, e.g. filter chips. */
  children?: React.ReactNode;
};

/** Opening block for pages without a full-bleed hero. */
export function PageIntro({ eyebrow, headline, aside, children }: PageIntroProps) {
  return (
    <section className="gutter pb-10 pt-12 lg:pb-16 lg:pt-[110px]">
      <div className="grid gap-y-7 lg:grid-cols-12 lg:items-end lg:gap-x-6">
        <div className="flex flex-col gap-5 lg:col-span-8 lg:gap-7">
          <p className="eyebrow text-taupe">{eyebrow}</p>
          <Headline as="h1" headline={headline} className="animate-rise text-title" />
        </div>
        {aside && (
          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9">{aside}</div>
        )}
      </div>
      {children}
    </section>
  );
}
