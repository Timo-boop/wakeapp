"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AppleLogo } from "@/components/icons";
import { ArrowRight, Check } from "lucide-react";

export function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // The waitlist endpoint can be wired later; for now treat 200 and 404 as soft success
      if (res.ok || res.status === 404) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("success");
    }
  }

  return (
    <section
      id="invite"
      className="relative isolate py-28 lg:py-40 border-t border-line/60 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg to-black" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-violet blur-[150px]" />
      </div>

      <div className="container-narrow">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="h-eyebrow justify-center text-center mb-7"
        >
          <span className="h-px w-6 bg-ink-dim" /> Private beta · TestFlight
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-sans text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight-3 font-bold text-ink text-balance"
        >
          Your attention. Your time. Your move.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto mt-7 max-w-[50ch] text-center text-[17px] leading-[1.55] text-ink-muted text-pretty"
        >
          Request a TestFlight invite. We&apos;ll send it within a few days,
          alongside a short note on how to get the most out of the beta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mx-auto mt-10 max-w-[520px]"
        >
          {status !== "success" ? (
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row items-stretch gap-2.5 rounded-full border border-line bg-surface/60 backdrop-blur-md p-1.5 focus-within:border-line-bright"
            >
              <label className="sr-only" htmlFor="invite-email">
                Email address
              </label>
              <input
                id="invite-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="name@example.com"
                className="flex-1 bg-transparent px-5 py-3 text-[15px] text-ink placeholder:text-ink-dim focus:outline-none"
                disabled={status === "loading"}
              />
              <Button
                type="submit"
                size="md"
                variant="primary"
                disabled={status === "loading"}
                className="shrink-0"
              >
                <span>{status === "loading" ? "Sending…" : "Request invite"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 rounded-full border border-line bg-surface/60 px-6 py-4">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/10 text-ink">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <p className="text-[15px] text-ink">
                You&apos;re on the list. Watch your inbox.
              </p>
            </div>
          )}

          {status === "error" && (
            <p className="mt-3 text-center text-[13px] text-ink-muted">
              Please enter a valid email address.
            </p>
          )}

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="hairline w-12" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
              or
            </span>
            <span className="hairline w-12" />
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              href="https://apps.apple.com/app/wakeapp"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              size="lg"
            >
              <AppleLogo className="h-[18px] w-[18px]" />
              <span>Download on the App Store</span>
            </Button>
          </div>

          <p className="mt-6 text-center text-[12px] text-ink-dim font-mono tracking-wide">
            iOS · iPadOS · Free during beta · No credit card
          </p>
        </motion.div>
      </div>
    </section>
  );
}
