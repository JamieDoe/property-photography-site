import { media } from "../media";
import type { Project } from "../types";

/*
 * Portfolio projects, in display order.
 *
 * PLACEHOLDER: all six projects are samples built from stock photography so
 * the portfolio reads like a real site during development. Replace them with
 * real shoots (and real photography) before launch. To add a project, copy an
 * entry, give it a unique slug and fill in the fields; the portfolio, project
 * page, sitemap and location pages pick it up automatically.
 */

export const projects: Project[] = [
  {
    slug: "detached-family-home-locks-heath",
    title: "Detached family home",
    headline: { lead: "Detached", accent: "family home." },
    area: "fareham",
    place: "Locks Heath",
    propertyType: "Four-bedroom detached",
    categories: ["houses", "twilight"],
    shoot: ["Interiors", "Exteriors", "Twilight"],
    package: "premium",
    description:
      "A four-bedroom detached home on a quiet close. Interiors were shot through the afternoon as the light moved round to the kitchen, finishing at dusk for a twilight exterior to lead the listing.",
    cover: { ...media.twilightExterior, caption: "Twilight exterior" },
    highlights: [
      { ...media.kitchen, caption: "Kitchen · late afternoon light" },
      { ...media.interiorDetail, caption: "Detail" },
    ],
    gallery: [
      { ...media.kitchen, caption: "Kitchen" },
      { ...media.livingRoom, caption: "Living room" },
      { ...media.interiorDetail, caption: "Reading corner" },
      {
        ...media.bedroom,
        caption: "Principal bedroom",
        note: "Shot in soft morning light, windows balanced so the view reads.",
      },
      { ...media.bathroom, caption: "Ensuite" },
      { ...media.staircase, caption: "Hallway & stairs" },
      { ...media.frontElevation, caption: "Front elevation" },
      { ...media.garden, caption: "Rear garden · golden hour" },
    ],
    testimonialId: "home-01",
    featured: true,
    placeholder: true,
  },
  {
    slug: "victorian-terrace-southsea",
    title: "Victorian terrace, restored",
    headline: { lead: "Victorian terrace,", accent: "restored." },
    area: "portsmouth",
    place: "Southsea",
    propertyType: "Three-bedroom Victorian terrace",
    categories: ["houses"],
    shoot: ["Interiors", "Details"],
    package: "standard",
    description:
      "A restored mid-terrace with original details throughout. Compact rooms were composed from the corners and doorways so they read as generous without any distortion, with close details to show the quality of the restoration.",
    cover: { ...media.livingRoom, caption: "Living room" },
    highlights: [{ ...media.livingRoom, caption: "Living room · window light" }],
    gallery: [
      { ...media.livingRoom, caption: "Living room" },
      { ...media.interiorDetail, caption: "Bay window detail" },
      { ...media.kitchen, caption: "Kitchen" },
      {
        ...media.bedroom,
        caption: "Front bedroom",
        note: "Curtains open and lamps off: the room lit by the window alone.",
      },
      { ...media.bathroom, caption: "Bathroom" },
      { ...media.staircase, caption: "Stairs" },
    ],
    featured: true,
    placeholder: true,
  },
  {
    slug: "coastal-new-build-alverstoke",
    title: "Coastal new build",
    headline: { lead: "Coastal", accent: "new build." },
    area: "gosport",
    place: "Alverstoke, Gosport",
    propertyType: "Four-bedroom new build",
    categories: ["new-builds", "houses"],
    shoot: ["Interiors", "Exteriors", "Garden"],
    package: "standard",
    description:
      "A newly finished home a short walk from the shore. Sparse, freshly staged rooms were given warmth with careful timing, and the garden was saved for the last of the evening sun.",
    cover: { ...media.garden, caption: "Garden" },
    highlights: [
      { ...media.bedroom, caption: "Principal bedroom" },
      { ...media.bathroom, caption: "Bathroom · natural light" },
      { ...media.garden, caption: "Garden · evening" },
    ],
    gallery: [
      { ...media.garden, caption: "Rear elevation & garden" },
      { ...media.staircase, caption: "Open-plan living" },
      { ...media.kitchen, caption: "Kitchen" },
      { ...media.bedroom, caption: "Principal bedroom", note: "Full-height doors framed to lead the eye outside." },
      { ...media.bathroom, caption: "Family bathroom" },
      { ...media.interiorDetail, caption: "Landing" },
      { ...media.livingRoom, caption: "Sitting room" },
      { ...media.frontElevation, caption: "Front elevation" },
    ],
    featured: true,
    placeholder: true,
  },
  {
    slug: "harbour-view-apartment-gunwharf",
    title: "Harbour-view apartment",
    headline: { lead: "Harbour-view", accent: "apartment." },
    area: "portsmouth",
    place: "Gunwharf Quays, Portsmouth",
    propertyType: "Two-bedroom apartment",
    categories: ["apartments"],
    shoot: ["Interiors", "Views"],
    package: "essential",
    description:
      "An upper-floor apartment where the view is the selling point. Each window was exposed so the harbour outside reads as clearly as the room inside, without the flat, grey look of an over-processed image.",
    cover: { ...media.kitchen, caption: "Open-plan kitchen" },
    highlights: [{ ...media.kitchen, caption: "Open-plan kitchen" }],
    gallery: [
      { ...media.kitchen, caption: "Open-plan kitchen" },
      { ...media.livingRoom, caption: "Living area" },
      { ...media.interiorDetail, caption: "Detail" },
      { ...media.bedroom, caption: "Bedroom", note: "Balanced for the view without losing the room." },
      { ...media.bathroom, caption: "Bathroom" },
    ],
    placeholder: true,
  },
  {
    slug: "semi-detached-stubbington",
    title: "Semi-detached home",
    headline: { lead: "Semi-detached,", accent: "Stubbington." },
    area: "fareham",
    place: "Stubbington",
    propertyType: "Three-bedroom semi-detached",
    categories: ["houses"],
    shoot: ["Interiors", "Exteriors", "Garden"],
    package: "standard",
    description:
      "A well-kept family semi close to the coast. A straightforward, consistent set: every room shot from its best corner, the garden photographed in full sun, and a front elevation that reads well as a portal thumbnail.",
    cover: { ...media.bedroom, caption: "Bedroom" },
    highlights: [{ ...media.bedroom, caption: "Bedroom" }],
    gallery: [
      { ...media.livingRoom, caption: "Living room" },
      { ...media.kitchen, caption: "Kitchen" },
      { ...media.interiorDetail, caption: "Dining corner" },
      { ...media.bedroom, caption: "Principal bedroom" },
      { ...media.bathroom, caption: "Bathroom" },
      { ...media.frontElevation, caption: "Front elevation" },
      { ...media.garden, caption: "Garden" },
    ],
    placeholder: true,
  },
  {
    slug: "townhouse-ocean-village",
    title: "Townhouse, Ocean Village",
    headline: { lead: "Townhouse,", accent: "Ocean Village." },
    area: "southampton",
    place: "Ocean Village, Southampton",
    propertyType: "Three-storey townhouse",
    categories: ["houses", "twilight"],
    shoot: ["Interiors", "Exteriors", "Twilight"],
    package: "premium",
    description:
      "A contemporary three-storey townhouse near the marina. Strong architecture outside called for a clean daylight elevation and a twilight frame; inside, the open stair and glazing tie the three floors together.",
    cover: { ...media.frontElevation, caption: "Front elevation" },
    highlights: [{ ...media.frontElevation, caption: "Front elevation" }],
    gallery: [
      { ...media.frontElevation, caption: "Front elevation" },
      { ...media.staircase, caption: "Stair & glazing" },
      { ...media.livingRoom, caption: "Living room" },
      { ...media.kitchen, caption: "Kitchen", note: "Pendants on, daylight balanced." },
      { ...media.bedroom, caption: "Bedroom" },
      { ...media.bathroom, caption: "Bathroom" },
      { ...media.interiorDetail, caption: "Detail" },
      { ...media.twilightExterior, caption: "Twilight" },
    ],
    placeholder: true,
  },
];
