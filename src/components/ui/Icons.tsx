import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 16, children, viewBox = "0 0 16 16", strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2 8h12M9 3l5 5-5 5" />
    </Icon>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 8H2M7 3L2 8l5 5" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon size={22} viewBox="0 0 22 22" {...props}>
      <path d="M3 8h16M3 14h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon size={20} viewBox="0 0 20 20" strokeWidth={1.6} {...props}>
      <path d="M4 4l12 12M16 4L4 16" />
    </Icon>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Icon size={18} viewBox="0 0 18 18" strokeWidth={1.6} {...props}>
      <path d="M9 2v10M4.5 7.5L9 12l4.5-4.5M3 15.5h12" />
    </Icon>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <Icon size={18} viewBox="0 0 18 18" {...props}>
      <path d="M2 7V2h5M16 7V2h-5M2 11v5h5M16 11v5h-5" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon size={18} viewBox="0 0 18 18" strokeWidth={1.6} {...props}>
      <path d="M3 9.5l4 4L15 5" />
    </Icon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon size={20} viewBox="0 0 20 20" {...props}>
      <path d="M10 3v14M3 10h14" />
    </Icon>
  );
}
