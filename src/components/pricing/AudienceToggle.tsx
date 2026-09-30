"use client";

import { useState } from "react";

type AudienceToggleProps = {
  notes: { homeowners: string; agents: string };
};

/** Homeowners / Estate agents switch that tailors the guidance under it. */
export function AudienceToggle({ notes }: AudienceToggleProps) {
  const [audience, setAudience] = useState<"homeowners" | "agents">("homeowners");
  const options = [
    { id: "homeowners", label: "Homeowners" },
    { id: "agents", label: "Estate agents" },
  ] as const;

  return (
    <>
      <div role="group" aria-label="Pricing for" className="flex border border-ink p-[3px]">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={audience === option.id}
            onClick={() => setAudience(option.id)}
            className="min-h-11 px-[22px] text-[15px] font-medium aria-pressed:bg-ink aria-pressed:font-semibold aria-pressed:text-limestone"
          >
            {option.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="body-copy text-[15px] lg:text-[15px]">
        {notes[audience]}
      </p>
    </>
  );
}
