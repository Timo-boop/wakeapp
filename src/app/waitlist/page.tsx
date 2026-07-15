import type { Metadata } from "next";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { WaitlistForm } from "@/components/sections/waitlist-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "WakeApp isn't live on the App Store yet. Join the waitlist and we'll send a TestFlight invite as soon as a spot opens up.",
};

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
            <p className="h-eyebrow justify-center text-center mb-7">
              <span className="h-px w-6 bg-ink-dim" /> Private beta · TestFlight
            </p>

            <h1 className="text-center font-sans text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight-3 font-bold text-ink text-balance">
              Join the waitlist
            </h1>

            <p className="mx-auto mt-7 max-w-[50ch] text-center text-[17px] leading-[1.55] text-ink-muted text-pretty">
              {site.name} isn&apos;t on the App Store yet. Leave your email and
              we&apos;ll send a TestFlight invite as soon as a spot opens up —
              usually within a few days.
            </p>

            <div className="mx-auto mt-10 max-w-[520px]">
              <WaitlistForm />
              <p className="mt-6 text-center text-[12px] text-ink-dim font-mono tracking-wide">
                iOS · iPadOS · Free during beta · No credit card
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
