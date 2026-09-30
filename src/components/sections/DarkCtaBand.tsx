import { Headline } from "@/components/ui/Headline";
import type { Headline as HeadlineContent } from "@/content/types";

type DarkCtaBandProps = {
  headline: HeadlineContent;
  text?: string;
  children: React.ReactNode;
};

/** Closing call to action on inner pages; sits directly above the compact footer. */
export function DarkCtaBand({ headline, text, children }: DarkCtaBandProps) {
  return (
    <section className="surface-dark gutter bg-ink pb-4 pt-16 text-limestone lg:pb-[46px] lg:pt-[110px]">
      <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
        <Headline headline={headline} className="reveal text-section lg:col-span-8" />
        <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:col-start-9">
          {text && <p className="mb-3 text-base leading-relaxed text-sand lg:text-[17px]">{text}</p>}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">{children}</div>
        </div>
      </div>
    </section>
  );
}
