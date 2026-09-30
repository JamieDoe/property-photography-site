import { ServiceFeature, UpcomingServices } from "@/components/services/ServiceFeature";
import { Headline } from "@/components/ui/Headline";
import { availableServices } from "@/content/services";
import type { Headline as HeadlineContent } from "@/content/types";

type ServicesOverviewProps = {
  eyebrow: string;
  headline: HeadlineContent;
  intro: string;
};

export function ServicesOverview({ eyebrow, headline, intro }: ServicesOverviewProps) {
  return (
    <section aria-labelledby="services-heading" className="section-y gutter bg-stone">
      <div className="grid gap-y-7 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-5 lg:col-span-4 lg:gap-7">
          <p className="eyebrow text-taupe">{eyebrow}</p>
          <Headline id="services-heading" headline={headline} className="reveal text-section-sm" />
          <p className="body-copy hidden max-w-[360px] lg:block">{intro}</p>
        </div>
        <div className="mt-2 flex flex-col gap-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {availableServices.map((service, index) => (
            <ServiceFeature key={service.slug} service={service} index={index + 1} />
          ))}
        </div>
      </div>
      <UpcomingServices className="mt-12 lg:mt-24" />
    </section>
  );
}
