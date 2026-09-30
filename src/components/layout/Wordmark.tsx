import { site } from "@/content/site";

type WordmarkProps = {
  /** Show the "Property Photography" descriptor under the name. */
  descriptor?: boolean;
  className?: string;
};

export function Wordmark({ descriptor = true, className = "" }: WordmarkProps) {
  return (
    <span className={`flex flex-col gap-[5px] ${className}`}>
      <span className="wordmark text-[17px] uppercase lg:text-[21px]">{site.name}</span>
      {descriptor && (
        <span className="text-[8.5px] font-semibold uppercase leading-none tracking-[0.3em] opacity-85 lg:text-[9.5px]">
          {site.descriptor}
        </span>
      )}
    </span>
  );
}
