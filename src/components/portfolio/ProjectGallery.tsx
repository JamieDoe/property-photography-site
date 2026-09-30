import { ImageTrigger } from "@/components/lightbox/LightboxProvider";
import { Photo } from "@/components/media/Photo";
import type { CaptionedPhoto } from "@/content/types";

/*
 * Editorial layout for a project's images. Images are placed in order into a
 * repeating sequence of compositions, so any number of images produces a
 * varied, intentional page with no per-project layout work:
 *
 *   full → pair → feature (with note) → triple → bleed → …
 */

type Item = { photo: CaptionedPhoto; index: number };
type Block =
  | { kind: "full" | "feature" | "bleed"; items: [Item] }
  | { kind: "pair"; items: [Item, Item] }
  | { kind: "triple"; items: [Item, Item, Item] };

const SEQUENCE = ["full", "pair", "feature", "triple", "bleed"] as const;

function toBlocks(photos: CaptionedPhoto[]): Block[] {
  const items = photos.map((photo, index) => ({ photo, index }));
  const blocks: Block[] = [];
  let i = 0;
  let step = 0;
  while (i < items.length) {
    const kind = SEQUENCE[step % SEQUENCE.length];
    const left = items.length - i;
    if (kind === "triple" && left >= 3) {
      blocks.push({ kind, items: [items[i], items[i + 1], items[i + 2]] });
      i += 3;
    } else if ((kind === "pair" || kind === "triple") && left >= 2) {
      blocks.push({ kind: "pair", items: [items[i], items[i + 1]] });
      i += 2;
    } else {
      blocks.push({ kind: kind === "pair" || kind === "triple" ? "full" : kind, items: [items[i]] });
      i += 1;
    }
    step += 1;
  }
  return blocks;
}

function Frame({ item, className, sizes }: { item: Item; className: string; sizes: string }) {
  const label = `View ${item.photo.caption ?? "image"} full screen`;
  return (
    <div className={`relative ${className}`}>
      <Photo photo={item.photo} className="h-full w-full" sizes={sizes} />
      <ImageTrigger index={item.index} label={label} />
    </div>
  );
}

export function ProjectGallery({ photos }: { photos: CaptionedPhoto[] }) {
  const blocks = toBlocks(photos);

  return (
    <div className="flex flex-col gap-2 lg:gap-[120px]">
      {blocks.map((block, b) => {
        const key = `${block.kind}-${b}`;
        const afterFull = b > 0 && blocks[b - 1].kind === "full";
        switch (block.kind) {
          case "full":
            return (
              <figure key={key} className="lg:gutter">
                <Frame item={block.items[0]} className="h-[480px] lg:h-[min(57vw,960px)]" sizes="100vw" />
              </figure>
            );
          case "pair":
            return (
              <div key={key} className={afterFull ? "lg:-mt-24" : ""}>
                <div className="rail gap-2 lg:hidden" aria-label="Swipe for more images">
                  {block.items.map((item) => (
                    <Frame key={item.index} item={item} className="h-[400px] w-[82vw]" sizes="82vw" />
                  ))}
                </div>
                <div className="gutter hidden grid-cols-2 gap-6 lg:grid">
                  {block.items.map((item) => (
                    <Frame key={item.index} item={item} className="h-[min(44.4vw,760px)]" sizes="46vw" />
                  ))}
                </div>
              </div>
            );
          case "feature": {
            const item = block.items[0];
            return (
              <figure key={key} className="gutter mt-6 grid gap-y-2 lg:mt-0 lg:grid-cols-12 lg:items-end lg:gap-x-6">
                <Frame
                  item={item}
                  className="bleed-right h-[488px] lg:order-last lg:col-span-10 lg:h-[min(51.4vw,860px)]"
                  sizes="(min-width: 1024px) 85vw, 100vw"
                />
                {(item.photo.caption || item.photo.note) && (
                  <figcaption className="flex flex-col gap-2.5 pb-6 pt-1.5 lg:col-span-2 lg:pb-1.5">
                    {item.photo.caption && <span className="eyebrow hidden text-taupe lg:block">{item.photo.caption}</span>}
                    <span className="text-[13px] leading-normal text-taupe lg:text-sm">
                      <span className="lg:hidden">{item.photo.caption} — </span>
                      {item.photo.note}
                    </span>
                  </figcaption>
                )}
              </figure>
            );
          }
          case "triple":
            return (
              <div key={key} className="grid grid-cols-2 gap-2 lg:gutter lg:grid-cols-3 lg:items-start lg:gap-6">
                {block.items.map((item, n) => (
                  <Frame
                    key={item.index}
                    item={item}
                    className={`lg:aspect-[4/5] lg:h-auto ${n === 1 ? "lg:mt-24" : ""} ${
                      n === 2 ? "col-span-2 h-[340px] lg:col-span-1" : "h-[260px]"
                    }`}
                    sizes="(min-width: 1024px) 31vw, 50vw"
                  />
                ))}
              </div>
            );
          case "bleed":
            return (
              <figure key={key}>
                <Frame item={block.items[0]} className="h-[480px] lg:h-[min(58.3vw,980px)]" sizes="100vw" />
              </figure>
            );
        }
      })}
    </div>
  );
}
