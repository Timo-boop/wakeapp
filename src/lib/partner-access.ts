// Partner access (lycées, mairies…): a student gives their email on their
// school's page, then signs up in the app with that address, and the access is
// already on the account.
//
// Nothing is verified here: the server applies the access only to an account
// whose email is confirmed, and the app's sign-up is what confirms it.

const SUPABASE_URL = "https://fyjojdynapdaoinpooyd.supabase.co";
// Public by design: the anon key only reaches what RLS and the two partner
// functions allow.
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5am9qZHluYXBkYW9pbnBvb3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTk3MTgsImV4cCI6MjA4NjU3NTcxOH0.GcHhxLQF6UA149KQUkph4XYsVnc3K_TlcKWOup3ki_4";

export type PartnerKind = "lycee" | "mairie" | "association" | "autre";

export type PartnerCodeInfo =
  | { status: "unknown" }
  | {
      status: "ok" | "inactive" | "expired" | "full";
      partner_name: string;
      partner_kind: PartnerKind;
      access_ends_at: string;
    };

/**
 * The same answer whether or not an account already uses the address, so the
 * page never tells who has a WakeApp account.
 */
export type ClaimResult =
  | { status: "ok"; partner_name: string; access_ends_at: string }
  | { status: "unknown" | "inactive" | "expired" | "full" | "invalid_email" };

const headers = {
  apikey: SUPABASE_ANON_KEY,
  "Content-Type": "application/json",
};

async function rpc<T>(name: string, body: Record<string, string>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${name} ${res.status}`);
  return (await res.json()) as T;
}

export function fetchCodeInfo(code: string): Promise<PartnerCodeInfo> {
  return rpc<PartnerCodeInfo>("partner_code_info", { p_code: code });
}

/** Notes the email for this code, and gives the access at once to an existing account. */
export function claimCode(code: string, email: string): Promise<ClaimResult> {
  return rpc<ClaimResult>("claim_partner_code", { p_code: code, p_email: email });
}

/** "31 août 2027" for an end set at midnight, Paris time, the day after. */
export function formatAccessEnd(iso: string): string {
  const lastDay = new Date(new Date(iso).getTime() - 1000);
  return lastDay.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
}
