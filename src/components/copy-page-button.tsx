"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CopyPageButtonProps {
  /**
   * The page's processed markdown content (from fumadocs-mdx's
   * `_markdown` export). Falls back to the title + description if
   * the body is missing.
   */
  markdown: string
  title?: string
  description?: string
  className?: string
}

/**
 * Inline button that copies the current docs page as Markdown to the
 * clipboard. Useful for users who want to paste an AIP into an LLM
 * chat or take it offline. Renders the title + description as a
 * markdown header before the body so the copied text is self-contained.
 */
export function CopyPageButton({
  markdown,
  title,
  description,
  className,
}: CopyPageButtonProps): React.ReactElement {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)

  async function copy() {
    setError(false)
    const header = [
      title ? `# ${title}` : "",
      description ? `> ${description}` : "",
    ]
      .filter(Boolean)
      .join("\n\n")
    const body = [header, markdown].filter(Boolean).join("\n\n")
    try {
      await navigator.clipboard.writeText(body)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError(true)
      window.setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title="Copy this page as Markdown"
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium cursor-pointer",
        "rounded-md border transition-colors select-none",
        copied
          ? "border-green-500/40 bg-green-500/10 text-green-400"
          : error
            ? "border-red-500/40 bg-red-500/10 text-red-400"
            : "border-fd-border bg-fd-card text-fd-muted-foreground hover:text-fd-foreground hover:border-fd-primary/40 hover:bg-fd-accent/40 active:scale-[0.98]",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {copied ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <>
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </>
        )}
      </svg>
      {copied ? "Copied" : error ? "Error" : "Copy page"}
    </button>
  )
}
