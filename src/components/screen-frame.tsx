"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const sizes = {
  sm: "max-w-[240px]",
  md: "max-w-[300px]",
  lg: "max-w-[360px]",
};

/**
 * Wraps an actual app screenshot inside a minimal iPhone-style frame
 * so the screen reads as a real product image, not a stylized mockup.
 */
export function ScreenFrame({ src, alt, className, size = "md", priority }: Props) {
  return (
    <div className={cn("relative mx-auto w-full", sizes[size], className)}>
      <div className="relative rounded-[42px] border border-line bg-bg-elevated p-2.5 shadow-elevated">
        <div className="relative overflow-hidden rounded-[34px] border border-line/60 bg-black">
          <Image
            src={src}
            alt={alt}
            width={1206}
            height={2622}
            priority={priority}
            className="block h-auto w-full"
          />
        </div>
      </div>
      {/* ambient glow — neutral pearl */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(244,239,228,0.08), transparent 60%)",
        }}
      />
    </div>
  );
}

/**
 * Used inside bento cards where the screenshot is a compact thumbnail.
 * Top-cropped via aspect ratio + object-position so the most relevant
 * upper portion of the screen is shown.
 */
export function ScreenThumb({
  src,
  alt,
  className,
  ratio = "aspect-[9/12]",
  position = "top",
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  position?: "top" | "center" | "bottom";
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-line/60 bg-black",
        ratio,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          "object-cover",
          position === "top" && "object-top",
          position === "center" && "object-center",
          position === "bottom" && "object-bottom",
        )}
      />
    </div>
  );
}
