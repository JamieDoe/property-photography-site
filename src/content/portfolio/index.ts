import type { LocationSlug, Project, ProjectCategory } from "../types";
import { projects } from "./projects";

export { projects };

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "houses", label: "Houses" },
  { id: "apartments", label: "Apartments" },
  { id: "new-builds", label: "New builds" },
  { id: "twilight", label: "Twilight" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((project) => project.featured).slice(0, limit);
}

export function getProjectsByArea(area: LocationSlug): Project[] {
  return projects.filter((project) => project.area === area);
}

/** The following project in portfolio order, wrapping to the first. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

/** Position in the portfolio, formatted "01". */
export function projectNumber(slug: string): string {
  return String(projects.findIndex((project) => project.slug === slug) + 1).padStart(2, "0");
}
