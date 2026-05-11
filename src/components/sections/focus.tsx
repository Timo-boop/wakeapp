"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Bell, Eye, Lock, Phone } from "lucide-react";

const lockdowns = [
  { label: "Notifications muted", icon: Bell },
  { label: "Apps blocked at the OS level", icon: Phone },
  { label: "Social feeds frozen", icon: Eye },
  { label: "Request exit is intentionally slow", icon: Lock },
];

export function Focus() {
  return (
    <section
      id="focus"
      className="relative isolate py-28 lg:py-40 border-t border-line/60 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-black to-bg" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-mist blur-[140px]" />
      </div>

      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="h-eyebrow mb-7"
            >
              <span className="h-px w-6 bg-ink-dim" /> Focus Mode
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-section text-balance"
            >
              A room with no exits.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lead mt-6"
            >
              Focus Mode turns your phone into a single-purpose tool. Choose
              25, 45, or 90 minutes. Apps lock, notifications go silent, and
              the interface fades to one calm view. Early exit resets your
              streak — by design.
            </motion.p>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {lockdowns.map((d, i) => (
                <motion.li
                  key={d.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.05 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface/50 px-4 py-3"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/10 text-ink">
                    <d.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[13.5px] text-ink">{d.label}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Two real screenshots: Enter The Zone + Deep Focus Active */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid grid-cols-2 gap-3 sm:gap-4 mx-auto max-w-[640px]"
          >
            <FocusShot
              src="/screenshots/focus-zone.png"
              alt="Enter The Zone — choose 25, 45, or 90 minutes for deep focus"
              offset="up"
            />
            <FocusShot
              src="/screenshots/focus-active.png"
              alt="Deep Focus Active — 24:58 timer in deep work mode"
              offset="down"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FocusShot({
  src,
  alt,
  offset,
}: {
  src: string;
  alt: string;
  offset: "up" | "down";
}) {
  return (
    <div
      className={`relative aspect-[1206/2622] overflow-hidden rounded-[28px] border border-line bg-black shadow-elevated ${
        offset === "up" ? "lg:-translate-y-6" : "lg:translate-y-6"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 50vw, 320px"
        className="object-contain"
      />
    </div>
  );
}
