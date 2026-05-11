"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Feature = {
  title: string;
  body: string;
  src: string;
  alt: string;
  span: string;
  /** which part of the screenshot to favor when cropping inside the card */
  focal?: "top" | "center" | "bottom";
};

const features: Feature[] = [
  {
    title: "Dashboard",
    body: "Your day, condensed: Wake Score, today's tasks, habits, events, and active modules — at a single glance.",
    src: "/screenshots/dashboard-carbon.png",
    alt: "WakeApp Dashboard showing Wake Score, tasks, habits, schedule, and screen time",
    span: "lg:col-span-3 lg:row-span-2",
    focal: "top",
  },
  {
    title: "Wake Score",
    body: "A daily, honest reading of your focus, consistency, and execution — built entirely from your own behavior.",
    src: "/screenshots/control-center.png",
    alt: "Control Center showing Wake Score 40 and habit validation",
    span: "lg:col-span-3",
    focal: "top",
  },
  {
    title: "Tasks",
    body: "Fast, execution-first. Crucial, average, low — priorities, deadlines, and a history that never lies.",
    src: "/screenshots/tasks-history.png",
    alt: "Task history with priority tags",
    span: "lg:col-span-3",
    focal: "top",
  },
  {
    title: "Habits",
    body: "Track consistency daily. Recover quickly when you miss. Compound the days that stay.",
    src: "/screenshots/habits.png",
    alt: "Weekly habit tracker showing practice habit with M T W T F S S row",
    span: "lg:col-span-2",
    focal: "top",
  },
  {
    title: "Schedule",
    body: "See the focus windows hiding in your week. Real free time, important blocks, opportunities for deep work.",
    src: "/screenshots/schedule.png",
    alt: "Schedule view with Focus Opportunity and Week Overview",
    span: "lg:col-span-2",
    focal: "top",
  },
  {
    title: "Notes",
    body: "Lightweight, tagged, distraction-free. Capture thoughts without leaving your system.",
    src: "/screenshots/notes.png",
    alt: "Notes interface with tagged note",
    span: "lg:col-span-2",
    focal: "top",
  },
];

export function Bento() {
  return (
    <section
      id="features"
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
            <span className="h-px w-6 bg-ink-dim" /> One system
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="h-section text-balance"
          >
            Everything that matters,
            <br className="hidden sm:block" /> in one calm environment.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lead mt-6"
          >
            Tasks, habits, calendar, focus, and screen time — replaced by a
            single, coherent control center designed around your attention,
            not the app&apos;s.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-3 lg:grid-cols-6 auto-rows-[280px] lg:auto-rows-[300px]">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const isBig = feature.span.includes("row-span-2");
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "card group relative col-span-1 sm:col-span-2 row-span-1 overflow-hidden",
        "transition-all duration-500 hover:border-line-bright",
        feature.span,
      )}
    >
      {/* Screenshot, top portion only */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          isBig ? "h-[58%]" : "h-[52%]",
        )}
      >
        <Image
          src={feature.src}
          alt={feature.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-cover transition-transform duration-700 group-hover:scale-[1.02]",
            feature.focal === "top" && "object-top",
            feature.focal === "center" && "object-center",
            feature.focal === "bottom" && "object-bottom",
            !feature.focal && "object-top",
          )}
        />
        {/* Soft bottom fade so text doesn't compete with the image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-surface" />
      </div>

      <div className="relative p-6 lg:p-7">
        <h3 className="h-card text-[20px]">{feature.title}</h3>
        <p className="mt-2 max-w-[42ch] text-[14px] leading-[1.55] text-ink-muted text-pretty">
          {feature.body}
        </p>
      </div>
    </motion.article>
  );
}
