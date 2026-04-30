/**
 * AIP registry — flat list of every AIP page, sorted by status then
 * number. Drop into the docs landing or the homepage to give an at-
 * a-glance index.
 */

import Link from "next/link"
import { docsSource } from "@/lib/docs-source"

interface AipEntry {
  number: number
  title: string
  status: string
  type: string
  href: string
}

const STATUS_ORDER: Record<string, number> = {
  Final: 0,
  Review: 1,
  Draft: 2,
  Withdrawn: 3,
  Superseded: 4,
}

function stripAipTitlePrefix(raw: string, n: number): string {
  return raw.replace(new RegExp(`^AIP-${n}:?\\s*`), "")
}

function loadRegistry(): AipEntry[] {
  const pages = docsSource.getPages()
  const entries: AipEntry[] = []

  for (const page of pages) {
    const data = page.data as {
      aip?: number | string
      title?: string
      status?: string
      type?: string
    }
    if (data.aip === undefined || data.aip === null) continue
    const n =
      typeof data.aip === "number" ? data.aip : Number.parseInt(String(data.aip), 10)
    if (!Number.isFinite(n)) continue

    const rawTitle = typeof data.title === "string" ? data.title : `AIP-${n}`
    entries.push({
      number: n,
      title: stripAipTitlePrefix(rawTitle, n),
      status: typeof data.status === "string" ? data.status : "—",
      type: typeof data.type === "string" ? data.type : "—",
      href: page.url,
    })
  }

  return entries.sort((a, b) => {
    const sa = STATUS_ORDER[a.status] ?? 99
    const sb = STATUS_ORDER[b.status] ?? 99
    return sa - sb || a.number - b.number
  })
}

export function AipRegistry(): React.ReactElement {
  const entries = loadRegistry()

  return (
    <section className="aip-registry">
      <h2 id="aip-registry">AIP registry</h2>
      <p className="registry-intro">
        {entries.length} proposals in the registry. Final specs are
        stable; Draft / Review may change before promotion.
      </p>
      <table className="registry-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
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
              <td className="registry-type">{entry.type}</td>
              <td className={`registry-status status-${entry.status.toLowerCase()}`}>
                {entry.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
