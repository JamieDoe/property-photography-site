"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import type { Project, ProjectCategory } from "@/content/types";

type PortfolioGridProps = {
  projects: Project[];
  categories: { id: ProjectCategory; label: string }[];
};

type Filter = ProjectCategory | "all";

const number = (projects: Project[], project: Project) =>
  String(projects.indexOf(project) + 1).padStart(2, "0");

function Meta({
  project,
  n,
  stacked = false,
}: {
  project: Project;
  n: string;
  stacked?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-2 pt-4 lg:pt-5 ${
        stacked ? "" : "lg:flex-row lg:items-baseline lg:justify-between lg:gap-6"
      }`}
    >
      <div className="flex items-baseline gap-4 lg:gap-5">
        <span className="eyebrow text-taupe">{n}</span>
        <h2 className="card-title text-[22px] lg:text-[28px]">{project.title}</h2>
      </div>
      <span className="text-sm text-taupe lg:text-[15px]">
        {project.place} · {project.shoot.join(", ")}
      </span>
    </div>
  );
}

/**
 * Filterable editorial portfolio. Projects flow through a repeating set of
 * compositions (hero, offset pair, bleed, pair) so the page never reads as a
 * uniform grid, whatever the filter.
 */
export function PortfolioGrid({ projects, categories }: PortfolioGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter));
  const filters: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...categories];
  const available = filters.filter(
    (f) => f.id === "all" || projects.some((p) => p.categories.includes(f.id as ProjectCategory)),
  );

  // Group into repeating compositions of six: [hero] [pair] [bleed] [pair].
  const groups: Project[][] = [];
  for (let i = 0; i < visible.length; i += 6) {
    const chunk = visible.slice(i, i + 6);
    groups.push(chunk.slice(0, 1), chunk.slice(1, 3), chunk.slice(3, 4), chunk.slice(4, 6));
  }
  const compositions = groups.filter((group) => group.length > 0);

  return (
    <>
      <div className="gutter -mt-2 mb-10 flex flex-col gap-4 lg:mb-[72px] lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter projects" className="rail -mx-5 gap-2 px-5 md:-mx-10 md:px-10 lg:mx-0 lg:px-0">
          {available.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="eyebrow text-taupe" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="flex flex-col gap-14 pb-20 lg:gap-[130px] lg:pb-[140px]">
        {compositions.map((group, g) => {
          const kind = g % 4;
          const key = group.map((p) => p.slug).join("|");

          if (group.length === 1 && kind === 0) {
            const [p] = group;
            return (
              <Link key={key} href={`/portfolio/${p.slug}`} className="lift block lg:gutter">
                <Photo photo={p.cover} className="h-[440px] lg:h-[min(52.8vw,900px)]" sizes="100vw" />
                <div className="gutter lg:px-0">
                  <Meta project={p} n={number(projects, p)} />
                </div>
              </Link>
            );
          }

          if (group.length === 1) {
            const [p] = group;
            return (
              <Link
                key={key}
                href={`/portfolio/${p.slug}`}
                className="lift gutter flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-6"
              >
                <div className="flex flex-col gap-3.5 pt-4 lg:col-span-3 lg:pb-1.5 lg:pt-0">
                  <span className="eyebrow text-taupe">{number(projects, p)}</span>
                  <h2 className="card-title text-[22px] lg:text-[28px]">{p.title}</h2>
                  <span className="text-sm text-taupe lg:text-[15px]">{p.place}</span>
                </div>
                <Photo
                  photo={p.cover}
                  className="bleed-right -mr-5 h-[360px] md:-mr-10 lg:col-span-9 lg:h-[min(48.6vw,820px)]"
                  sizes="(min-width: 1024px) 78vw, 100vw"
                />
              </Link>
            );
          }

          const [a, b] = group;
          const offsetPair = kind === 1;
          return (
            <div
              key={key}
              className={`gutter grid gap-y-14 lg:grid-cols-12 lg:gap-x-6 ${offsetPair ? "lg:items-start" : "lg:items-end"}`}
            >
              <Link
                href={`/portfolio/${a.slug}`}
                className={`lift block ${offsetPair ? "lg:col-span-7" : "lg:col-span-4"}`}
              >
                <Photo
                  photo={a.cover}
                  className={offsetPair ? "h-[420px] lg:h-[min(47.2vw,800px)]" : "h-[440px] lg:h-[min(38.9vw,660px)]"}
                  sizes={offsetPair ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 32vw, 100vw"}
                />
                <Meta project={a} n={number(projects, a)} stacked={!offsetPair} />
              </Link>
              {b && (
                <Link
                  href={`/portfolio/${b.slug}`}
                  className={`lift block ${
                    offsetPair ? "lg:col-span-4 lg:col-start-9 lg:mt-[12.5vw]" : "lg:col-span-7 lg:col-start-6"
                  }`}
                >
                  <Photo
                    photo={b.cover}
                    className={offsetPair ? "h-[380px] lg:h-[min(38.9vw,660px)]" : "h-[300px] lg:h-[min(32vw,540px)]"}
                    sizes={offsetPair ? "(min-width: 1024px) 32vw, 100vw" : "(min-width: 1024px) 58vw, 100vw"}
                  />
                  <Meta project={b} n={number(projects, b)} stacked={offsetPair} />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
