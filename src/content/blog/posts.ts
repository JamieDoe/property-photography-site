import { media } from "../media";
import type { Post } from "../types";

/*
 * Journal posts, newest first.
 *
 * DRAFT: these posts are written as starting points in the studio's voice.
 * Review, edit and re-date them before launch. Images are PLACEHOLDERS.
 *
 * Body blocks support paragraphs, h2, lists, quotes and images. Inline links
 * use Markdown syntax: [label](/path).
 */

export const posts: Post[] = [
  {
    slug: "how-to-prepare-your-home-for-a-photo-shoot",
    title: "How to prepare your home for a photo shoot",
    headline: { lead: "How to prepare your home for a", accent: "photo shoot." },
    excerpt: "A room-by-room checklist that makes the biggest difference on camera, in about an hour.",
    category: "preparing",
    publishedAt: "2026-09-08",
    image: media.livingRoom,
    featured: true,
    body: [
      {
        type: "p",
        text: "The best listing photographs start before the camera comes out. An hour of preparation does more for the final images than anything that happens in the edit, and almost all of it is free: clearing, tidying and letting the light in.",
      },
      {
        type: "p",
        text: "Work through the list below the day before, then do a final five-minute pass on the morning of the shoot.",
      },
      { type: "h2", text: "Everywhere" },
      {
        type: "ul",
        items: [
          "Open every curtain and blind fully. Daylight is the most flattering light a home has.",
          "Switch on lamps and ceiling lights, and replace any blown bulbs so the colours match.",
          "Clear surfaces back to two or three deliberate objects. Less really is more on camera.",
          "Hide cables, chargers, remote controls, bins and pet bowls.",
          "Put away family photos and anything with names or addresses on it.",
        ],
      },
      { type: "h2", text: "Kitchen" },
      {
        type: "ul",
        items: [
          "Clear the worktops completely, then add back one or two things: a bowl of fruit, a plant, a chopping board.",
          "Remove magnets, notes and calendars from the fridge.",
          "Put tea towels, washing-up liquid and sponges out of sight.",
        ],
      },
      { type: "h2", text: "Living spaces and bedrooms" },
      {
        type: "ul",
        items: [
          "Plump cushions and straighten throws; fewer cushions usually looks better.",
          "Make beds with plain, pressed bedding if you have it.",
          "Clear bedside tables and the floor, including shoes and laundry baskets.",
        ],
      },
      { type: "h2", text: "Bathrooms" },
      {
        type: "ul",
        items: [
          "Put toilet seats down and remove bath mats.",
          "Clear toiletries from the bath, shower and basin.",
          "Hang one set of fresh, matching towels.",
        ],
      },
      { type: "h2", text: "Outside" },
      {
        type: "ul",
        items: [
          "Move cars off the drive and away from the front of the house.",
          "Put wheelie bins out of sight.",
          "Mow the lawn a day or two before, and sweep paths and patios.",
          "Tidy away hoses, toys and garden tools, and set out any garden furniture.",
        ],
      },
      {
        type: "quote",
        text: "If something wouldn't be in a show home, it probably shouldn't be in the photograph.",
      },
      { type: "h2", text: "On the day" },
      {
        type: "p",
        text: "You don't need to be there, but it helps to be on hand at the start to agree which rooms matter most. We'll work through the house in the order the light suits, moving small things where needed and putting them back afterwards.",
      },
      {
        type: "p",
        text: "When you book, you'll get a one-page version of this list to keep. Any questions, just [get in touch](/contact).",
      },
    ],
  },
  {
    slug: "when-is-a-twilight-shoot-worth-it",
    title: "When is a twilight shoot worth it?",
    excerpt: "Twilight images stop the scroll, but they don't suit every property. Here's how to decide.",
    category: "agents",
    publishedAt: "2026-08-18",
    image: media.twilightExterior,
    body: [
      {
        type: "p",
        text: "A twilight exterior, shot in the short window after sunset when the sky is still blue and the house lights are on, is one of the most eye-catching images a listing can have. It's also an extra visit at a specific time, so it's worth knowing when it earns its place.",
      },
      { type: "h2", text: "Where twilight works best" },
      {
        type: "ul",
        items: [
          "Homes with lots of glazing, where the interior glows through the windows.",
          "Contemporary and architect-designed houses with strong shapes.",
          "Properties with outdoor lighting, a lit garden or a pool.",
          "Listings going up against similar homes, where a lead image needs to stand out on the portals.",
        ],
      },
      { type: "h2", text: "Where it adds less" },
      {
        type: "p",
        text: "Flats without their own exterior, homes facing a busy road, or houses with very few front windows rarely justify it. In those cases, a well-timed daylight elevation is the better use of the budget.",
      },
      { type: "h2", text: "Timing" },
      {
        type: "p",
        text: "The useful light lasts about twenty to thirty minutes. In a Hampshire winter that can be before 5pm; in June it's after 9.30pm. We'll suggest a date with a clear forecast and fit the interiors around it where possible.",
      },
      {
        type: "p",
        text: "Twilight is included in the [Premium package](/pricing) and available as an extra on the others.",
      },
    ],
  },
  {
    slug: "what-editing-should-and-shouldnt-do",
    title: "Straight lines, true colour: what editing should and shouldn't do",
    excerpt: "Good editing makes a home look its best on a good day. It should never make it look like somewhere else.",
    category: "editing",
    publishedAt: "2026-07-28",
    image: media.bathroom,
    body: [
      {
        type: "p",
        text: "Every image we deliver is edited by hand. The aim is simple: the photographs should look like the home does on a good day, and a buyer should recognise it the moment they walk through the door.",
      },
      { type: "h2", text: "What editing should do" },
      {
        type: "ul",
        items: [
          "Straighten verticals, so walls and door frames stand upright instead of leaning in.",
          "Balance windows against the room, so you can see the view and the interior at the same time.",
          "Correct colour, removing the orange cast from bulbs and the blue cast from shade.",
          "Remove small, temporary distractions: a cable, a smudge on a mirror, a sensor light.",
        ],
      },
      { type: "h2", text: "What it shouldn't do" },
      {
        type: "ul",
        items: [
          "Remove permanent features, such as a pylon, a neighbouring extension or damp.",
          "Replace a grey sky with blue sunshine in a way that misrepresents the property.",
          "Stretch rooms with extreme wide-angle lenses so they feel bigger than they are.",
          "Push colour and contrast until the home looks like a render.",
        ],
      },
      {
        type: "p",
        text: "Honest editing isn't only good practice. Property marketing must not mislead buyers, and photographs are part of that. Polished and truthful are not in competition.",
      },
    ],
  },
  {
    slug: "choosing-the-lead-image-for-your-listing",
    title: "Choosing the lead image for your listing",
    excerpt: "The first photo decides whether anyone sees the other twenty. How to pick it.",
    category: "agents",
    publishedAt: "2026-07-07",
    image: media.kitchen,
    body: [
      {
        type: "p",
        text: "On the portals, your lead image is shown as a small thumbnail in a long list. It has one job: to make someone stop and tap. Everything else in the gallery depends on it.",
      },
      { type: "h2", text: "Start with the front, but not always" },
      {
        type: "p",
        text: "Buyers expect to see the outside first, and a strong front elevation usually earns the slot. But if the kitchen-diner is the reason someone will buy the house, or the garden is exceptional, lead with that and put the front second.",
      },
      { type: "h2", text: "Check it small" },
      {
        type: "p",
        text: "View your shortlist at thumbnail size on a phone. Simple compositions with a clear subject and good contrast hold up; busy, detailed images turn to noise.",
      },
      { type: "h2", text: "Order the rest like a viewing" },
      {
        type: "ol",
        items: [
          "Lead image",
          "Front of the house",
          "Main living spaces and kitchen",
          "Bedrooms and bathrooms",
          "Garden and outside space",
          "Details and extras",
        ],
      },
      {
        type: "p",
        text: "We'll flag our suggested lead image in every gallery, so you have a starting point.",
      },
    ],
  },
  {
    slug: "photographing-smaller-homes-and-flats",
    title: "Photographing smaller homes and flats so they feel generous",
    excerpt: "How to show space honestly in compact homes, without the stretched look of an ultra-wide lens.",
    category: "preparing",
    publishedAt: "2026-06-16",
    image: media.bedroom,
    body: [
      {
        type: "p",
        text: "Smaller homes are where photography makes the biggest difference, and where it's easiest to get wrong. An ultra-wide lens makes a box room look like a ballroom in the photos, and then disappoints on the viewing.",
      },
      { type: "h2", text: "How we approach compact rooms" },
      {
        type: "ul",
        items: [
          "Shoot from doorways and corners at around chest height, which is how people actually see a room.",
          "Use a moderate wide angle and let the composition, not the lens, do the work.",
          "Show how rooms connect, such as a kitchen seen from the living area, so buyers understand the layout.",
          "Lean on natural light to make the space feel open.",
        ],
      },
      { type: "h2", text: "What you can do beforehand" },
      {
        type: "ul",
        items: [
          "Remove one piece of furniture from each room if you can. Floor space reads as size.",
          "Clear the floor completely: bags, shoes, baskets.",
          "Keep doors open between rooms so the eye travels through.",
          "Use matching, light-coloured bedding and towels.",
        ],
      },
      {
        type: "p",
        text: "The [Essential package](/pricing) is designed for flats and smaller homes.",
      },
    ],
  },
  {
    slug: "getting-the-garden-camera-ready",
    title: "Getting the garden camera-ready",
    excerpt: "Five small jobs that make an outside space look its best, and why timing matters most.",
    category: "preparing",
    publishedAt: "2026-05-26",
    image: media.garden,
    body: [
      {
        type: "p",
        text: "For many buyers, the garden is the deciding factor. The good news is that it rarely needs much work to photograph well. Timing does most of it.",
      },
      { type: "h2", text: "Five jobs for the week before" },
      {
        type: "ol",
        items: [
          "Mow the lawn two days before, so it has time to recover and look even.",
          "Edge borders and clear leaves and weeds from paths.",
          "Sweep and, if needed, jet-wash patios and decking.",
          "Put away hoses, toys, tools and bins.",
          "Set out garden furniture as if you're about to use it.",
        ],
      },
      { type: "h2", text: "Why timing matters" },
      {
        type: "p",
        text: "A garden in full sun looks twice the size of the same garden in shade. We check which way it faces when you book and plan the shoot so the garden is photographed at its best time of day, even if that means starting outside or finishing there.",
      },
    ],
  },
  {
    slug: "photographing-homes-along-the-solent-coast",
    title: "Photographing homes along the Solent coast",
    excerpt: "Sea views, bright skies and salty windows: what's different about shooting by the water.",
    category: "local",
    publishedAt: "2026-05-05",
    image: media.frontElevation,
    body: [
      {
        type: "p",
        text: "From Southsea to Lee-on-the-Solent and Hill Head, homes near the water have a selling point that inland homes don't. They also bring a few challenges of their own.",
      },
      { type: "h2", text: "Getting the view into the picture" },
      {
        type: "p",
        text: "A bright sea and sky outside a relatively dark room is the hardest exposure in property photography. Shoot for the room and the window turns white; shoot for the view and the room goes dark. We take several exposures and blend them by hand, so the view reads naturally without the grey, over-processed look.",
      },
      { type: "h2", text: "Clean glass matters more" },
      {
        type: "p",
        text: "Salt spray leaves a film on windows that shows up in photographs, especially towards the light. A quick clean of the windows that face the water makes a noticeable difference.",
      },
      { type: "h2", text: "Watch the weather" },
      {
        type: "p",
        text: "Coastal weather changes quickly. Interiors can go ahead in most conditions, but for a sea view we'll keep an eye on the forecast and, where possible, schedule the exterior and view shots for the brightest part of the day.",
      },
      {
        type: "p",
        text: "See the areas we cover in [Gosport](/areas/gosport), [Portsmouth](/areas/portsmouth) and [Fareham](/areas/fareham).",
      },
    ],
  },
];
