"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeKey = "carbon" | "amber" | "violet" | "cloud" | "desert";

type ThemeSpec = {
  key: ThemeKey;
  name: string;
  tagline: string;
  swatch: string;
  src: string;
  mood: "dark" | "light";
  description: string;
};

const themes: ThemeSpec[] = [
  {
    key: "carbon",
    name: "Carbon",
    tagline: "Ultra-clean graphite. Built for clarity.",
    swatch: "#0E0E10",
    src: "/screenshots/dashboard-carbon.png",
    mood: "dark",
    description:
      "The signature theme. Deep graphite, monastic focus, and the calm of an interface that gets out of the way.",
  },
  {
    key: "amber",
    name: "Amber",
    tagline: "Warm. Intense. Awake.",
    swatch: "#3A1F0A",
    src: "/screenshots/theme-amber.png",
    mood: "dark",
    description:
      "A warmer, more energetic dark mode — for the days you want to feel the heat of your own focus.",
  },
  {
    key: "violet",
    name: "Royal Violet",
    tagline: "Deep. Premium. Futuristic.",
    swatch: "#1A1230",
    src: "/screenshots/theme-violet.png",
    mood: "dark",
    description:
      "An elegant, almost cinematic interface — designed for nighttime intensity and uninterrupted deep work.",
  },
  {
    key: "cloud",
    name: "Cloud",
    tagline: "Calm. Light. Readable.",
    swatch: "#E2E6EE",
    src: "/screenshots/theme-cloud.png",
    mood: "light",
    description:
      "A soft gray-blue daylight mode — for those who think best with air, light, and quiet whitespace.",
  },
  {
    key: "desert",
    name: "Modern Desert",
    tagline: "Warm sand. Modern interiors.",
    swatch: "#D9CCAF",
    src: "/screenshots/theme-desert.png",
    mood: "light",
    description:
      "Inspired by warm interiors, raw paper, and modernist architecture. Grounded, calm, and tactile.",
  },
];

export function Themes() {
  const [active, setActive] = useState<ThemeKey>("carbon");
  const theme = themes.find((t) => t.key === active)!;

  return (
    <section
      id="themes"
      className="relative py-28 lg:py-36 border-t border-line/60"
    >
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="h-eyebrow mb-7"
          >
            <span className="h-px w-6 bg-ink-dim" /> Five worlds
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-section text-balance"
          >
            One you,
            <br className="hidden sm:block" /> five entirely different moods.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lead mt-6"
          >
            Switch the entire feel of WakeApp instantly — minimal, warm,
            futuristic, daylight, or grounded. Pick the world that matches
            who you want to be today.
          </motion.p>
        </div>

        <div className="mt-14 lg:mt-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* Real screenshot preview */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-3xl border border-line bg-bg-elevated p-3 sm:p-4 shadow-elevated">
              <div className="relative aspect-[9/16] sm:aspect-[10/16] overflow-hidden rounded-2xl bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme.key}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={theme.src}
                      alt={`${theme.name} theme — WakeApp dashboard`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${theme.key}-meta`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4 }}
                className="mt-6 flex items-baseline justify-between gap-6"
              >
                <div>
                  <h3 className="text-[26px] leading-none font-bold tracking-tight-2 text-ink">
                    {theme.name}
                  </h3>
                  <p className="mt-2 text-[14.5px] text-ink-muted max-w-[48ch] text-pretty">
                    {theme.description}
                  </p>
                </div>
                <span className="hidden sm:inline-flex shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                  {theme.mood}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Theme switcher */}
          <div className="order-1 lg:order-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-5 px-5 lg:mx-0 lg:px-0">
            {themes.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                aria-pressed={active === t.key}
                className={cn(
                  "group relative shrink-0 flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 lg:w-full",
                  active === t.key
                    ? "border-line-bright bg-surface-raised"
                    : "border-line bg-surface/40 hover:bg-surface hover:border-line-bright",
                )}
              >
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-line"
                  style={{ background: t.swatch }}
                />
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-ink">{t.name}</p>
                  <p className="hidden lg:block truncate text-[11px] text-ink-dim">
                    {t.tagline}
                  </p>
                </div>
                {active === t.key && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:grid ml-auto h-5 w-5 place-items-center rounded-full bg-ink/10 text-ink"
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
