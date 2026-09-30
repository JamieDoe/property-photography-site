"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "./EnquiryForm";

/** Pre-selects a package when arriving from a pricing card (/contact?package=standard). */
export function EnquiryFormWithParams({ email }: { email: string }) {
  const params = useSearchParams();
  const pkg = params.get("package") ?? "";
  return <EnquiryForm key={pkg} email={email} initialPackage={pkg} />;
}
