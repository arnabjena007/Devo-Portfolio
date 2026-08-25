"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode, type Ref } from "react";
import { cn } from "@/lib/utils";

export type SoftUiButtonSize = "sm" | "md" | "lg";

type SoftUiButtonProps = {
  children: ReactNode;
  size?: SoftUiButtonSize;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
} & ComponentPropsWithoutRef<"button">;

const sizeClasses: Record<SoftUiButtonSize, string> = {
  sm: "h-9 gap-1.5 rounded-xl px-3.5 text-xs",
  md: "h-10 gap-2 rounded-xl px-4 text-sm",
  lg: "h-12 gap-2 rounded-2xl px-5 text-sm",
};

const buttonClasses =
  "inline-flex cursor-pointer items-center justify-center bg-neutral-100 font-sans font-semibold text-neutral-800 outline-none select-none shadow-[6px_6px_14px_rgba(0,0,0,0.08),-6px_-6px_14px_rgba(255,255,255,0.9)] transition-[box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-neutral-950 active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.08),inset_-4px_-4px_10px_rgba(255,255,255,0.85)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[6px_6px_14px_rgba(0,0,0,0.25),-6px_-6px_14px_rgba(255,255,255,0.04)]";

export const SoftUiButton = forwardRef<HTMLElement, SoftUiButtonProps>(
  ({ className, children, size = "md", type = "button", disabled, href, download, target, rel, ...props }, ref) => {
    const classNames = cn(buttonClasses, sizeClasses[size], className);

    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          download={download}
          target={target}
          rel={rel}
          className={classNames}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        data-slot="soft-ui-button"
        data-size={size}
        className={classNames}
        {...props}
      >
        {children}
      </button>
    );
  },
);

SoftUiButton.displayName = "SoftUiButton";
