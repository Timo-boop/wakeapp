"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const baseClasses =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-pearl-gradient text-bg shadow-pearl-glow hover:-translate-y-px active:translate-y-0",
  secondary:
    "bg-surface text-ink border border-line hover:bg-surface-raised hover:border-line-bright",
  ghost: "text-ink-muted hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-7 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type Props = ButtonProps | AnchorProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function Button(
    { variant = "primary", size = "md", className, children, ...rest },
    ref,
  ) {
    const classes = cn(baseClasses, sizes[size], variants[variant], className);

    if ("href" in rest && rest.href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);
