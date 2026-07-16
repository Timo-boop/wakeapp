"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScreenFrame } from "@/components/screen-frame";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 sm:pt-40 lg:pt-44 pb-20 lg:pb-28"
    >
      {/* Atmospheric backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-mesh-carbon" />
        <div className="absolute left-1/2 top-1/4 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-glow-pearl blur-[140px]" />
      </div>

      <div className="container-wide">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto max-w-[18ch] text-center h-display text-balance"
        >
          One app.{" "}
          <span className="text-ink-muted">Control everything.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mx-auto mt-7 max-w-[54ch] text-center text-[17px] sm:text-[18px] leading-[1.55] text-ink-muted text-pretty"
        >
          WakeApp is a personal execution system. Tasks, habits, calendar,
          focus, and screen time control — unified into{" "}
          <span className="text-ink">one calm environment</span>, built to
          help you operate at a higher gear.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            href="/waitlist"
            size="lg"
            variant="primary"
            className="w-full sm:w-auto h-16 px-10 text-lg"
          >
            Join the waitlist
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-5 text-center text-[12px] text-ink-dim font-mono tracking-wide"
        >
          iOS · iPadOS · Free during beta · No credit card
        </motion.p>

        {/* Real product screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="relative mt-20 sm:mt-24"
        >
          <ScreenFrame
            src="/screenshots/dashboard-carbon.png"
            alt="WakeApp Dashboard — your daily control center"
            size="lg"
            priority
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </section>
  );
}
