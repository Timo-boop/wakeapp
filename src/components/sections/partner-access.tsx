"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WakeMark } from "@/components/icons";
import { site } from "@/lib/site";
import {
  PartnerAccessError,
  fetchCodeInfo,
  formatAccessEnd,
  redeemCode,
  sendEmailCode,
  verifyEmailCode,
  type PartnerCodeInfo,
  type PartnerKind,
  type RedeemResult,
  type SendCodeError,
  type VerifyError,
} from "@/lib/partner-access";

type CodeState =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "error" }
  | { kind: "info"; code: string; info: PartnerCodeInfo };

type Step =
  | { kind: "email" }
  | { kind: "code"; email: string }
  | { kind: "done"; result: Extract<RedeemResult, { status: "ok" | "already" }> };

const RESEND_SECONDS = 60;

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

  if (info.status !== "ok") {
    const messages = {
      inactive: "Ce code n'est plus actif.",
      expired: `Cet accès a pris fin le ${end}.`,
      full: "Toutes les places de ce code ont été utilisées.",
    } as const;
    return (
      <>
        <p className="h-eyebrow text-ink-muted">{info.partner_name}</p>
        <Notice title={messages[info.status]}>
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
        Blocage des apps, Blackout illimité, planning, tâches et habitudes. Deux étapes, et c&apos;est
        à toi.
      </p>

      <ol className="mt-10 space-y-4">
        <li className="card p-6">
          <StepTitle number={1}>Installe WakeApp et crée ton compte</StepTitle>
          <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">
            Fais la configuration jusqu&apos;au bout, puis crée ton compte avec ton email.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button href={site.appStore} size="md" target="_blank" rel="noopener noreferrer">
              Télécharger sur l&apos;App Store
            </Button>
            <span className="text-[13px] text-ink-muted">Android : bientôt sur Google Play</span>
          </div>
        </li>

        <li className="card p-6">
          <StepTitle number={2}>Active ton accès</StepTitle>
          <ActivationForm code={code} />
        </li>
      </ol>
    </>
  );
}

