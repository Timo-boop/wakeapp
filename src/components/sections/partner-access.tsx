"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WakeMark } from "@/components/icons";
import { site } from "@/lib/site";
import {
  claimCode,
  fetchCodeInfo,
  formatAccessEnd,
  type ClaimResult,
  type PartnerCodeInfo,
  type PartnerKind,
} from "@/lib/partner-access";

type CodeState =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "error" }
  | { kind: "info"; code: string; info: PartnerCodeInfo };

const NBSP = " ";

const placeOf: Record<PartnerKind, string> = {
  lycee: "ton lycée",
  mairie: "ta ville",
  association: "ton association",
  autre: "ton établissement",
};

export function PartnerAccess() {
  const [codeState, setCodeState] = useState<CodeState>({ kind: "loading" });

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("c")?.trim();
    if (!code) {
      setCodeState({ kind: "missing" });
      return;
    }
    void loadCode(code);
  }, []);

  async function loadCode(code: string) {
    setCodeState({ kind: "loading" });
    try {
      const info = await fetchCodeInfo(code);
      setCodeState({ kind: "info", code: code.toLowerCase(), info });
      if (info.status !== "unknown") {
        const url = new URL(window.location.href);
        url.searchParams.set("c", code.toLowerCase());
        window.history.replaceState(null, "", url);
      }
    } catch {
      setCodeState({ kind: "error" });
    }
  }

  return (
    <div lang="fr" className="min-h-[100svh] flex flex-col">
      <header className="container-narrow flex h-16 items-center">
        <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <WakeMark className="h-7 w-7" />
          <span className="font-sans text-[17px] font-medium tracking-tight-2">{site.name}</span>
        </a>
      </header>

      <main className="flex-1 pt-10 sm:pt-16 pb-20">
        <div className="mx-auto w-full max-w-xl px-5">
          {codeState.kind === "loading" && <CenteredSpinner />}
          {codeState.kind === "error" && (
            <Notice title="La page n'a pas pu charger.">
              Vérifie ta connexion, puis recharge la page.
            </Notice>
          )}
          {codeState.kind === "missing" && <CodeEntry onSubmit={loadCode} />}
          {codeState.kind === "info" && codeState.info.status === "unknown" && (
            <CodeEntry onSubmit={loadCode} invalid />
          )}
          {codeState.kind === "info" && codeState.info.status !== "unknown" && (
            <PartnerFlow code={codeState.code} info={codeState.info} />
          )}
        </div>
      </main>
    </div>
  );
}

function PartnerFlow({
  code,
  info,
}: {
  code: string;
  info: Exclude<PartnerCodeInfo, { status: "unknown" }>;
}) {
  const end = formatAccessEnd(info.access_ends_at);
  const [claimedEmail, setClaimedEmail] = useState<string | null>(null);

  if (info.status !== "ok") {
    return (
      <>
        <p className="h-eyebrow text-ink-muted">{info.partner_name}</p>
        <Notice title={closedTitle(info.status, end)}>
          Rapproche-toi de {placeOf[info.partner_kind]} pour obtenir un nouveau lien.
        </Notice>
      </>
    );
  }

  return (
    <>
      <p className="h-eyebrow text-ink-muted">Offert par {info.partner_name}</p>
      <h1 className="mt-4 font-sans text-[clamp(2rem,7vw,2.75rem)] leading-[1.05] tracking-tight-3 font-bold text-ink text-balance">
        WakeApp God, offert jusqu&apos;au {end}.
      </h1>
      <p className="lead mt-4">
        Blocage des apps, Blackout illimité, planning, tâches et habitudes. Deux étapes, et
        c&apos;est à toi.
      </p>

      <ol className="mt-10 space-y-4">
        <li className="card p-6">
          <StepTitle number={1} done={claimedEmail !== null}>
            Donne ton email
          </StepTitle>
          {claimedEmail === null ? (
            <ClaimForm code={code} onClaimed={setClaimedEmail} />
          ) : (
            <div className="mt-3" role="status">
              <p className="text-[15px] leading-[1.6] text-ink-muted">
                C&apos;est noté pour <span className="text-ink">{claimedEmail}</span>.
              </p>
              <button
                type="button"
                onClick={() => setClaimedEmail(null)}
                className="mt-1 min-h-[44px] text-[13px] text-ink-muted underline underline-offset-2 decoration-line-bright hover:text-ink"
              >
                Ce n&apos;est pas la bonne adresse{NBSP}?
              </button>
            </div>
          )}
        </li>

        <li className={claimedEmail === null ? "card p-6 opacity-60" : "card p-6"}>
          <StepTitle number={2}>Crée ton compte dans l&apos;app</StepTitle>
          <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">
            {claimedEmail === null ? (
              "Ensuite, installe WakeApp et crée ton compte avec la même adresse."
            ) : (
              <>
                Installe WakeApp et crée ton compte avec{" "}
                <span className="text-ink">{claimedEmail}</span>. Ton accès God sera déjà là.
              </>
            )}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button href={site.appStore} size="md" target="_blank" rel="noopener noreferrer">
              Télécharger sur l&apos;App Store
            </Button>
            <span className="text-[13px] text-ink-muted">Android{NBSP}: bientôt sur Google Play</span>
          </div>
          <ul className="mt-5 space-y-2 text-[13px] leading-[1.55] text-ink-muted">
            <li>
              Déjà un compte avec cette adresse{NBSP}? Ferme WakeApp complètement, puis
              rouvre-la{NBSP}: c&apos;est activé.
            </li>
            <li>
              Avec Apple, ne choisis pas «{NBSP}Masquer mon adresse{NBSP}»{NBSP}: ton accès est lié
              à ton email.
            </li>
          </ul>
        </li>
      </ol>
    </>
  );
}

