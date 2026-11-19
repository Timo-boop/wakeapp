// Refuses an address whose domain cannot receive mail ("gmail.con", an invented
// school domain): an access noted for it would never meet an account.
//
// Only the domain is checked, through Cloudflare's public DNS over HTTPS. Whether
// the mailbox itself exists cannot be known without sending it an email.

const DNS_URL = "https://cloudflare-dns.com/dns-query";
const NXDOMAIN = 3;
const MX = 15;
const A = 1;
const AAAA = 28;

type DnsAnswer = { Status: number; Answer?: { type: number }[] };

async function lookup(name: string, type: "MX" | "A" | "AAAA"): Promise<DnsAnswer> {
  const res = await fetch(`${DNS_URL}?name=${encodeURIComponent(name)}&type=${type}`, {
    headers: { accept: "application/dns-json" },
  });
  if (!res.ok) throw new Error(`dns ${res.status}`);
  return (await res.json()) as DnsAnswer;
}

/**
 * False when the domain does not exist or has nowhere to deliver mail, true when
 * it can receive mail, null when DNS gave no clear answer. A null never blocks a
 * student: an unreachable resolver is not their mistake.
 */
export async function domainReceivesMail(email: string): Promise<boolean | null> {
  const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
  if (!domain) return false;
  try {
    const mx = await lookup(domain, "MX");
    if (mx.Status === NXDOMAIN) return false;
    if (mx.Status !== 0) return null;
    if (mx.Answer?.some((answer) => answer.type === MX)) return true;
    // No MX record: mail goes to the domain's own address, if it has one.
    const [a, aaaa] = await Promise.all([lookup(domain, "A"), lookup(domain, "AAAA")]);
    const hasAddress =
      a.Answer?.some((answer) => answer.type === A) || aaaa.Answer?.some((answer) => answer.type === AAAA);
    return hasAddress ? true : false;
  } catch {
    return null;
  }
}
