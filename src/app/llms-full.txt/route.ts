/**
 * `/llms-full.txt` — full-text dump of every AIP page.
 *
 * Each spec emits its `_markdown` (plain markdown stringified by
 * fumadocs-mdx's `remarkLLMs` plugin via `postprocess.includeProcessedMarkdown`),
 * separated by `---` so an indexer can reassemble structure.
 *
 * Single-tenant — this site only carries agentproto specs. Resources
 * (SKILL.md, ADAPTER.md, schema files) are linked here too but the
 * canonical source is the public spec repo on GitHub; we don't inline
 * their bodies because they're not synced into the site's content tree.
 */

import { docsSource } from "@/lib/docs-source"

export const dynamic = "force-static"
export const revalidate = 300

export async function GET(req: Request): Promise<Response> {
  const origin = new URL(req.url).origin
  const text = buildLlmsFullTxt(origin)
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
    },
  })
}

function buildLlmsFullTxt(origin: string): string {
  const sections: string[] = []

  const pages = docsSource.getPages().sort((a, b) => {
    const an = aipNumberOf(a.data)
    const bn = aipNumberOf(b.data)
    return an - bn
  })

  for (const page of pages) {
    const data = page.data as {
      title?: string
      description?: string
      _markdown?: string
    }
    const title = data.title ?? page.url
    const desc = data.description ?? ""
    const body = data._markdown ?? ""
    const url = `${origin}${page.url}`

    sections.push(`<!-- doc: ${url} -->`)
    sections.push(`# ${title}`)
    if (desc) sections.push(`> ${desc}`)
    sections.push("")
    if (body) sections.push(body.trim())
    sections.push("")
    sections.push("---")
    sections.push("")
  }

  return sections.join("\n")
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
