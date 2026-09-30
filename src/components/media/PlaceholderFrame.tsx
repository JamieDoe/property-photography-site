type PlaceholderFrameProps = {
  label: string;
  className?: string;
};

/**
 * A neutral frame for photography that has not been supplied yet (e.g. the
 * photographer's portrait). Never substitute stock imagery of people or
 * cameras here.
 */
export function PlaceholderFrame({ label, className = "" }: PlaceholderFrameProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`relative overflow-hidden bg-[linear-gradient(160deg,#d3c4ad_0%,#a08b70_55%,#6a5847_100%)] ${className}`}
    >
      <span className="eyebrow absolute bottom-4 left-4 flex items-center gap-2 text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,.35)] before:size-[7px] before:border before:border-current before:content-['']">
        {label}
      </span>
    </div>
  );
}