function ActivationForm({ code }: { code: string }) {
  const [step, setStep] = useState<Step>({ kind: "email" });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = window.setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendIn]);

  async function sendCode(address: string) {
    setBusy(true);
    setError(null);
    try {
      await sendEmailCode(address);
      setStep({ kind: "code", email: address });
      setOtp("");
      setResendIn(RESEND_SECONDS);
    } catch (e) {
      setError(sendErrorText(e instanceof PartnerAccessError ? (e.reason as SendCodeError) : "failed"));
    } finally {
      setBusy(false);
    }
  }

  async function onEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const address = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(address)) {
      setError("Cette adresse email n'est pas valide.");
      return;
    }
    await sendCode(address);
  }

  async function onCodeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step.kind !== "code") return;
    const token = otp.replace(/\D/g, "");
    if (token.length !== 6) {
      setError("Le code fait 6 chiffres.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const accessToken = await verifyEmailCode(step.email, token);
      const result = await redeemCode(code, accessToken);
      if (result.status === "ok" || result.status === "already") {
        setStep({ kind: "done", result });
      } else {
        setError(redeemErrorText(result.status));
      }
    } catch (e) {
      setError(verifyErrorText(e instanceof PartnerAccessError ? (e.reason as VerifyError) : "failed"));
    } finally {
      setBusy(false);
    }
  }

  if (step.kind === "done") {
    return (
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-line bg-surface-raised/60 p-4">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink/10 text-ink">
          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
        </span>
        <div role="status">
          <p className="text-[15px] font-semibold text-ink">
            {step.result.status === "already" ? "C'était déjà activé." : "C'est activé."}
          </p>
          <p className="mt-1 text-[15px] leading-[1.6] text-ink-muted">
            Ferme WakeApp complètement, puis rouvre-la : tu es en God jusqu&apos;au{" "}
            {formatAccessEnd(step.result.access_ends_at)}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      {step.kind === "email" ? (
        <form onSubmit={onEmailSubmit} noValidate>
          <p className="text-[15px] leading-[1.6] text-ink-muted">
            Donne l&apos;email de ton compte WakeApp. Tu vas recevoir un code à 6 chiffres.
          </p>
          <label htmlFor="access-email" className="sr-only">
            Email de ton compte WakeApp
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
              aria-describedby={error ? "access-error" : "access-email-hint"}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[16px] text-ink placeholder:text-ink-dim focus:outline-none"
            />
            <Button type="submit" size="md" disabled={busy} className="shrink-0">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}
              Recevoir mon code
            </Button>
          </FieldRow>
          {error && (
            <p id="access-error" role="alert" className="mt-3 text-[14px] leading-[1.55] text-ink">
              {error}
            </p>
          )}
          <p id="access-email-hint" className="mt-3 text-[13px] leading-[1.55] text-ink-muted">
            Inscrit avec Apple et « Masquer mon adresse » ? Ton adresse est dans Réglages › ton nom ›
            Se connecter avec Apple › WakeApp.
          </p>
        </form>
      ) : (
        <form onSubmit={onCodeSubmit} noValidate>
          <p className="text-[15px] leading-[1.6] text-ink-muted">
            Code envoyé à <span className="text-ink">{step.email}</span>. Regarde aussi dans les
            spams.
          </p>
          <label htmlFor="access-code" className="sr-only">
            Code à 6 chiffres
          </label>
          <FieldRow>
            <input
              id="access-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                setError(null);
              }}
              placeholder="123456"
              disabled={busy}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "access-error" : undefined}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-[18px] tracking-[0.3em] text-ink placeholder:text-ink-dim placeholder:tracking-[0.3em] focus:outline-none"
            />
            <Button type="submit" size="md" disabled={busy} className="shrink-0">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
              Activer
            </Button>
          </FieldRow>
          {error && (
            <p id="access-error" role="alert" className="mt-3 text-[14px] leading-[1.55] text-ink">
              {error}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
            <button
              type="button"
              onClick={() => void sendCode(step.email)}
              disabled={busy || resendIn > 0}
              className="min-h-[44px] text-ink-muted underline underline-offset-2 decoration-line-bright hover:text-ink disabled:no-underline disabled:text-ink-dim"
            >
              {resendIn > 0 ? `Renvoyer le code (${resendIn} s)` : "Renvoyer le code"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep({ kind: "email" });
                setError(null);
              }}
              disabled={busy}
              className="min-h-[44px] text-ink-muted underline underline-offset-2 decoration-line-bright hover:text-ink"
            >
              Changer d&apos;email
            </button>
          </div>
        </form>
      )}

    </div>
  );
}

function CodeEntry({ onSubmit, invalid = false }: { onSubmit: (code: string) => void; invalid?: boolean }) {
  const [value, setValue] = useState("");
  return (
    <>
      <h1 className="font-sans text-[clamp(2rem,7vw,2.75rem)] leading-[1.05] tracking-tight-3 font-bold text-ink">
        Ton accès offert
      </h1>
      <p className="lead mt-4">
        Entre le code donné par ton établissement, ou scanne son QR code.
      </p>
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

function StepTitle({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-[18px] font-semibold tracking-tight-2 text-ink">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-bright font-mono text-[13px] text-ink-muted">
        {number}
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

function sendErrorText(reason: SendCodeError): string {
  switch (reason) {
    case "no_account":
      return "Aucun compte WakeApp avec cet email. Crée d'abord ton compte dans l'app avec cette adresse (étape 1), puis reviens ici.";
    case "rate_limited":
      return "Trop de demandes d'affilée. Attends une minute, puis réessaie.";
    case "failed":
      return "L'envoi du code a échoué. Réessaie dans un instant.";
  }
}

function verifyErrorText(reason: VerifyError): string {
  switch (reason) {
    case "invalid_code":
      return "Ce code est faux ou a expiré. Vérifie-le, ou demande-en un nouveau.";
    case "rate_limited":
      return "Trop d'essais d'affilée. Attends une minute, puis réessaie.";
    case "failed":
      return "L'activation a échoué. Réessaie dans un instant.";
  }
}

function redeemErrorText(status: Exclude<RedeemResult["status"], "ok" | "already">): string {
  switch (status) {
    case "full":
      return "Toutes les places de ce code viennent d'être utilisées.";
    case "expired":
      return "Cet accès a pris fin.";
    case "inactive":
      return "Ce code n'est plus actif.";
    case "unknown":
      return "Ce code n'existe pas.";
    case "not_signed_in":
      return "La vérification de ton email a échoué. Recommence.";
  }
}
