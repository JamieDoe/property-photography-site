import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { ArrowRight } from "@/components/ui/Icons";
import { locationHref, locations } from "@/content/locations";

/**
 * Large typographic list of service areas. On desktop, hovering or focusing
 * a row reveals a photograph from that area.
 */
export function AreasList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <nav aria-label="Areas we cover">
      <ul className="flex flex-col">
        {locations.map((location, index) => (
          <li key={location.slug} className="border-t border-rule last:border-b">
            <Link
              href={locationHref(location.slug)}
              className="group relative flex min-h-[88px] items-center justify-between transition-colors lg:-mx-[var(--gutter)] lg:grid lg:h-[150px] lg:grid-cols-12 lg:gap-x-6 lg:px-[var(--gutter)] lg:hover:bg-stone lg:focus-visible:bg-stone"
            >
              <span className="eyebrow hidden text-taupe lg:col-span-1 lg:block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Heading className="display text-[36px] lg:col-span-6 lg:text-[min(5.6vw,80px)]">{location.name}</Heading>
              <Photo
                photo={location.card}
                alt=""
                className="hidden h-[110px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 lg:col-span-2 lg:block"
                sizes="15vw"
              />
              <span className="hidden text-[15px] text-taupe lg:col-span-2 lg:block">
                {location.highlights.join(" · ")}
              </span>
              <span className="transition-colors group-hover:text-rust lg:col-span-1 lg:justify-self-end">
                <ArrowRight size={22} strokeWidth={1.3} className="lg:size-7" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
