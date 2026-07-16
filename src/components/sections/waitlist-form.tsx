"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot, kept empty by real users
  const [source, setSource] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSource(params.get("ref") ?? params.get("utm_source"));
  }, []);

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
        body: JSON.stringify({ email, company, source }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-3 rounded-full border border-line bg-surface/60 px-6 py-4">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-ink/10 text-ink">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        <p className="text-[15px] text-ink">
          You&apos;re in. We&apos;ll email you the moment WakeApp goes live.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row items-stretch gap-2.5 rounded-full border border-line bg-surface/60 backdrop-blur-md p-1.5 focus-within:border-line-bright"
      >
        <label className="sr-only" htmlFor="waitlist-email">
          Email address
        </label>
        <input
          id="waitlist-email"
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
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <Button
          type="submit"
          size="md"
          variant="primary"
          disabled={status === "loading"}
          className="shrink-0"
        >
          <span>{status === "loading" ? "Sending…" : "Join the waitlist"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-4 text-center text-[13px] text-ink-dim">
        Be first to get it at launch. No spam, ever.
      </p>

      {status === "error" && (
        <p className="mt-3 text-center text-[13px] text-ink-muted">
          Something went wrong. Check your email and try again.
        </p>
      )}
    </div>
  );
}
