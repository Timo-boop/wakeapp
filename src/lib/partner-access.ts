// Partner access (lycées, mairies…): a student proves their email with a 6-digit
// code, then the code of their school is redeemed on their WakeApp account.
//
// Plain calls to Supabase Auth and PostgREST: the page needs a session only for
// the time of the redemption, and signs it out right after (scope=local, so the
// app's own session on the phone is left alone).

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

export type RedeemResult =
  | { status: "ok" | "already"; partner_name: string; access_ends_at: string }
  | { status: "unknown" | "inactive" | "expired" | "full" | "not_signed_in" };

/** Why sending the email code failed, in terms the page can explain. */
export type SendCodeError = "no_account" | "rate_limited" | "failed";

/** Why checking the email code failed. */
export type VerifyError = "invalid_code" | "rate_limited" | "failed";

export class PartnerAccessError<T extends string> extends Error {
  constructor(readonly reason: T) {
    super(reason);
  }
}

const baseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  "Content-Type": "application/json",
};

export async function fetchCodeInfo(code: string): Promise<PartnerCodeInfo> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/partner_code_info`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ p_code: code }),
  });
  if (!res.ok) throw new Error(`partner_code_info ${res.status}`);
  return (await res.json()) as PartnerCodeInfo;
}

/**
 * Sends the 6-digit code to an existing account only: an address with no
 * account is told to sign up in the app first, so the web never creates a
 * second, empty account next to the one on the phone.
 */
export async function sendEmailCode(email: string): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ email, create_user: false }),
  });
  if (res.ok) return;
  const body = await safeJson(res);
  if (res.status === 429 || body.error_code === "over_email_send_rate_limit") {
    throw new PartnerAccessError<SendCodeError>("rate_limited");
  }
  if (
    body.error_code === "otp_disabled" ||
    body.error_code === "user_not_found" ||
    /signups not allowed/i.test(body.msg ?? body.message ?? "")
  ) {
    throw new PartnerAccessError<SendCodeError>("no_account");
  }
  throw new PartnerAccessError<SendCodeError>("failed");
}

/** Checks the email code and returns a short-lived access token. */
export async function verifyEmailCode(email: string, token: string): Promise<string> {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({ type: "email", email, token }),
  });
  const body = await safeJson(res);
  if (res.ok && typeof body.access_token === "string") return body.access_token;
  if (res.status === 429) throw new PartnerAccessError<VerifyError>("rate_limited");
  if (res.status === 400 || res.status === 401 || res.status === 403) {
    throw new PartnerAccessError<VerifyError>("invalid_code");
  }
  throw new PartnerAccessError<VerifyError>("failed");
}

/** Redeems the code on the signed-in account, then ends this web session. */
export async function redeemCode(code: string, accessToken: string): Promise<RedeemResult> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/redeem_partner_code`, {
      method: "POST",
      headers: { ...baseHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ p_code: code }),
    });
    if (!res.ok) throw new Error(`redeem_partner_code ${res.status}`);
    return (await res.json()) as RedeemResult;
  } finally {
    // Only this browser session: a global sign-out would also log the student
    // out of the app on their phone.
    void fetch(`${SUPABASE_URL}/auth/v1/logout?scope=local`, {
      method: "POST",
      headers: { ...baseHeaders, Authorization: `Bearer ${accessToken}` },
    }).catch(() => undefined);
  }
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

async function safeJson(res: Response): Promise<Record<string, any>> {
  try {
    return (await res.json()) as Record<string, any>;
  } catch {
    return {};
  }
}
