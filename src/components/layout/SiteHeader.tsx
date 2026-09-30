"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useSyncExternalStore } from "react";
import { enquireCta, primaryNav, site } from "@/content/site";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { Wordmark } from "./Wordmark";

/** Routes that open with a full-bleed photograph behind a transparent header. */
const OVERLAY_ROUTES = [/^\/$/, /^\/portfolio\/[^/]+$/];

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Site header. Transparent over hero photography, solid limestone once the
 * page scrolls. On mobile: wordmark, Enquire and a full-screen menu.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDialogElement>(null);
  const overlay = OVERLAY_ROUTES.some((route) => route.test(pathname));
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const solid = !overlay || scrolled;

  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 isolate transition-colors duration-300 ${
          solid ? "text-ink" : "surface-dark text-limestone"
        }`}
      >
        {/*
          Over photography: a blur behind the bar that tapers away from top to bottom.
          Unmounted (not just faded) once the bar is solid: WebKit can ignore opacity on
          backdrop-filter elements, which would paint the blur over the solid background.
        */}
        {!solid && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+32px)] backdrop-blur-[10px] [mask-image:linear-gradient(to_bottom,#000_0%,#000_35%,transparent_100%)]"
          />
        )}
        {/* Solid limestone bar, its own layer above the blur so nothing can cover it. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 border-b border-rule bg-limestone transition-opacity duration-300 ${
            solid ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="gutter flex h-[var(--header-h)] items-center justify-between">
          <Link href="/" aria-label={`${site.legalName}, home`} className="-my-2 py-2">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b pb-[3px] text-[15px] font-medium transition-opacity hover:opacity-65 ${
                    active && solid ? "border-current" : "border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={enquireCta.href}
              className={`btn btn-sm ml-2 ${solid ? "" : "btn-light"}`}
            >
              {enquireCta.label}
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 lg:hidden">
            <Link
              href={enquireCta.href}
              className={`flex h-11 items-center px-4 text-sm font-semibold ${
                solid ? "bg-ink text-limestone" : "bg-limestone text-ink"
              }`}
            >
              {enquireCta.label}
            </Link>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-haspopup="dialog"
              className="-mr-2.5 flex size-11 items-center justify-center"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {!overlay && <div aria-hidden="true" className="h-[var(--header-h)]" />}

      <dialog
        ref={menuRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-limestone p-0 text-ink backdrop:bg-ink/40 open:flex open:flex-col open:animate-fade lg:hidden"
      >
        <div className="gutter flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-rule">
          <Link href="/" onClick={closeMenu} aria-label={`${site.legalName}, home`}>
            <Wordmark />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="-mr-2.5 flex size-11 items-center justify-center"
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Main" className="gutter flex grow flex-col justify-center overflow-y-auto py-10">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.href} className="border-t border-rule last:border-b">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className="display flex min-h-[68px] items-center justify-between text-[40px] aria-[current=page]:text-rust"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="gutter flex shrink-0 flex-col gap-4 pb-8">
          <Link href={enquireCta.href} onClick={closeMenu} className="btn w-full">
            Enquire about a shoot
          </Link>
          <a href={`mailto:${site.contact.email}`} className="text-center text-[15px] text-taupe">
            {site.contact.email}
          </a>
        </div>
      </dialog>
    </>
  );
}
