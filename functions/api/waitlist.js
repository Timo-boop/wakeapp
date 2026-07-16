// Cloudflare Pages Function — stores waitlist signups in KV.
// Requires a KV namespace bound as `WAITLIST` in the Pages project settings.
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (!env.WAITLIST) {
    return json({ error: "Waitlist storage not configured" }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  // Honeypot: real users never fill this hidden field.
  if (String(body.company || "").trim()) {
    return json({ ok: true });
  }

  const email = String(body.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Invalid email address" }, 400);
  }

  const source = body.source ? String(body.source).slice(0, 100) : null;

  const key = `email:${email}`;
  const existing = await env.WAITLIST.get(key);
  if (!existing) {
    await env.WAITLIST.put(
      key,
      JSON.stringify({ email, source, joinedAt: new Date().toISOString() }),
    );
  }

  return json({ ok: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
