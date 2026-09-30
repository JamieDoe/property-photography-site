import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CompactFooter } from "@/components/layout/SiteFooter";
import { Headline } from "@/components/ui/Headline";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="gutter flex min-h-[70svh] flex-col justify-center gap-8 py-20">
        <p className="eyebrow text-taupe">404</p>
        <Headline as="h1" headline={{ lead: "This page has", accent: "moved out." }} className="text-title" />
        <p className="body-copy max-w-[480px]">
          The page you were looking for isn&rsquo;t here. Try the portfolio, or get in touch about a shoot.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/portfolio" className="btn">
            View portfolio
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Enquire about a shoot
          </Link>
        </div>
      </main>
      <CompactFooter />
    </>
  );
}
