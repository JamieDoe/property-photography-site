import Image from "next/image";
import type { Photo as PhotoContent } from "@/content/types";

type PhotoProps = {
  photo: PhotoContent;
  /** Sizing for the frame: a height or aspect-ratio utility, plus layout classes. */
  className?: string;
  /** Rendered width hints for the responsive srcset. Always set this. */
  sizes: string;
  /** Preload the LCP image. Use for one hero image per page only. */
  preload?: boolean;
  /** Scale slightly on hover of the nearest `.lift` ancestor. */
  imageClassName?: string;
  /** Override alt, e.g. "" when the image is decorative next to a text label. */
  alt?: string;
  position?: string;
};

/**
 * A cropped photograph that fills its frame. No borders, radii or filters:
 * the frame is sized by the caller, the image covers it.
 */
export function Photo({
  photo,
  className = "",
  sizes,
  preload,
  imageClassName = "",
  alt,
  position,
}: PhotoProps) {
  return (
    <div className={`relative overflow-hidden bg-[#8f8474] ${className}`}>
      <Image
        src={photo.src}
        alt={alt ?? photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        placeholder="blur"
        className={`object-cover ${imageClassName}`}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
