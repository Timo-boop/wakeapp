import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";

export function LegalShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="relative pt-32 sm:pt-40 pb-24">
        <div className="container-narrow">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted hover:text-ink transition-colors mb-10"
          >
            ← Back to WakeApp
          </a>
          <article className="prose-legal">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}
