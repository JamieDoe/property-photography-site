import type { LocationSlug, Testimonial } from "./types";

/*
 * Testimonials.
 *
 * PLACEHOLDER: every entry below is a bracketed stand-in. Never publish
 * invented quotes. Replace each with a real, attributable quote (with the
 * client's permission) and set `placeholder: false`, or delete it. Sections
 * that show testimonials hide themselves when there are none to show.
 */

export const testimonials: Testimonial[] = [
  {
    id: "home-01",
    quote:
      "[Testimonial from an estate agent: one or two sentences on how the photographs helped a listing.]",
    name: "[Name]",
    role: "[Role]",
    company: "[Agency]",
    town: "[Town]",
    placeholder: true,
  },
  {
    id: "home-02",
    quote: "[Testimonial from a homeowner: what it was like to work with Jamie on the day.]",
    name: "[Name]",
    role: "Homeowner",
    town: "[Town]",
    placeholder: true,
  },
  {
    id: "home-03",
    quote: "[Testimonial from a property manager or letting agent: reliability, turnaround and consistency.]",
    name: "[Name]",
    role: "[Role]",
    company: "[Company]",
    town: "[Town]",
    placeholder: true,
  },
  {
    id: "fareham-01",
    quote: "[Testimonial from a local Fareham agent or homeowner.]",
    name: "[Name]",
    role: "[Role]",
    company: "[Agency]",
    town: "Fareham",
    area: "fareham",
    placeholder: true,
  },
  {
    id: "gosport-01",
    quote: "[Testimonial from a local Gosport agent or homeowner.]",
    name: "[Name]",
    role: "[Role]",
    company: "[Agency]",
    town: "Gosport",
    area: "gosport",
    placeholder: true,
  },
  {
    id: "portsmouth-01",
    quote: "[Testimonial from a local Portsmouth or Southsea agent or homeowner.]",
    name: "[Name]",
    role: "[Role]",
    company: "[Agency]",
    town: "Portsmouth",
    area: "portsmouth",
    placeholder: true,
  },
  {
    id: "southampton-01",
    quote: "[Testimonial from a local Southampton agent, letting agent or homeowner.]",
    name: "[Name]",
    role: "[Role]",
    company: "[Agency]",
    town: "Southampton",
    area: "southampton",
    placeholder: true,
  },
];

/** General testimonials for the homepage. */
export function getHomeTestimonials(): Testimonial[] {
  return testimonials.filter((testimonial) => !testimonial.area);
}

export function getTestimonial(id: string): Testimonial | undefined {
  return testimonials.find((testimonial) => testimonial.id === id);
}

export function getAreaTestimonial(area: LocationSlug): Testimonial | undefined {
  return testimonials.find((testimonial) => testimonial.area === area);
}

/** "Role, Company, Town" with any missing parts left out. */
export function testimonialAttribution(testimonial: Testimonial): string {
  return [testimonial.role, testimonial.company, testimonial.town].filter(Boolean).join(", ");
}
