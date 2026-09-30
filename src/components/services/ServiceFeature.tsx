import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { ArrowRight } from "@/components/ui/Icons";
import { formatPrice, lowestPrice } from "@/content/pricing";
import { serviceHref, upcomingServices } from "@/content/services";
import type { Service } from "@/content/types";
import { media } from "@/content/media";

/** The primary service presented as a single large, image-led link. */
export function ServiceFeature({
  service,
  index = 1,
  headingLevel = "h3",
}: {
  service: Service;
  index?: number;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <Link href={serviceHref(service)} className="lift group flex flex-col gap-[18px] lg:gap-8">
      <Photo
        photo={media.frontElevation}
        className="h-[260px] sm:h-[380px] lg:h-[min(34.7vw,580px)]"
        sizes="(min-width: 1024px) 56vw, 100vw"
      />
      <div className="flex flex-col gap-[18px] lg:grid lg:grid-cols-2 lg:gap-x-6">
        <div className="flex flex-col gap-3">
          <span className="eyebrow text-taupe">{String(index).padStart(2, "0")}</span>
          <Heading className="display text-[30px] leading-none tracking-[-0.035em] lg:text-[min(3.05vw,44px)]">
            {service.name}
          </Heading>
        </div>
        <div className="flex flex-col gap-5 lg:items-start">
          <p className="body-copy lg:text-base">{service.summary}</p>
          <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-5">
            <p className="text-[15px] font-semibold">From {formatPrice(lowestPrice())}</p>
            <span className="text-link group-hover:text-rust">
              <span>
                Explore<span className="hidden lg:inline"> the service</span>
              </span>
              <ArrowRight />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Services that are planned but not yet offered. */
export function UpcomingServices({ className = "" }: { className?: string }) {
  if (upcomingServices.length === 0) return null;
  return (
    <div className={`grid gap-y-3 lg:grid-cols-12 lg:gap-x-6 ${className}`}>
      <h3 className="eyebrow text-taupe lg:col-span-4 lg:pt-[22px]">Coming later</h3>
      <ul className="flex flex-col lg:col-span-7 lg:col-start-6 lg:grid lg:grid-cols-3 lg:gap-x-6">
        {upcomingServices.map((service, i) => (
          <li
            key={service.slug}
            className="flex h-[52px] items-center justify-between border-t border-rule-strong font-semibold text-muted last:border-b lg:h-auto lg:flex-col-reverse lg:items-start lg:justify-end lg:gap-2 lg:pt-5 lg:last:border-b-0"
          >
            <span className="lg:text-xl">{service.name}</span>
            <span className="eyebrow">{String(i + 2).padStart(2, "0")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
