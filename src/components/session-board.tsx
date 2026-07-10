import { cn } from "@/lib/utils"

/**
 * The signature element of the landing hero: a styled DOM terminal
 * panel showing a live agentproto daemon with sessions across
 * adapters, ending in a policy gate awaiting human ack.
 *
 * Pure DOM + CSS — no JS animation. Only the two `● running` dots
 * blink (opacity pulse, ~2s), disabled under `motion-reduce`.
 */
interface Row {
  session: string
  adapter: string
  model: string
  status: "running" | "turn-end" | "passed" | "waiting"
  label: string
}

const ROWS: Row[] = [
  { session: "api", adapter: "claude-code", model: "sonnet-5", status: "running", label: "running" },
  { session: "tests", adapter: "codex", model: "gpt-5.5-codex", status: "running", label: "running" },
  { session: "review", adapter: "hermes", model: "z-ai/glm-5.2", status: "turn-end", label: "turn-end" },
  { session: "policy lint+test", adapter: "", model: "gate", status: "passed", label: "passed" },
  { session: "commit", adapter: "staged", model: "awaiting ack", status: "waiting", label: "ack?" },
]

const STATUS_MARKER: Record<Row["status"], string> = {
  running: "●",
  "turn-end": "✓",
  passed: "✓",
  waiting: "▶",
}

const STATUS_COLOR: Record<Row["status"], string> = {
  running: "text-green-500",
  "turn-end": "text-green-500",
  passed: "text-green-500",
  waiting: "text-amber-500",
}

export function SessionBoard(): React.ReactElement {
  return (
    <div className="min-w-0 max-w-full rounded-lg border border-fd-border bg-fd-card overflow-hidden">
      {/* titlebar */}
      <div className="flex min-w-0 items-center gap-2 border-b border-fd-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-fd-muted-foreground/40" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-fd-muted-foreground/40" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-fd-muted-foreground/40" />
        <span className="ml-2 min-w-0 truncate font-mono text-xs text-fd-muted-foreground">
          agentproto · gateway up · http://127.0.0.1:18790
        </span>
      </div>

      {/* body */}
      <div className="p-4 font-mono text-[13px] leading-relaxed overflow-x-auto">
        {/* header row */}
        <div className="grid grid-cols-[1fr_1fr_1.2fr_1fr] gap-x-3 text-fd-muted-foreground text-xs mb-2 min-w-[280px]">
          <span>SESSION</span>
          <span>ADAPTER</span>
          <span>MODEL</span>
          <span>STATUS</span>
        </div>
        <ul className="space-y-1.5 min-w-[280px]">
          {ROWS.map(row => (
            <li
              key={row.session}
              className="grid grid-cols-[1fr_1fr_1.2fr_1fr] gap-x-3 items-baseline"
            >
              <span className="text-fd-foreground">{row.session}</span>
              <span className="text-fd-muted-foreground">{row.adapter}</span>
              <span className="text-fd-muted-foreground">{row.model}</span>
              <span className="flex items-center gap-1.5">
                <span
                  className={cn(
                    STATUS_COLOR[row.status],
                    row.status === "running" && "session-blink"
                  )}
                  aria-hidden="true"
                >
                  {STATUS_MARKER[row.status]}
                </span>
                <span className="text-fd-muted-foreground">{row.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
