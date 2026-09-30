"use client";

import { usePathname } from "next/navigation";

/**
 * The homepage ends with the full footer; inner pages close with their own
 * dark CTA band and a compact footer beneath it (per the design).
 */
export function FooterSwitch({ full, compact }: { full: React.ReactNode; compact: React.ReactNode }) {
  const pathname = usePathname();
  return pathname === "/" ? full : compact;
}
