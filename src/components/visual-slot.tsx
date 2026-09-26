import { cn } from "@/lib/utils"

/**
 * A placeholder for a real asset (screenshot or video) that doesn't
 * exist yet. Sized to the final asset's aspect ratio so swapping it in
 * doesn't move the layout. Deliberately looks unfinished: we don't fake
 * screenshots.
 */
export function VisualSlot({
  label,
  width,
  height,
  className,
}: {
  label: string
  /** Final asset size in px, e.g. 1600 × 1000. Sets the aspect ratio. */
  width: number
  height: number
  className?: string
}): React.ReactElement {
  return (
    <figure
      role="img"
      aria-label={`Placeholder: ${label}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn(
        "flex w-full min-w-0 flex-col items-center justify-center gap-2 border border-dashed border-fd-muted-foreground/50 bg-fd-muted p-6 text-center",
        className
      )}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fd-muted-foreground">
        placeholder
      </span>
      <span className="font-serif text-lg font-bold text-fd-foreground">
        {label}
      </span>
      <span className="font-mono text-[11px] text-fd-muted-foreground">
        {width} × {height}
      </span>
    </figure>
  )
}
