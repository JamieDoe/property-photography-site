import { media } from "./media";
import type { Headline } from "./types";

/*
 * Page copy: headlines, intros and calls to action for each page.
 * Structured, reusable content (projects, services, pricing, areas, posts,
 * testimonials) lives in its own module.
 */

type Cta = { eyebrow?: string; headline: Headline; text?: string };

export const homeCopy = {
  hero: {
    headline: { lead: "Property photography", accent: "for Hampshire." } satisfies Headline,
    intro:
      "Interior, exterior and twilight photography for estate agents and homeowners across Fareham, Gosport, Portsmouth and Southampton.",
  },
  selectedWork: {
    eyebrow: "Selected work",
    headline: { lead: "Make the first photo the reason they", accent: "book a viewing." },
    intro:
      "Every home is shot as a project: considered angles, balanced light and a consistent edit from the front door to the garden.",
  },
  services: {
    eyebrow: "Services",
    headline: { lead: "One service.", accent: "Done properly." },
    intro: "Focused on property photography, so every shoot gets full attention. More services will follow.",
  },
  why: {
    eyebrow: "Why work with us",
    headline: { lead: "Small studio.", accent: "High standards." },
    image: { ...media.bathroom, caption: "Ensuite · verticals corrected" },
    points: [
      {
        title: "Evenings & weekends",
        text: "Shoots arranged around you and your vendors, including evenings and weekends.",
      },
      {
        title: "Professional editing",
        text: "Every image hand-edited: straight verticals, balanced windows, true-to-life colour.",
      },
      {
        title: "Local",
        text: "Based in Hampshire, between Fareham and Southampton. Close enough to reshoot a sunny garden at short notice.",
      },
      {
        title: "Personal",
        text: "You deal with Jamie from first message to final gallery. No call centre, no subcontractors.",
      },
    ],
  },
  areas: {
    eyebrow: "Areas",
    headline: { lead: "Across the", accent: "Solent." },
    intro:
      "Covering Fareham, Gosport, Portsmouth, Southampton and the villages in between. Not sure if you're in range? Just ask.",
  },
  testimonials: { eyebrow: "Kind words" },
  cta: {
    eyebrow: "Your property next",
    headline: { lead: "Let the photographs", accent: "do the selling." },
    text: "Tell us about the property and the dates that suit. We'll come back with availability and a clear price.",
    image: media.garden,
  },
} as const;

export const portfolioCopy = {
  eyebrow: "Portfolio",
  headline: { lead: "Every home,", accent: "a project." },
  intro: "Whole-property shoots, start to finish. Open any project to see the full set as a buyer would.",
  cta: { headline: { lead: "Picture your home", accent: "on this page." }, text: "Tell us about the property and when suits." } satisfies Cta,
  projectCta: { headline: { lead: "Want your property", accent: "to look like this?" } } satisfies Cta,
  metaDescription:
    "Property photography portfolio: houses, apartments, new builds and twilight shoots across Fareham, Gosport, Portsmouth and Southampton.",
};

export const servicesCopy = {
  eyebrow: "Services",
  headline: { lead: "One service.", accent: "Done properly." },
  intro:
    "Focused on property photography, so every shoot gets full attention. Floor plans, video and aerial photography will follow.",
  packagesHeadline: { lead: "Choose by", accent: "property size." },
  extrasHeadline: { lead: "Add what the", accent: "property needs." },
  faqHeadline: { lead: "Good", accent: "questions." },
  cta: {
    headline: { lead: "Ready when", accent: "you are." },
    text: "Evenings and weekends included. Tell us when suits.",
  } satisfies Cta,
  metaDescription:
    "Property photography services in Hampshire for estate agents, property managers and homeowners. Interiors, exteriors, gardens and twilight.",
};

export const pricingCopy = {
  eyebrow: "Pricing",
  headline: { lead: "Clear prices.", accent: "No surprises." },
  compareHeadline: { lead: "What's in", accent: "each." },
  cta: {
    headline: { lead: "Not sure which", accent: "fits?" },
    text: "Send the address or listing link and we'll recommend a package.",
    image: media.kitchen,
  },
  metaDescription:
    "Property photography packages for Hampshire homes: Essential, Standard, Premium and Bespoke. Clear prices for homeowners and estate agents.",
};

export const areasCopy = {
  eyebrow: "Areas",
  headline: { lead: "Across the", accent: "Solent." },
  intro:
    "Based between Fareham and Southampton, covering the towns and villages around Portsmouth Harbour, Southampton Water and the Solent coast.",
  rangeHeadline: { lead: "Not sure if you're", accent: "in range?" },
  range:
    "Prices include travel within Fareham, Gosport, Portsmouth and Southampton. Further afield, including Winchester, Eastleigh, Havant and the Meon Valley, is often possible for a small travel charge. Just ask.",
  cta: { headline: { lead: "Let's photograph", accent: "your next listing." } } satisfies Cta,
  metaDescription:
    "Property photography across South Hampshire: Fareham, Gosport, Portsmouth, Southampton and the villages in between.",
};

export const aboutCopy = {
  eyebrow: "About",
  headline: { lead: "One photographer.", accent: "Every shoot." },
  intro:
    "Solent is a small, independent studio. Every enquiry, shoot and edit is handled by Jamie Doe, so the standard never changes from one home to the next.",
  portraitLabel: "Portrait · Jamie on location",
  approach: {
    eyebrow: "The approach",
    headline: { lead: "A landscape photographer's", accent: "patience, indoors." },
    paragraphs: [
      "My background is landscape photography: waiting for the right light, reading a scene, getting the detail right in the edit. I bring the same patience to every home I photograph.",
      "[A line or two in your own words: why property, and what you want agents and homeowners to know about working with you.]",
    ],
    image: { ...media.garden, caption: "Evening light" },
  },
  values: {
    headline: { lead: "What you can", accent: "count on." },
    items: [
      { title: "Light first", text: "Shoots are timed for the best light each room and elevation gets." },
      {
        title: "Honest edits",
        text: "Polished, never misleading. Buyers should recognise the home when they walk in.",
      },
      { title: "Easy to work with", text: "Clear prices, flexible times and quick replies by message or email." },
    ],
  },
  cta: { headline: { lead: "Let's photograph", accent: "your next listing." } } satisfies Cta,
  metaDescription:
    "Meet Jamie Doe, the independent property photographer behind Solent. Local, flexible and detail-led photography for estate agents and homeowners in Hampshire.",
};

export const contactCopy = {
  eyebrow: "Contact",
  headline: { lead: "Enquire about", accent: "a shoot." },
  intro:
    "A few details is all it takes. We'll reply with availability and a clear price, usually within [X] hours.",
  image: media.livingRoom,
  metaDescription:
    "Enquire about property photography in Fareham, Gosport, Portsmouth or Southampton. Share the property details and dates that suit.",
};

export const journalCopy = {
  eyebrow: "Journal",
  headline: { lead: "Notes on selling", accent: "with pictures." },
  intro:
    "Practical advice for homeowners and agents: preparing for a shoot, choosing images, and what buyers notice first.",
  cta: { headline: { lead: "Skip the reading.", accent: "Book the shoot." } } satisfies Cta,
  metaDescription:
    "Advice on property photography for Hampshire homeowners and estate agents: preparing for a shoot, twilight photography, editing and choosing listing images.",
};
