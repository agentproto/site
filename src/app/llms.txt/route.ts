/**
 * `/llms.txt` — short LLM-discoverable index of every AIP.
 *
 * Format follows https://llmstxt.org : title + description + grouped
 * link list with one-line summaries. The companion `/llms-full.txt`
 * carries the full text bodies.
 *
 * Single-tenant (agentproto only) — the standalone site doesn't
 * federate other product docs; for those, see agentik.net/docs.
 */

import { docsSource } from "@/lib/docs-source"

export const dynamic = "force-static"
export const revalidate = 300

export async function GET(req: Request): Promise<Response> {
  const origin = new URL(req.url).origin
  const text = buildLlmsTxt(origin)
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  })
}

function buildLlmsTxt(origin: string): string {
  const lines: string[] = [
    "# agentproto",
    "",
    "> Open standards for the AI-agent ecosystem. AIP specifications " +
      "(markdown) plus a reference TypeScript runtime: tool contracts " +
      "(AIP-14), provider/driver supertype (AIP-30), kind-specific " +
      "runtimes (CLI / HTTP / MCP / SDK), and framework adapters.",
    "",
    "## AIP registry",
    "",
  ]

  const pages = docsSource
    .getPages()
    .filter(p => {
      const data = p.data as { aip?: number | string }
      return data.aip !== undefined && data.aip !== null
    })
    .sort((a, b) => {
      const an = aipNumberOf(a.data)
      const bn = aipNumberOf(b.data)
      return an - bn
    })

  for (const page of pages) {
    const data = page.data as {
      title?: string
      description?: string
    }
    const title = data.title ?? page.url
    const desc = data.description ?? ""
    const suffix = desc ? `: ${desc}` : ""
    lines.push(`- [${title}](${origin}${page.url})${suffix}`)
  }

  lines.push("")
  lines.push("## Source")
  lines.push("")
  lines.push(
    "- Specifications & runtime: https://github.com/agentproto/agentproto"
  )
  lines.push("- This site: https://github.com/agentproto/site")
  lines.push("")

  return lines.join("\n")
}

function aipNumberOf(data: unknown): number {
  const aip = (data as { aip?: number | string }).aip
  if (typeof aip === "number") return aip
  if (typeof aip === "string") {
    const n = Number.parseInt(aip, 10)
    if (Number.isFinite(n)) return n
  }
  return Number.MAX_SAFE_INTEGER
}
