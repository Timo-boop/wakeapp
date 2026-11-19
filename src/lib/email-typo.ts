// Catches the slips that would send a partner access to an address nobody owns:
// "gmail.con", "gmial.com", "hotmal.fr". The access only reaches an account
// created with the exact same address, so a typo here means no access at all.

const KNOWN_DOMAINS = [
  "gmail.com",
  "icloud.com",
  "me.com",
  "hotmail.fr",
  "hotmail.com",
  "outlook.fr",
  "outlook.com",
  "live.fr",
  "yahoo.fr",
  "yahoo.com",
  "orange.fr",
  "wanadoo.fr",
  "free.fr",
  "sfr.fr",
  "laposte.net",
];

// Providers that exist under one extension only: "icloud.fr" or "gmail.fr" is
// always a slip, however far the extension is from the right one.
const SINGLE_EXTENSION: Record<string, string> = {
  gmail: "gmail.com",
  icloud: "icloud.com",
  orange: "orange.fr",
  wanadoo: "wanadoo.fr",
  free: "free.fr",
  sfr: "sfr.fr",
  laposte: "laposte.net",
};

/** The address with its domain corrected, or null when nothing looks off. */
export function suggestEmailFix(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at <= 0) return null;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();
  if (!domain || KNOWN_DOMAINS.includes(domain)) return null;

  const single = SINGLE_EXTENSION[domain.split(".")[0]];
  if (single) return `${local}@${single}`;

  let best: string | null = null;
  let bestDistance = Infinity;
  for (const known of KNOWN_DOMAINS) {
    const distance = editDistance(domain, known);
    if (distance < bestDistance) {
      best = known;
      bestDistance = distance;
    }
  }
  // Two edits covers a swapped pair ("gmial") or a wrong TLD letter ("con"),
  // and stays far from real school or work domains.
  return best !== null && bestDistance <= 2 ? `${local}@${best}` : null;
}

function editDistance(a: string, b: string): number {
  const previous = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let diagonal = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const above = previous[j];
      previous[j] = Math.min(
        previous[j] + 1,
        previous[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      diagonal = above;
    }
  }
  return previous[b.length];
}
