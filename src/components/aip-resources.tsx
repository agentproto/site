/**
 * Per-AIP resources panel — lists supporting artifacts (SKILL.md,
 * ADAPTER.md, schema files, examples, …) for a given AIP and links
 * them out to GitHub for viewing.
 *
 * Source-of-truth: the public spec repo
 * (`agentproto/agentproto:specs/resources/aip-N/...`). This panel
 * does not proxy or render the files itself — GitHub does that
 * natively for .md / .json / .yaml. We just generate the URLs and
 * surface the directory structure that ships in the synced content
 * tree.
 */

import { existsSync } from "node:fs"
import { readdir, stat } from "node:fs/promises"
import path from "node:path"
import { resourceBlobUrl, resourceTreeUrl } from "@/lib/github-resources"

interface AipResourcesProps {
  aip: number
  /**
   * Optional channel (`draft` / `review` / `final`). Defaults to
   * walking every channel that exists for the AIP.
   */
  channel?: string
}

interface ResourceEntry {
  name: string
  isDirectory: boolean
  /** Path relative to `specs/resources/`, e.g. `aip-14/draft/SKILL.md`. */
  relativePath: string
}

const RESOURCES_ROOT = path.join(process.cwd(), "content/docs/resources")

async function listResourceTree(
  aip: number,
  channel?: string
): Promise<ResourceEntry[]> {
  const aipDir = path.join(RESOURCES_ROOT, `aip-${aip}`)
  if (!existsSync(aipDir)) return []

  const channels = channel
    ? [channel]
    : (await readdir(aipDir, { withFileTypes: true }))
        .filter(d => d.isDirectory())
        .map(d => d.name)

  const out: ResourceEntry[] = []
  for (const ch of channels) {
    const chDir = path.join(aipDir, ch)
    if (!(await isDir(chDir))) continue
    await walk(chDir, `aip-${aip}/${ch}`, out)
  }
  return out
}

async function walk(
  abs: string,
  rel: string,
  out: ResourceEntry[]
): Promise<void> {
  const entries = await readdir(abs, { withFileTypes: true })
  for (const e of entries) {
    if (e.name.startsWith(".")) continue
    const childRel = `${rel}/${e.name}`
    if (e.isDirectory()) {
      out.push({ name: e.name, isDirectory: true, relativePath: childRel })
      await walk(path.join(abs, e.name), childRel, out)
    } else {
      out.push({ name: e.name, isDirectory: false, relativePath: childRel })
    }
  }
}

async function isDir(p: string): Promise<boolean> {
  try {
    const s = await stat(p)
    return s.isDirectory()
  } catch {
    return false
  }
}

function iconForFile(name: string): string {
  const lower = name.toLowerCase()
  if (lower === "skill.md") return "🧠"
  if (lower === "adapter.md") return "🔌"
  if (lower === "examples.md") return "📚"
  if (lower.endsWith(".schema.json")) return "📐"
  if (lower.endsWith(".md") || lower.endsWith(".mdx")) return "📄"
  if (lower.endsWith(".json")) return "📋"
  if (lower.endsWith(".yaml") || lower.endsWith(".yml")) return "⚙️"
  return "📄"
}

export async function AipResources({
  aip,
  channel,
}: AipResourcesProps): Promise<React.ReactElement | null> {
  const entries = await listResourceTree(aip, channel)
  if (entries.length === 0) return null

  const files = entries.filter(e => !e.isDirectory)
  if (files.length === 0) return null

  return (
    <section className="aip-resources">
      <h2 id="resources">Resources</h2>
      <p className="resources-intro">
        Supporting artifacts for AIP-{aip}. Links open the file on GitHub
        — markdown and JSON render natively in GitHub&apos;s viewer.{" "}
        <a
          className="resources-tree-link"
          href={resourceTreeUrl(`aip-${aip}`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse the full resource tree →
        </a>
      </p>
      <ul className="resources-list">
        {files.map(entry => (
          <li key={entry.relativePath} className="resources-row">
            <a
              href={resourceBlobUrl(entry.relativePath)}
              target="_blank"
              rel="noopener noreferrer"
              className="resources-link"
            >
              <span className="resources-icon" aria-hidden>
                {iconForFile(entry.name)}
              </span>
              <span className="resources-name">{entry.name}</span>
              <span className="resources-path">{entry.relativePath}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
