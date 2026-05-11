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
  /** "hero" cards get a bigger layout with phone on the right */
  variant?: "hero" | "row";
};

const features: Feature[] = [
  {
    title: "Dashboard",
    body: "Your day, condensed: Wake Score, today's tasks, habits, events, and active modules — at a single glance.",
    src: "/screenshots/dashboard-carbon.png",
    alt: "WakeApp Dashboard showing Wake Score, tasks, habits, schedule, and screen time",
    span: "lg:col-span-3 lg:row-span-2",
    variant: "hero",
  },
  {
    title: "Wake Score",
    body: "A daily, honest reading of your focus, consistency, and execution — built entirely from your own behavior.",
    src: "/screenshots/control-center.png",
    alt: "Control Center showing Wake Score 40 and habit validation",
    span: "lg:col-span-3",
    variant: "row",
  },
  {
    title: "Tasks",
    body: "Fast, execution-first. Crucial, average, low — priorities, deadlines, and a history that never lies.",
    src: "/screenshots/tasks-history.png",
    alt: "Task history with priority tags",
    span: "lg:col-span-3",
    variant: "row",
  },
  {
    title: "Habits",
    body: "Track consistency daily. Recover quickly when you miss. Compound the days that stay.",
    src: "/screenshots/habits.png",
    alt: "Weekly habit tracker showing practice habit with M T W T F S S row",
    span: "lg:col-span-2",
    variant: "row",
  },
  {
    title: "Schedule",
    body: "See the focus windows hiding in your week. Real free time, important blocks, opportunities for deep work.",
    src: "/screenshots/schedule.png",
    alt: "Schedule view with Focus Opportunity and Week Overview",
    span: "lg:col-span-2",
    variant: "row",
  },
  {
    title: "Notes",
    body: "Lightweight, tagged, distraction-free. Capture thoughts without leaving your system.",
    src: "/screenshots/notes.png",
    alt: "Notes interface with tagged note",
    span: "lg:col-span-2",
    variant: "row",
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

        <div className="mt-16 grid gap-3 lg:grid-cols-6 lg:auto-rows-[300px]">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const isHero = feature.variant === "hero";
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
        isHero
          ? "flex flex-col"
          : "flex flex-col sm:flex-row sm:items-stretch",
        feature.span,
      )}
    >
      {/* Text */}
      <div
        className={cn(
          "relative p-6 lg:p-7",
          isHero ? "" : "sm:flex-1 sm:min-w-0 sm:flex sm:flex-col sm:justify-center",
        )}
      >
        <h3 className="h-card text-[20px]">{feature.title}</h3>
        <p
          className={cn(
            "mt-2 text-[14px] leading-[1.55] text-ink-muted text-pretty",
            isHero ? "max-w-[46ch]" : "max-w-[34ch]",
          )}
        >
          {feature.body}
        </p>
      </div>

      {/* Full screenshot in a mini phone frame */}
      <div
        className={cn(
          "relative",
          isHero
            ? "mt-2 flex-1 px-6 pb-6 lg:px-8 lg:pb-8"
            : "shrink-0 self-end p-5 sm:self-stretch sm:flex sm:items-end sm:py-5 sm:pr-5 sm:pl-0",
        )}
      >
        <div
          className={cn(
            "relative mx-auto aspect-[1206/2622] overflow-hidden rounded-[22px] border border-line/70 bg-black shadow-[0_18px_40px_-22px_rgba(0,0,0,0.7)]",
            isHero
              ? "h-full max-h-[420px] w-auto"
              : "h-[210px] w-auto sm:h-[230px]",
          )}
        >
          <Image
            src={feature.src}
            alt={feature.alt}
            fill
            sizes={isHero ? "(max-width: 1024px) 60vw, 360px" : "(max-width: 1024px) 40vw, 160px"}
            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </motion.article>
  );
}
