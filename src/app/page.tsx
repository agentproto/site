import Link from "next/link"
import { AipRegistry } from "@/components/aip-registry"

/**
 * Home page — intro + registry table.
 *
 * The driver-family panel (AIP-30 supertype + provider_kind subtypes)
 * is intentionally NOT rendered here: the registry table below
 * already lists every AIP with its status, and the family view is a
 * curated subset that's redundant on the global home. It stays
 * available as an inline MDX component for specs that want to embed
 * it (notably aip-30.mdx).
 */
export default function HomePage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-3">agentproto</h1>
        <p className="text-lg text-fd-muted-foreground">
          Open standards for the AI-agent ecosystem. Markdown
          specifications (AIPs) plus a reference TypeScript runtime
          that any agent framework can consume.
        </p>
        <nav className="mt-6 flex gap-4">
          <Link
            href="/docs"
            className="rounded-md bg-fd-primary px-4 py-2 text-fd-primary-foreground font-medium"
          >
            Read the specs
          </Link>
          <a
            href="https://github.com/agentproto/agentproto"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-fd-border px-4 py-2 font-medium"
          >
            GitHub
          </a>
        </nav>
      </header>

      <AipRegistry />
    </main>
  )
}
