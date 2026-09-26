/** Section eyebrow: mono label preceded by a short ultramarine rule. */
export function SectionLabel({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
      <span
        aria-hidden="true"
        className="mr-3 inline-block h-0.5 w-6 translate-y-[-3px] bg-fd-primary align-middle"
      />
      {children}
    </p>
  )
}