function ClaimForm({ code, onClaimed }: { code: string; onClaimed: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const address = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(address)) {
      setError("Cette adresse email n'est pas valide.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const result = await claimCode(code, address);
      if (result.status === "ok") onClaimed(address);
      else setError(claimErrorText(result.status));
    } catch {
      setError("L'envoi a échoué. Vérifie ta connexion, puis réessaie.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-2">
      <p className="text-[15px] leading-[1.6] text-ink-muted">
        L&apos;adresse avec laquelle tu vas créer ton compte WakeApp, ou celle de ton compte si tu en
        as déjà un.
      </p>
      <label htmlFor="access-email" className="sr-only">
        Ton email
      </label>
      <FieldRow>
        <input
          id="access-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          placeholder="prenom@exemple.fr"
          disabled={busy}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "access-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[16px] text-ink placeholder:text-ink-dim focus:outline-none"
        />
        <Button type="submit" size="md" disabled={busy} className="shrink-0">
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden />
          )}
          Activer mon accès
        </Button>
      </FieldRow>
      {error && (
        <p id="access-error" role="alert" className="mt-3 text-[14px] leading-[1.55] text-ink">
          {error}
        </p>
      )}
    </form>
  );
}

function CodeEntry({ onSubmit, invalid = false }: { onSubmit: (code: string) => void; invalid?: boolean }) {
  const [value, setValue] = useState("");
  return (
    <>
      <h1 className="font-sans text-[clamp(2rem,7vw,2.75rem)] leading-[1.05] tracking-tight-3 font-bold text-ink">
        Ton accès offert
      </h1>
      <p className="lead mt-4">Entre le code donné par ton établissement.</p>
      <form
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) onSubmit(value.trim());
        }}
      >
        <label htmlFor="partner-code" className="sr-only">
          Code de ton établissement
        </label>
        <FieldRow>
          <input
            id="partner-code"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="lycee-exemple-k3f9q"
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? "partner-code-error" : undefined}
            className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-[16px] text-ink placeholder:text-ink-dim focus:outline-none"
          />
          <Button type="submit" size="md" className="shrink-0">
            <ArrowRight className="h-4 w-4" aria-hidden />
            Continuer
          </Button>
        </FieldRow>
        {invalid && (
          <p id="partner-code-error" role="alert" className="mt-3 text-[14px] text-ink">
            Ce code n&apos;existe pas. Vérifie-le auprès de ton établissement.
          </p>
        )}
      </form>
    </>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-line bg-bg/60 p-1.5 focus-within:border-line-bright sm:flex-row sm:items-center">
      {children}
    </div>
  );
}

function StepTitle({
  number,
  done = false,
  children,
}: {
  number: number;
  done?: boolean;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-3 text-[18px] font-semibold tracking-tight-2 text-ink">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-bright font-mono text-[13px] text-ink-muted">
        {done ? <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} aria-label="Fait" /> : number}
      </span>
      {children}
    </h2>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card mt-4 p-6" role="status">
      <p className="text-[17px] font-semibold text-ink">{title}</p>
      <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">{children}</p>
    </div>
  );
}

function CenteredSpinner() {
  return (
    <div className="grid place-items-center py-24" role="status" aria-label="Chargement">
      <Loader2 className="h-6 w-6 animate-spin text-ink-dim" aria-hidden />
    </div>
  );
}

function closedTitle(status: "inactive" | "expired" | "full", end: string): string {
  switch (status) {
    case "inactive":
      return "Ce code n'est plus actif.";
    case "expired":
      return `Cet accès a pris fin le ${end}.`;
    case "full":
      return "Toutes les places de ce code ont été utilisées.";
  }
}

function claimErrorText(status: Exclude<ClaimResult["status"], "ok">): string {
  switch (status) {
    case "invalid_email":
      return "Cette adresse email n'est pas valide.";
    case "full":
      return "Toutes les places de ce code viennent d'être utilisées.";
    case "expired":
      return "Cet accès a pris fin.";
    case "inactive":
      return "Ce code n'est plus actif.";
    case "unknown":
      return "Ce code n'existe pas.";
  }
}
