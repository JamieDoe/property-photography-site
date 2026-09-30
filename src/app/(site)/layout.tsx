import { ViewTransition } from "react";
import { FooterSwitch } from "@/components/layout/FooterSwitch";
import { MobileEnquireBar } from "@/components/layout/MobileEnquireBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CompactFooter, FullFooter } from "@/components/layout/SiteFooter";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-50 -translate-y-24 bg-ink px-5 py-3 text-sm font-semibold text-limestone focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <ViewTransition>
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
      </ViewTransition>
      <FooterSwitch full={<FullFooter />} compact={<CompactFooter />} />
      <MobileEnquireBar />
    </>
  );
}
