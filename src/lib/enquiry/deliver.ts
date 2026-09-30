import type { Enquiry } from "./schema";

export type DeliveryResult = { delivered: boolean };

/**
 * Delivery adapter for validated enquiries.
 *
 * V1: NOT CONNECTED. No enquiry is stored or sent anywhere, and the form
 * tells the visitor so. To go live, send the enquiry to an email API
 * (e.g. Resend, Postmark) and/or a database here, keeping credentials in
 * server-side environment variables, and return `{ delivered: true }` only
 * once delivery has actually succeeded.
 */
export async function deliverEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
  void enquiry;
  return { delivered: false };
}
