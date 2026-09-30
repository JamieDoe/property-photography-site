import Link from "next/link";
import { locations, locationHref } from "@/content/locations";
import { exploreNav, site } from "@/content/site";

const year = new Date().getFullYear();

function Copyright() {
  return (
    <span>
      © {year} {site.legalName} · {site.photographer}
    </span>
  );
}

/** Full footer: used on the homepage. */
export function FullFooter() {
  return (
    <footer className="surface-dark gutter bg-ink pb-28 pt-16 text-limestone lg:pb-12 lg:pt-24">
      <div className="grid grid-cols-2 gap-x-3 gap-y-11 lg:grid-cols-12 lg:gap-x-6">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-4 lg:gap-5">
          <span className="wordmark text-xl uppercase lg:text-2xl">{site.name}</span>
          <p className="max-w-[300px] text-sm leading-relaxed text-sand lg:text-[15px]">{site.tagline}</p>
        </div>
        <FooterColumn title="Explore" className="lg:col-span-2 lg:col-start-6">
          {exploreNav.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn title="Areas" className="lg:col-span-2">
          {locations.map((location) => (
            <FooterLink key={location.slug} href={locationHref(location.slug)}>
              {location.name}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn title="Contact" className="col-span-2 lg:col-span-3">
          <a href={`mailto:${site.contact.email}`} className="text-[15px] font-medium hover:opacity-65">
            {site.contact.email}
          </a>
          <FooterLink href="/contact">Enquire about a shoot</FooterLink>
        </FooterColumn>
      </div>
      <div className="mt-11 border-t border-line-dark pt-5 text-xs text-ash lg:mt-20 lg:pt-7 lg:text-[13px]">
        <Copyright />
      </div>
    </footer>
  );
}

/** Compact footer: sits under each inner page's closing dark CTA band. */
export function CompactFooter() {
  return (
    <footer className="surface-dark gutter bg-ink pb-28 pt-12 text-limestone lg:pb-12 lg:pt-16">
      <div className="flex flex-col gap-3 border-t border-line-dark pt-5 text-xs text-ash lg:flex-row lg:items-center lg:justify-between lg:pt-7 lg:text-[13px]">
        <span className="wordmark hidden text-base uppercase text-limestone lg:inline">{site.name}</span>
        <Copyright />
        <a href={`mailto:${site.contact.email}`} className="hover:text-limestone">
          {site.contact.email}
        </a>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col items-start gap-3 lg:gap-3.5 ${className}`}>
      <h2 className="eyebrow mb-1 text-sand-muted lg:mb-1.5">{title}</h2>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[15px] font-medium transition-opacity hover:opacity-65">
      {children}
    </Link>
  );
}
