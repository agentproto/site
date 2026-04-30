/**
 * Provider family roster — surfaces AIP-30 (the provider supertype)
 * plus every AIP whose frontmatter declares a `driver_kind`.
 * Renders as a quick visual index of "what kinds of providers exist
 * in the standard."
 */

import Link from "next/link"
import { docsSource } from "@/lib/docs-source"

interface FamilyEntry {
  number: number
  title: string
  status: string
  href: string
  role: "supertype" | "subtype"
  driverKind: string | null
}

const ROLE_LABELS: Record<FamilyEntry["role"], string> = {
  supertype: "Supertype",
  subtype: "Subtype",
}

function stripAipTitlePrefix(raw: string, n: number): string {
  return raw.replace(new RegExp(`^AIP-${n}:?\\s*`), "")
}

function loadFamily(): FamilyEntry[] {
  const pages = docsSource.getPages()
  const entries: FamilyEntry[] = []

  for (const page of pages) {
    const data = page.data as {
      aip?: number | string
      title?: string
      status?: string
      driver_kind?: string
    }
    if (data.aip === undefined || data.aip === null) continue
    const n =
      typeof data.aip === "number" ? data.aip : Number.parseInt(String(data.aip), 10)
    if (!Number.isFinite(n)) continue

    const driverKind =
      typeof data.driver_kind === "string" ? data.driver_kind : null
    // AIP-30 is the supertype by current numbering; subtypes declare
    // `driver_kind:` in their frontmatter.
    const isSupertype = n === 30
    if (!driverKind && !isSupertype) continue

    const rawTitle = typeof data.title === "string" ? data.title : `AIP-${n}`
    entries.push({
      number: n,
      title: stripAipTitlePrefix(rawTitle, n),
      status: typeof data.status === "string" ? data.status : "—",
      href: page.url,
      role: isSupertype ? "supertype" : "subtype",
      driverKind,
    })
  }

  return entries.sort((a, b) => {
    if (a.role === "supertype" && b.role !== "supertype") return -1
    if (b.role === "supertype" && a.role !== "supertype") return 1
    return a.number - b.number
  })
}

export function DriverFamily(): React.ReactElement {
  const entries = loadFamily()

  return (
    <section className="driver-family">
      <h2 id="driver-family">Provider family</h2>
      <p className="family-intro">
        AIP-30 declares the abstract <code>DRIVER.md</code> supertype.
        Each subtype below specialises it for one transport kind
        (cli, http, mcp, sdk, builtin).
      </p>
      <ul className="family-list">
        {entries.map(entry => (
          <li
            key={entry.number}
            className={`family-row family-${entry.role}`}
          >
            <Link href={entry.href} className="family-link">
              <span className="family-number">AIP-{entry.number}</span>
              <span className="family-title">{entry.title}</span>
              <span className="family-meta">
                <span className={`family-role role-${entry.role}`}>
                  {ROLE_LABELS[entry.role]}
                </span>
                {entry.driverKind && (
                  <span className="family-kind">
                    kind: {entry.driverKind}
                  </span>
                )}
                <span className={`family-status status-${entry.status.toLowerCase()}`}>
                  {entry.status}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
