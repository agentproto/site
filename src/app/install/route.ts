/**
 * `/install` — `curl -fsSL https://agentproto.sh/install | bash` entry
 * point advertised by the footer CTA and the README.
 *
 * Proxies `scripts/bootstrap/install.sh` from `agentproto/ts@main` rather
 * than redirecting: a redirect would still work with `curl -L`, but
 * proxying guarantees the `text/plain` content type regardless of the
 * caller's flags and survives the upstream path ever moving without a
 * CTA copy change. Falls back to a 302 to the raw GitHub URL if the
 * upstream fetch fails, so the install path degrades instead of 500ing.
 */

const INSTALL_SCRIPT_URL =
  "https://raw.githubusercontent.com/agentproto/ts/main/scripts/bootstrap/install.sh"

export const dynamic = "force-dynamic"

export async function GET(): Promise<Response> {
  try {
    const upstream = await fetch(INSTALL_SCRIPT_URL, {
      headers: { "User-Agent": "agentproto.sh-install-proxy" },
      cache: "no-store",
    })
    if (!upstream.ok) {
      throw new Error(`upstream responded ${upstream.status}`)
    }
    const body = await upstream.text()
    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      },
    })
  } catch {
    return Response.redirect(INSTALL_SCRIPT_URL, 302)
  }
}
