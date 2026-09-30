import { media } from "./media";
import type { Service } from "./types";

/*
 * Services. Only "available" services get a page; "coming-later" entries are
 * listed as upcoming. To launch a new service, set its status to "available",
 * fill in the page fields and add a route under `app/(site)/services/`.
 *
 * Bracketed values such as "[X]" are PLACEHOLDERS to confirm before launch.
 */

export const propertyPhotography: Service = {
  slug: "property-photography",
  name: "Property photography",
  status: "available",
  summary:
    "Interiors, exteriors and gardens, hand-edited and delivered ready for Rightmove, Zoopla and print.",
  headline: { lead: "Property", accent: "photography." },
  intro:
    "Interiors, exteriors and gardens, photographed with care and hand-edited so your listing is the one buyers stop scrolling for.",
  image: { ...media.livingRoom, caption: "Living room · afternoon" },
  included: {
    headline: { lead: "Everything a listing", accent: "needs." },
    intro:
      "Each shoot covers the rooms buyers care about most, lit and composed to show space, flow and light as they are on a good day.",
    items: [
      { title: "Interiors & exteriors", text: "Every key room, front elevation and garden." },
      { title: "Hand editing", text: "Straight verticals, window views balanced, colour corrected." },
      { title: "Portal-ready files", text: "Sized for Rightmove and Zoopla, plus full-resolution for print." },
      { title: "Private gallery", text: "View, share and download every image in one place." },
      { title: "Fast turnaround", text: "Delivered within [X] working days." },
      { title: "Marketing licence", text: "Use the images to market the property, online and in print." },
    ],
  },
  process: {
    headline: { lead: "Four steps.", accent: "No fuss." },
    steps: [
      { title: "Enquire", text: "Share the address, property type and a few dates that suit." },
      { title: "Confirm", text: "We agree the date and price, and send a short room-by-room prep checklist." },
      { title: "Shoot", text: "Around [1–2] hours on site, depending on the size of the property." },
      { title: "Delivered", text: "Edited images land in your private gallery, ready to download." },
    ],
  },
  faqs: [
    {
      question: "How should I prepare the property?",
      answer:
        "Clear worktops and surfaces, open curtains, switch on lamps and move cars off the drive. You'll get a short checklist when you book.",
    },
    {
      question: "Do you work evenings and weekends?",
      answer: "Yes. Evening and weekend slots are available, which also suits twilight shoots.",
    },
    {
      question: "How long until I get the photos?",
      answer: "Within [X] working days, or next working day with express delivery.",
    },
    {
      question: "Can the agent and the vendor both use the images?",
      answer: "[Licence terms: who may use the images, where, and for how long.]",
    },
    {
      question: "What if the weather is bad?",
      answer:
        "Interiors can go ahead. Exteriors can be reshot on a brighter day at [no extra cost / a set fee].",
    },
    {
      question: "Do you offer agency rates?",
      answer: "Yes. For regular bookings, ask about a bespoke rate.",
    },
  ],
  metaDescription:
    "Professional property photography in Hampshire: interiors, exteriors, gardens and twilight, hand-edited and delivered ready for Rightmove, Zoopla and print.",
};

export const services: Service[] = [
  propertyPhotography,
  { slug: "floor-plans", name: "Floor plans", status: "coming-later", summary: "Accurate, clear floor plans." },
  {
    slug: "video-walkthroughs",
    name: "Video walkthroughs",
    status: "coming-later",
    summary: "Short, steady walkthrough films.",
  },
  {
    slug: "aerial-photography",
    name: "Aerial photography",
    status: "coming-later",
    summary: "Elevated views of the home and its setting.",
  },
];

export const availableServices = services.filter((service) => service.status === "available");
export const upcomingServices = services.filter((service) => service.status === "coming-later");

export function serviceHref(service: Service): string {
  return `/services/${service.slug}`;
}
