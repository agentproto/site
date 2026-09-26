import { cn } from "@/lib/utils"
import { isVisible, type Claim } from "@/content/claims"

/**
 * The "coming soon" marker for a pending claim. Dashed border and
 * muted ink so it reads as not-yet, never as a feature badge.
 */
export function PendingMarker({
  className,
}: {
  className?: string
}): React.ReactElement {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 border border-dashed border-fd-muted-foreground/60 px-1.5 py-px align-middle font-mono text-[10.5px] font-normal uppercase tracking-[0.1em] text-fd-muted-foreground not-italic",
        className
      )}
    >
      <span aria-hidden="true">◌</span>coming soon
    </span>
  )
}

/**
 * Renders one claim's text. Pending claims get the marker (or render
 * nothing when SHOW_PENDING_CLAIMS is off). `as` picks the element.
 */
export function ClaimText({
  claim,
  as: Tag = "p",
  className,
}: {
  claim: Claim
  as?: "p" | "li" | "span"
  className?: string
}): React.ReactElement | null {
  if (!isVisible(claim)) return null
  const pending = claim.status === "pending"
  return (
    <Tag
      data-claim={claim.id}
      data-status={claim.status}
      className={cn(pending && "text-fd-muted-foreground", className)}
    >
      <InlineCode text={claim.text} />
      {pending && (
        <>
          {" "}
          <PendingMarker />
        </>
      )}
    </Tag>
  )
}

/** Renders `backtick` spans in claim text as inline code. */
export function InlineCode({ text }: { text: string }): React.ReactElement {
  const parts = text.split("`")
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="font-mono text-[0.9em] text-fd-foreground">
            {part}
          </code>
        ) : (
          part
        )
      )}
    </>
  )
}
