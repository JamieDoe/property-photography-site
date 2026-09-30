import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { Headline } from "@/components/ui/Headline";
import { ArrowRight } from "@/components/ui/Icons";
import { projectNumber } from "@/content/portfolio";
import type { Headline as HeadlineContent, Project } from "@/content/types";

type SelectedWorkProps = {
  eyebrow: string;
  headline: HeadlineContent;
  intro: string;
  projects: Project[];
};

const projectHref = (project: Project) => `/portfolio/${project.slug}`;

function ProjectMeta({ project, showShoot = true }: { project: Project; showShoot?: boolean }) {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="eyebrow text-taupe">
        {projectNumber(project.slug)} — {project.place}
      </span>
      <h3 className="display text-card-lg tracking-[-0.035em] leading-none">{project.title}</h3>
      {showShoot && <p className="text-[15px] text-taupe">{project.shoot.join(" · ")}</p>}
    </div>
  );
}

/**
 * Homepage "Selected work": three editorial compositions on desktop, a
 * swipeable rail plus an image sequence on mobile.
 */
export function SelectedWork({ eyebrow, headline, intro, projects }: SelectedWorkProps) {
  const [first, second, third] = projects;

  return (
    <section aria-labelledby="selected-work" className="py-[84px] lg:py-[150px]">
      <div className="gutter mb-8 grid gap-y-6 lg:mb-20 lg:grid-cols-12 lg:items-end lg:gap-x-6">
        <div className="flex flex-col gap-5 lg:col-span-7 lg:gap-7">
          <p className="eyebrow text-taupe">{eyebrow}</p>
          <Headline id="selected-work" headline={headline} className="reveal text-section" />
        </div>
        <div className="hidden flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:flex">
          <p className="body-copy">{intro}</p>
          <Link href="/portfolio" className="text-link">
            View the portfolio <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Mobile: swipeable featured projects */}
      <div className="lg:hidden">
        <ul className="rail gap-3 px-5 scroll-px-5" aria-label="Featured projects">
          {projects.map((project) => (
            <li key={project.slug} className="w-[min(300px,78vw)]">
              <Link href={projectHref(project)} className="flex flex-col gap-3.5">
                <Photo photo={project.highlights[0] ?? project.cover} className="h-[400px]" sizes="300px" />
                <span className="flex flex-col gap-1.5">
                  <span className="eyebrow text-taupe">
                    {projectNumber(project.slug)} — {project.place.split(",")[0]}
                  </span>
                  <span className="text-[19px] font-semibold">{project.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {third && (
          <div className="mt-14 flex flex-col gap-3">
            <Photo photo={third.highlights[0] ?? third.cover} className="h-[480px]" sizes="100vw" />
            <div className="grid grid-cols-2 gap-3 px-5">
              {third.highlights[1] && <Photo photo={third.highlights[1]} className="h-[230px]" sizes="50vw" />}
              {first?.highlights[1] && (
                <Photo photo={first.highlights[1]} className="mt-10 h-[230px]" sizes="50vw" />
              )}
            </div>
          </div>
        )}
        <div className="mt-8 px-5">
          <Link href="/portfolio" className="text-link">
            View the portfolio <ArrowRight />
          </Link>
        </div>
      </div>

      {/* Desktop: editorial compositions */}
      <div className="gutter hidden flex-col gap-[140px] lg:flex">
        {first && (
          <Link
            href={projectHref(first)}
            aria-label={`${first.title}, ${first.place}`}
            className="lift reveal grid grid-cols-12 gap-x-6"
          >
            <Photo
              photo={first.highlights[0] ?? first.cover}
              className="col-span-8 h-[min(48.6vw,820px)]"
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
            <div className="col-span-4 flex flex-col justify-between">
              <div className="pt-1.5">
                <ProjectMeta project={first} />
              </div>
              {first.highlights[1] && (
                <Photo
                  photo={first.highlights[1]}
                  className="h-[min(30.5vw,520px)]"
                  sizes="(min-width: 1024px) 32vw, 100vw"
                />
              )}
            </div>
          </Link>
        )}

        {second && (
          <Link
            href={projectHref(second)}
            aria-label={`${second.title}, ${second.place}`}
            className="lift reveal grid grid-cols-12 items-end gap-x-6"
          >
            <div className="col-span-3 pb-2">
              <ProjectMeta project={second} />
            </div>
            <Photo
              photo={second.highlights[0] ?? second.cover}
              className="bleed-right col-span-9 h-[min(51.4vw,860px)]"
              sizes="(min-width: 1024px) 78vw, 100vw"
            />
          </Link>
        )}

        {third && (
          <Link
            href={projectHref(third)}
            aria-label={`${third.title}, ${third.place}`}
            className="lift reveal grid grid-cols-12 items-start gap-x-6"
          >
            <Photo
              photo={third.highlights[0] ?? third.cover}
              className="col-span-4 h-[min(41.7vw,700px)]"
              sizes="(min-width: 1024px) 32vw, 100vw"
            />
            {third.highlights[1] && (
              <Photo
                photo={third.highlights[1]}
                className="col-span-4 mt-[9.7vw] h-[min(32vw,540px)]"
                sizes="(min-width: 1024px) 32vw, 100vw"
              />
            )}
            <div className="col-span-4 flex flex-col gap-7">
              {third.highlights[2] && (
                <Photo
                  photo={third.highlights[2]}
                  className="h-[min(41.7vw,700px)]"
                  sizes="(min-width: 1024px) 32vw, 100vw"
                />
              )}
              <ProjectMeta project={third} showShoot={false} />
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
