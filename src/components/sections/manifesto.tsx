"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    label: "Attention",
    body: "is your most valuable resource. Modern apps compete for it. WakeApp helps you take it back.",
  },
  {
    label: "Discipline",
    body: "is not character — it's architecture. Build the system, and consistency follows.",
  },
  {
    label: "Simplicity",
    body: "over feature overload. The interface stays out of the way, so your life can come forward.",
  },
];

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative py-28 lg:py-40 border-t border-line/60"
    >
      <div className="container-narrow">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="h-eyebrow mb-10"
        >
          <span className="h-px w-6 bg-ink-dim" /> Manifesto
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-section text-balance max-w-[24ch]"
        >
          Most people don&apos;t fail from lack of ambition. They fail because
          the environment keeps pulling them away from what matters.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="lead mt-8 max-w-[58ch]"
        >
          WakeApp is built on three convictions. Attention is the most valuable
          thing you own. Discipline is something you design, not summon. And
          calm is what makes both possible.
        </motion.p>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-bg p-7 sm:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim">
                0{i + 1}
              </p>
              <h3 className="mt-4 text-[24px] leading-none font-semibold tracking-tight-2 text-ink">
                {p.label}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-ink-muted text-pretty">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
