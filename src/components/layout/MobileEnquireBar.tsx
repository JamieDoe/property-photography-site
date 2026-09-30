"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

const HIDDEN_ON = ["/contact"];

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

/** Sticky enquiry bar on small screens, shown once the visitor scrolls past the opening image. */
export function MobileEnquireBar() {
  const pathname = usePathname();
  const pastHero = useSyncExternalStore(
    subscribe,
    () => window.scrollY > window.innerHeight * 0.75,
    () => false,
  );

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      inert={!pastHero}
      className={`surface-dark fixed inset-x-0 bottom-0 z-30 flex h-[72px] items-center justify-between bg-ink pb-[env(safe-area-inset-bottom)] pl-5 pr-2.5 text-limestone shadow-[0_-8px_24px_rgba(0,0,0,.12)] transition-transform duration-300 lg:hidden ${
        pastHero ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex flex-col gap-[3px]">
        <span className="text-sm font-semibold">Like what you see?</span>
        <span className="text-xs text-sand">Evenings &amp; weekends available</span>
      </div>
      <Link href="/contact" className="flex h-[52px] items-center bg-limestone px-[18px] text-sm font-semibold text-ink">
        Enquire
      </Link>
    </div>
  );
}
