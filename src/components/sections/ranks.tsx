"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ranks = [
  { name: "Panda", swatch: "#3F3F46" },
  { name: "Bronze", swatch: "#A2683A" },
  { name: "Silver", swatch: "#C8C8D0" },
  { name: "Gold", swatch: "#E8C77A" },
  { name: "Platinum", swatch: "#E0E6EE" },
  { name: "Diamond", swatch: "#9EE7F0" },
  { name: "Immortal", swatch: "#C56B6B" },
  { name: "Awakened", swatch: "#F4EFE4" },
];

export function Ranks() {
  return (
    <section
      id="ranks"
      className="relative py-28 lg:py-36 border-t border-line/60"
    >
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
              <span className="h-px w-6 bg-ink-dim" /> Rank progression
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-section text-balance"
            >
              Eight ranks. One direction.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lead mt-6"
            >
              Your rank reflects discipline, not points. It moves with
              consistency, focus, and the slow compounding of days you stay
              in command of yourself.
            </motion.p>

            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {ranks.map((r, i) => (
                <motion.li
                  key={r.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.04 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-surface/50 px-3 py-2.5"
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full ring-1 ring-white/15"
                    style={{ background: r.swatch }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                    {r.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[340px]"
          >
            <div className="relative aspect-[1206/2622] overflow-hidden rounded-[42px] border border-line bg-black shadow-elevated">
              <Image
                src="/screenshots/dashboard-rank.png"
                alt="Dashboard with Bronze rank pill visible at the top"
                fill
                sizes="(max-width: 1024px) 100vw, 340px"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
