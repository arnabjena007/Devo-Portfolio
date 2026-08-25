import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingAccentProps = {
  children: ReactNode;
  variant?: "wavy" | "double";
  className?: string;
  accentClassName?: string;
};

export const HeadingAccent = ({
  children,
  variant = "wavy",
  className,
  accentClassName,
}: HeadingAccentProps) => (
  <span className={cn("relative inline-block whitespace-nowrap", className)}>
    {children}
    {variant === "wavy" ? (
      <svg
        viewBox="0 0 140 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-1.5 left-[-2%] h-2.5 w-[104%] text-yellow-400",
          accentClassName,
        )}
      >
        <path
          d="M2 6c3.5-3 7-3 10.5 0S19.5 9 23 6s7-3 10.5 0S40.5 9 44 6s7-3 10.5 0S61.5 9 65 6s7-3 10.5 0S82.5 9 86 6s7-3 10.5 0S103.5 9 107 6s7-3 10.5 0S124.5 9 128 6s7-3 10.5 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
        viewBox="0 0 140 16"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-3 left-[-2%] h-3.5 w-[104%] text-sky-400",
          accentClassName,
        )}
      >
        <path d="M3 5C40 2 100 2 137 4" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M5 12c37-3 93-2 130-1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity=".78" />
      </svg>
    )}
  </span>
);
