"use server";

import { deliverEnquiry } from "@/lib/enquiry/deliver";
import { type Enquiry, type EnquiryErrors, emptyEnquiry, validateEnquiry } from "@/lib/enquiry/schema";

export type EnquiryResult =
  | { status: "invalid"; errors: EnquiryErrors }
  | { status: "received"; delivered: boolean };

const text = (value: unknown, max = 2000) => (typeof value === "string" ? value.slice(0, max) : "");
const list = (value: unknown, max: number) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").slice(0, max) : [];

/** Validates on the server (never trust the client) and hands off to the delivery adapter. */
export async function submitEnquiry(input: Enquiry): Promise<EnquiryResult> {
  const raw = (input ?? {}) as Partial<Record<keyof Enquiry, unknown>>;
  const enquiry: Enquiry = {
    ...emptyEnquiry,
    role: text(raw.role, 40),
    name: text(raw.name, 120),
    email: text(raw.email, 200),
    phone: text(raw.phone, 40),
    company: text(raw.company, 120),
    address: text(raw.address, 300),
    propertyType: text(raw.propertyType, 40),
    bedrooms: text(raw.bedrooms, 10),
    size: text(raw.size, 40),
    service: text(raw.service, 80),
    package: text(raw.package, 20),
    dates: list(raw.dates, 31),
    times: list(raw.times, 4),
    flexible: raw.flexible === true,
    message: text(raw.message, 2001),
  };

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const { delivered } = await deliverEnquiry(enquiry);
  return { status: "received", delivered };
}
