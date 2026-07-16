import type { Metadata } from "next";
import { Ban, Timer, Trophy } from "lucide-react";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { WaitlistForm } from "@/components/sections/waitlist-form";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "WakeApp blocks the apps that steal your time, runs deep-focus sessions, and turns discipline into a game. Launching soon on iPhone.",
};

const benefits = [
  { icon: Ban, label: "Block distracting apps" },
  { icon: Timer, label: "Deep-focus sessions" },
  { icon: Trophy, label: "Discipline, gamified." },
];

export default function WaitlistPage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <section
          id="invite"
          className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden py-32 lg:py-40"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 bg-mesh-carbon" />
            <div className="absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-pearl blur-[150px]" />
          </div>

          <div className="container-narrow">
            <h1 className="text-center font-sans text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight-3 font-bold text-ink text-balance">
              Take back your focus.
            </h1>

            <p className="mx-auto mt-7 max-w-[50ch] text-center text-[17px] leading-[1.55] text-ink-muted text-pretty">
              WakeApp blocks the apps that steal your time, runs deep-focus
              sessions, and turns discipline into a game. Launching soon on
              iPhone.
            </p>

            <div className="mx-auto mt-10 max-w-[520px]">
              <WaitlistForm />
            </div>

            <div className="mx-auto mt-16 flex max-w-[560px] flex-col gap-4 sm:flex-row sm:justify-center sm:gap-8">
              {benefits.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2.5 sm:flex-col sm:gap-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface/60 text-ink-muted">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[14px] text-ink-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
