import type { Photo } from "./types";

/*
 * ─────────────────────────────────────────────────────────────────────────────
 *  PLACEHOLDER PHOTOGRAPHY
 *  These are stock images used during development only. Every one must be
 *  replaced with Jamie's own photography before launch.
 *
 *  To replace: add the new file under `media/` (e.g. `media/projects/...`),
 *  import it here or directly in the content module that uses it, and update
 *  the alt text to describe the new image.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import twilightExterior from "./media/placeholders/twilight-exterior.jpg";
import kitchen from "./media/placeholders/kitchen.jpg";
import livingRoom from "./media/placeholders/living-room.jpg";
import frontElevation from "./media/placeholders/front-elevation.jpg";
import garden from "./media/placeholders/garden.jpg";
import bathroom from "./media/placeholders/bathroom.jpg";
import bedroom from "./media/placeholders/bedroom.jpg";
import interiorDetail from "./media/placeholders/interior-detail.jpg";
import staircase from "./media/placeholders/staircase.jpg";

export const media = {
  twilightExterior: {
    src: twilightExterior,
    alt: "Contemporary two-storey house at dusk, warm interior light glowing through full-height glazing beneath a mature tree",
  },
  kitchen: {
    src: kitchen,
    alt: "Bright white shaker kitchen with marble splashback, brass handles, globe pendant lights and a central island with bar stools",
  },
  livingRoom: {
    src: livingRoom,
    alt: "Sunlit living room with a tan leather sofa, white armchairs, a round coffee table and a gallery wall of black-and-white prints",
  },
  frontElevation: {
    src: frontElevation,
    alt: "Front elevation of a modern timber- and black-clad house with a tall glazed entrance and gravel driveway",
  },
  garden: {
    src: garden,
    alt: "Large timber-framed house seen across a wide lawn in golden evening light",
  },
  bathroom: {
    src: bathroom,
    alt: "Bathroom with a frameless walk-in shower, double vanity, wood-effect floor and matt black fittings",
  },
  bedroom: {
    src: bedroom,
    alt: "Calm bedroom with a grey upholstered bed, soft linen and full-height doors opening onto trees",
  },
  interiorDetail: {
    src: interiorDetail,
    alt: "Interior detail of a mustard armchair, brass floor lamp and framed geometric print against a pale wall",
  },
  staircase: {
    src: staircase,
    alt: "Open-plan space with a floating timber staircase and full-height glazing onto a terrace and pool",
  },
} satisfies Record<string, Photo>;

export type MediaKey = keyof typeof media;
