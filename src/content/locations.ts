import { media } from "./media";
import type { Location, LocationSlug } from "./types";

/*
 * Service areas. Each entry drives an /areas/[slug] page, the areas index,
 * homepage rows, footer links and local structured data.
 *
 * Keep copy genuinely local and useful. Avoid duplicating paragraphs between
 * towns. The hero/card images are PLACEHOLDERS: replace with photographs of
 * homes shot in each area.
 */

export const locations: Location[] = [
  {
    slug: "fareham",
    name: "Fareham",
    headline: { lead: "Property photography", accent: "in Fareham." },
    intro:
      "Local, flexible and a few minutes away. Interiors, exteriors and twilight for homes across the borough.",
    coverageHeadline: { lead: "From the harbour", accent: "to the Hamble." },
    coverage: [
      "Fareham borough runs from the top of Portsmouth Harbour at Portchester to the River Hamble at Warsash, and its homes vary as much as its geography: Tudor and Georgian cottages in Titchfield, bungalows and family houses along the coast at Hill Head and Stubbington, and the large estates of Locks Heath, Park Gate and Sarisbury Green.",
      "Buyers here are often families moving for schools, space and a garden, so that's what the photographs need to show: a kitchen that works, bedrooms that fit a family, and a rear garden shot while the sun is on it.",
    ],
    neighbourhoods: [
      "Fareham town",
      "Titchfield",
      "Stubbington",
      "Hill Head",
      "Portchester",
      "Locks Heath",
      "Park Gate",
      "Sarisbury Green",
      "Warsash",
      "Whiteley",
      "Funtley",
      "Welborne",
    ],
    postcodes: ["PO14", "PO15", "PO16", "PO17", "SO31"],
    notes: [
      {
        title: "Gardens sell the Western Wards",
        text: "In Locks Heath, Park Gate and Sarisbury, the rear garden is often the deciding photo. We check which way it faces and time it for the sun.",
      },
      {
        title: "Period homes in Titchfield",
        text: "Low ceilings, small windows and listed features need a patient, honest approach: natural light, true colour and no wide-angle stretching.",
      },
      {
        title: "New homes at Whiteley and Welborne",
        text: "Freshly built and often sparsely furnished. Careful composition and a twilight exterior give new-build listings the warmth they can lack in daylight.",
      },
    ],
    hero: { ...media.frontElevation, caption: "Detached home · Titchfield" },
    card: media.frontElevation,
    highlights: ["Titchfield", "Stubbington", "Portchester", "Locks Heath"],
    nearby: ["gosport", "portsmouth", "southampton"],
    cta: { lead: "Selling in", accent: "Fareham?" },
    metaDescription:
      "Property photography in Fareham, Titchfield, Stubbington, Portchester, Locks Heath and Whiteley. Interior, exterior and twilight photography for estate agents and homeowners.",
  },
  {
    slug: "gosport",
    name: "Gosport",
    headline: { lead: "Property photography", accent: "in Gosport." },
    intro:
      "Across the harbour and down the peninsula. Interiors, exteriors and sea-view photography for homes throughout Gosport.",
    coverageHeadline: { lead: "From the ferry", accent: "to the shore." },
    coverage: [
      "Gosport sits on a peninsula between Portsmouth Harbour and the Solent. Its homes range from the Victorian and Edwardian villas of Alverstoke to seafront houses and flats along Lee-on-the-Solent, post-war terraces in Elson and Bridgemary, and waterfront apartments in former naval buildings at Royal Clarence Yard and Haslar.",
      "Many Gosport listings have something most of the area can't offer: a view of the water or across to the Isle of Wight. Getting that view to show in the photographs, rather than a blown-out white window, is most of the job.",
    ],
    neighbourhoods: [
      "Alverstoke",
      "Anglesey",
      "Lee-on-the-Solent",
      "Stokes Bay",
      "Elson",
      "Hardway",
      "Forton",
      "Bridgemary",
      "Rowner",
      "Holbrook",
      "Royal Clarence Yard",
      "Haslar",
    ],
    postcodes: ["PO12", "PO13"],
    notes: [
      {
        title: "Sea views that actually show",
        text: "Windows are exposed separately and blended by hand, so the Solent reads as clearly as the room it's seen from.",
      },
      {
        title: "Conversions and period villas",
        text: "Apartments in former naval buildings and Alverstoke's older villas both have character worth showing: high ceilings, original features and unusual layouts.",
      },
      {
        title: "Timed around the peninsula",
        text: "Traffic on and off the peninsula can be slow at peak times, so shoots are scheduled to avoid it and the day stays on time for you and your vendors.",
      },
    ],
    hero: { ...media.garden, caption: "Garden · evening" },
    card: media.garden,
    highlights: ["Alverstoke", "Lee-on-the-Solent", "Elson"],
    nearby: ["fareham", "portsmouth", "southampton"],
    cta: { lead: "Selling in", accent: "Gosport?" },
    metaDescription:
      "Property photography in Gosport, Alverstoke, Lee-on-the-Solent and Stokes Bay. Sea-view, interior and exterior photography for estate agents and homeowners.",
  },
  {
    slug: "portsmouth",
    name: "Portsmouth",
    headline: { lead: "Property photography", accent: "in Portsmouth." },
    intro:
      "Southsea terraces, harbour-side apartments and family homes on the mainland. Photography that makes every square metre count.",
    coverageHeadline: { lead: "From Southsea", accent: "to the hill." },
    coverage: [
      "Most of Portsmouth sits on Portsea Island, and much of it is Victorian and Edwardian terraced housing: bay-fronted family houses in Southsea, tightly packed streets around Fratton and North End, and many homes converted into flats. Old Portsmouth and Gunwharf Quays add period townhouses and modern apartments with harbour views, while Cosham, Drayton and Farlington offer larger family homes below Portsdown Hill.",
      "With so many streets built to similar plans, the photographs are what set one listing apart from the one next door. Compact rooms need to feel generous without looking stretched, and flats need their light and views shown honestly.",
    ],
    neighbourhoods: [
      "Southsea",
      "Old Portsmouth",
      "Gunwharf Quays",
      "Fratton",
      "North End",
      "Copnor",
      "Milton",
      "Eastney",
      "Hilsea",
      "Cosham",
      "Drayton",
      "Farlington",
    ],
    postcodes: ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6"],
    notes: [
      {
        title: "Terraces that feel generous",
        text: "Rooms composed from doorways and corners at a natural height, so buyers get a true sense of space without distortion.",
      },
      {
        title: "Lettings, turned around quickly",
        text: "For letting agents with student and professional lets: a quick, consistent set across every room, delivered fast to keep void periods short.",
      },
      {
        title: "Parking, sorted in advance",
        text: "Much of Southsea and central Portsmouth has resident permit parking, so access and parking are checked when the shoot is booked.",
      },
    ],
    hero: { ...media.livingRoom, caption: "Living room · Southsea" },
    card: media.livingRoom,
    highlights: ["Southsea", "Old Portsmouth", "Cosham", "Drayton"],
    nearby: ["gosport", "fareham", "southampton"],
    cta: { lead: "Selling in", accent: "Portsmouth?" },
    metaDescription:
      "Property photography in Portsmouth and Southsea, from Victorian terraces to Gunwharf apartments. Interior and exterior photography for estate agents, letting agents and homeowners.",
  },
  {
    slug: "southampton",
    name: "Southampton",
    headline: { lead: "Property photography", accent: "in Southampton." },
    intro:
      "Marina apartments, Edwardian family homes and city lets. Clear, consistent photography across Southampton.",
    coverageHeadline: { lead: "From the water", accent: "to the Common." },
    coverage: [
      "Southampton's homes are as varied as the city: modern apartments in the centre and around Ocean Village marina, large Edwardian and interwar houses in Bassett, Highfield and Upper Shirley, family semis in Shirley, Bitterne and Sholing, and a busy rental market around the universities in Portswood and Swaythling.",
      "For sales, that means photographs that do justice to period features and big gardens. For lettings, it means a reliable, consistent set delivered quickly so a property can be listed the same week.",
    ],
    neighbourhoods: [
      "City centre",
      "Ocean Village",
      "Bassett",
      "Highfield",
      "Portswood",
      "Swaythling",
      "Shirley",
      "Upper Shirley",
      "Freemantle",
      "Bitterne",
      "Sholing",
      "Woolston",
    ],
    postcodes: ["SO14", "SO15", "SO16", "SO17", "SO18", "SO19"],
    notes: [
      {
        title: "Apartments with a view",
        text: "Marina and city views balanced against the interior, with communal spaces and parking photographed where they help the listing.",
      },
      {
        title: "Period family homes",
        text: "In Bassett, Highfield and Upper Shirley, bay windows, fireplaces and long gardens get the time and light they deserve.",
      },
      {
        title: "Lettings on a schedule",
        text: "Student and professional lets photographed around tenants and changeovers, with consistent delivery for agents managing several properties.",
      },
    ],
    hero: { ...media.twilightExterior, caption: "Contemporary home · twilight" },
    card: media.twilightExterior,
    highlights: ["Ocean Village", "Bassett", "Portswood", "Shirley"],
    nearby: ["fareham", "portsmouth", "gosport"],
    cta: { lead: "Selling in", accent: "Southampton?" },
    metaDescription:
      "Property photography in Southampton, from Ocean Village apartments to family homes in Bassett, Highfield and Shirley. Photography for estate agents, letting agents and homeowners.",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}

export function locationHref(slug: LocationSlug): string {
  return `/areas/${slug}`;
}

export const areaNames = locations.map((location) => location.name);
