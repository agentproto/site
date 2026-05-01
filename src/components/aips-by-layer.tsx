/**
 * AIPs grouped by semantic layer — the v0.3 docs-landing registry.
 *
 * Reads `layer:` from each AIP's frontmatter and renders one section
 * per layer in the canonical order (process → primitives → identity →
 * memory → coordination → capabilities → drivers → surfaces). Within
 * each section, AIPs are sorted by status (Final < Review < Draft <
 * Withdrawn < Superseded) then number, the same precedence as the flat
 * `<AipRegistry />`.
 *
 * AIPs without a `layer:` field land in a final "Misc" section so
 * external contributions render somewhere instead of disappearing.
 */

import Link from "next/link"
import { docsSource } from "@/lib/docs-source"

interface AipEntry {
  number: number
  title: string
  status: string
  requires: string
  href: string
}

const STATUS_ORDER: Record<string, number> = {
  Final: 0,
  Review: 1,
  Draft: 2,
  Withdrawn: 3,
  Superseded: 4,
}

interface LayerMeta {
  slug: string
  title: string
  intro: string
}

const LAYERS: LayerMeta[] = [
  {
    slug: "process",
    title: "Process — How does the standard itself evolve?",
    intro:
      "How AIPs are proposed, reviewed, and graduated. Read these first if you want to contribute a spec.",
  },
  {
    slug: "primitives",
    title: "Primitives — What building blocks does everything else compose with?",
    intro:
      "Small, reusable pieces. Every other layer references at least one of these — collections, refs, IO blocks, secrets, process boundaries.",
  },
  {
    slug: "identity",
    title: "Identity — Who acts?",
    intro:
      "How an agent describes itself: its profile, capabilities, persona. The shell that the rest of the layers attach to.",
  },
  {
    slug: "memory",
    title: "Memory — What does the agent remember between runs?",
    intro:
      "Knowledge an agent maintains, lessons it distils from experience, prompt overlays it carries forward. Memory turns one-shot agents into ones that compound.",
  },
  {
    slug: "coordination",
    title: "Work, Org & Governance — What gets done, where, and under what rules?",
    intro:
      "Companies, agencies, work items, offices, assemblies — and the governance layer that records approvals and audit trails. The coordination substrate.",
  },
  {
    slug: "capabilities",
    title: "Capabilities — What can the agent do?",
    intro:
      "Skills, tools, workflows, intents — the declared surface of what an agent or its tools expose. Intent vs implementation: capabilities declare intent.",
  },
  {
    slug: "drivers",
    title: "Drivers — How are capabilities actually implemented?",
    intro:
      "The DRIVER supertype and its concrete subtypes (CLI, HTTP, MCP, SDK). One tool, many drivers; the routing layer that connects intent to execution.",
  },
  {
    slug: "surfaces",
    title: "Surfaces — What does the agent produce or read?",
    intro:
      "Visual and code surfaces: design tokens, canvas templates, code workspaces. The artifacts agents author or consume on the human-facing edge.",
  },
]

const MISC_LAYER: LayerMeta = {
  slug: "misc",
  title: "Misc — Untagged",
  intro:
    "AIPs that haven't been placed in a semantic layer yet. New contributions usually start here.",
}

function stripAipTitlePrefix(raw: string, n: number): string {
  return raw.replace(new RegExp(`^AIP-${n}:?\\s*`), "")
}

function loadEntries(): Map<string, AipEntry[]> {
  const pages = docsSource.getPages()
  const buckets = new Map<string, AipEntry[]>()

  for (const page of pages) {
    const data = page.data as {
      aip?: number | string
      title?: string
      status?: string
      layer?: string
      requires?: number[] | string[] | string
    }
    if (data.aip === undefined || data.aip === null) continue
    const n =
      typeof data.aip === "number"
        ? data.aip
        : Number.parseInt(String(data.aip), 10)
    if (!Number.isFinite(n)) continue

    const rawTitle = typeof data.title === "string" ? data.title : `AIP-${n}`
    const layer = typeof data.layer === "string" ? data.layer : "misc"

    const requires = formatRequires(data.requires)

    const entry: AipEntry = {
      number: n,
      title: stripAipTitlePrefix(rawTitle, n),
      status: typeof data.status === "string" ? data.status : "—",
      requires,
      href: page.url,
    }
    const arr = buckets.get(layer) ?? []
    arr.push(entry)
    buckets.set(layer, arr)
  }

  for (const arr of buckets.values()) {
    arr.sort((a, b) => {
      const sa = STATUS_ORDER[a.status] ?? 99
      const sb = STATUS_ORDER[b.status] ?? 99
      return sa - sb || a.number - b.number
    })
  }
  return buckets
}

function formatRequires(raw: unknown): string {
  if (Array.isArray(raw)) {
    return raw
      .map(v => (typeof v === "number" ? `${v}` : String(v)))
      .filter(Boolean)
      .join(", ")
  }
  if (typeof raw === "string") return raw
  return ""
}

export function AipsByLayer(): React.ReactElement {
  const buckets = loadEntries()

  const orderedLayers = [...LAYERS]
  if (buckets.has("misc")) orderedLayers.push(MISC_LAYER)

  return (
    <section className="aips-by-layer">
      {orderedLayers.map(layer => {
        const entries = buckets.get(layer.slug) ?? []
        if (entries.length === 0) return null
        return (
          <section key={layer.slug} className="aip-layer-section">
            <h2 id={layer.slug}>{layer.title}</h2>
            <p className="layer-intro">{layer.intro}</p>
            <table className="registry-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Requires</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.number}>
                    <td className="registry-num">
                      <Link href={entry.href}>AIP-{entry.number}</Link>
                    </td>
                    <td className="registry-title">
                      <Link href={entry.href}>{entry.title}</Link>
                    </td>
                    <td
                      className={`registry-status status-${entry.status.toLowerCase()}`}
                    >
                      {entry.status}
                    </td>
                    <td className="registry-requires">
                      {entry.requires || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )
      })}
    </section>
  )
}
