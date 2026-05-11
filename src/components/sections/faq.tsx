"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const items = [
  {
    q: "Is WakeApp free during the beta?",
    a: "Yes. The TestFlight beta is free and includes the full feature set — dashboard, tasks, habits, schedule, focus, screen time control, blackout mode, notes, and all themes.",
  },
  {
    q: "How do I get an invite?",
    a: "Request one through the form on this page. We're rolling out invites in waves to keep the beta calm and the feedback loop tight. Most people get access within a few days.",
  },
  {
    q: "Which devices does WakeApp support today?",
    a: "iPhone (iOS 17+) and iPad (iPadOS 17+). Android, macOS and Web are on the roadmap.",
  },
  {
    q: "Does WakeApp send my data to a server?",
    a: "Screen Time data stays on-device, processed via Apple's native Screen Time API — we never see what's blocked. Your tasks, habits and notes sync through end-to-end-encrypted cloud storage so you can use WakeApp across your devices.",
  },
  {
    q: "Can I bypass Focus Mode or Blackout if I really need to?",
    a: "Yes, but it's deliberately slow. Focus Mode resets your streak on early exit. Blackout requires a ten-minute wait. The friction is the feature.",
  },
  {
    q: "Will WakeApp work without the Screen Time controls?",
    a: "Yes. Screen Time is one module among several. You can use only the dashboard, tasks, habits and focus sessions if app-blocking isn't right for you.",
  },
  {
    q: "What's the difference with Notion, Things, or Opal?",
    a: "WakeApp combines what those apps split: planning, execution, habit tracking, distraction blocking, and a scoring system that ties it all together. One environment, one source of truth — calibrated for attention, not features.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-28 lg:py-36 border-t border-line/60"
    >
      <div className="container-narrow">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="h-eyebrow mb-7"
            >
              <span className="h-px w-6 bg-ink-dim" /> FAQ
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-section text-balance"
            >
              Common questions.
            </motion.h2>

            <p className="lead mt-6">
              The honest answers. If something&apos;s missing, reach out at{" "}
              <a
                href="mailto:hello@wakeapp.app"
                className="text-ink underline-offset-4 hover:underline"
              >
                hello@wakeapp.app
              </a>
              .
            </p>
          </div>

          <ul className="divide-y divide-line border-y border-line">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[16px] sm:text-[17px] font-medium text-ink">
                      {item.q}
                    </span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all ${
                        isOpen
                          ? "border-line-bright bg-surface text-ink"
                          : "border-line text-ink-muted group-hover:text-ink"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-[14.5px] leading-[1.65] text-ink-muted text-pretty">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
