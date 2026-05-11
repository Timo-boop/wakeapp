"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const languages = [
  { tag: "EN", name: "English" },
  { tag: "FR", name: "Français" },
  { tag: "中", name: "中文" },
  { tag: "हि", name: "हिन्दी" },
  { tag: "ES", name: "Español" },
  { tag: "ع", name: "العربية" },
];

export function International() {
  return (
    <section
      id="international"
      className="relative py-28 lg:py-36 border-t border-line/60"
    >
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[340px]"
          >
            <div className="relative aspect-[9/19] overflow-hidden rounded-[42px] border border-line bg-black shadow-elevated">
              <Image
                src="/screenshots/languages.png"
                alt="Language picker — English, Français, 中文, हिन्दी, Español, العربية"
                fill
                sizes="(max-width: 1024px) 100vw, 340px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="h-eyebrow mb-7"
            >
              <span className="h-px w-6 bg-ink-dim" /> Built for the world
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-section text-balance"
            >
              Six languages. More on the way.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lead mt-6"
            >
              Discipline isn&apos;t culturally specific. WakeApp ships in
              English, French, Chinese, Hindi, Spanish, and Arabic — with
              more being added throughout the beta.
            </motion.p>

            <div className="mt-9 grid grid-cols-3 sm:grid-cols-6 gap-2">
              {languages.map((l, i) => (
                <motion.div
                  key={l.tag}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.04 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-surface/50 py-3"
                >
                  <span className="font-mono text-[14px] text-ink">
                    {l.tag}
                  </span>
                  <span className="text-[10px] tracking-tight text-ink-dim">
                    {l.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
