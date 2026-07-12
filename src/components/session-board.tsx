import { cn } from "@/lib/utils"

/**
 * The signature element of the landing hero: a phosphor terminal
 * panel showing a live agentproto daemon — a nested session tree
 * across adapters, ending in a policy gate awaiting human ack.
 *
 * Colors come from the theme-invariant --term-* / --phos / --amber
 * tokens: this panel stays dark in both themes on purpose — it is
 * the "runtime island" of the Paper & Phosphor system.
 *
 * Pure DOM + CSS — no JS animation. Only the `● running` dots blink
 * (opacity pulse, ~2s), disabled under `motion-reduce`.
 */
interface Row {
  session: React.ReactNode
  adapter: string
  model: string
  status: "running" | "turn-end" | "passed" | "waiting"
  label: string
}

const SESSIONS: Row[] = [
  {
    session: "api",
    adapter: "claude-code",
    model: "sonnet-5",
    status: "running",
    label: "running",
  },
  {
    session: (
      <>
        <span className="text-[var(--term-dim)]">└─ </span>tests
      </>
    ),
    adapter: "codex",
    model: "gpt-5.5-codex",
    status: "running",
    label: "running",
  },
  {
    session: "review",
    adapter: "hermes",
    model: "z-ai/glm-5.2",
    status: "turn-end",
    label: "turn-end",
  },
]

const GATE: Row[] = [
  {
    session: "lint+test",
    adapter: "policy",
    model: "gate",
    status: "passed",
    label: "passed",
  },
  {
    session: "commit",
    adapter: "staged",
    model: "awaiting ack",
    status: "waiting",
    label: "ack?",
  },
]

const STATUS_MARKER: Record<Row["status"], string> = {
  running: "●",
  "turn-end": "✓",
  passed: "✓",
  waiting: "▶",
}

function BoardRow({ row }: { row: Row }): React.ReactElement {
  return (
    <li className="grid grid-cols-[1fr_1fr_1.2fr_0.9fr] gap-x-3 items-baseline">
      <span className="text-[var(--term-text)]">{row.session}</span>
      <span className="text-[var(--term-dim)]">{row.adapter}</span>
      <span className="text-[var(--term-dim)]">{row.model}</span>
      <span className="flex items-center gap-1.5">
        <span
          className={cn(
            row.status === "waiting"
              ? "text-[var(--amber)]"
              : "text-[var(--phos)]",
            row.status === "running" && "session-blink"
          )}
          aria-hidden="true"
        >
          {STATUS_MARKER[row.status]}
        </span>
        <span
          className={cn(
            row.status === "waiting"
              ? "text-[var(--amber)]"
              : "text-[var(--term-dim)]"
          )}
        >
          {row.label}
        </span>
      </span>
    </li>
  )
}

export function SessionBoard(): React.ReactElement {
  return (
    <div className="min-w-0 max-w-full overflow-hidden border border-[var(--term-line)] bg-[var(--term-bg)] shadow-[0_24px_50px_-20px_rgba(6,24,16,0.55)]">
      {/* titlebar */}
      <div className="flex min-w-0 items-center gap-2.5 border-b border-[var(--term-line)] px-4 py-2.5">
        <span
          aria-hidden="true"
          className="session-blink h-2 w-2 shrink-0 rounded-full bg-[var(--phos)]"
        />
        <span className="min-w-0 truncate font-mono text-xs text-[var(--term-dim)]">
          agentproto · gateway up · http://127.0.0.1:18790
        </span>
      </div>

      {/* body */}
      <div className="overflow-x-auto whitespace-nowrap p-4 font-mono text-[13px] leading-relaxed">
        <div className="mb-2 grid min-w-[300px] grid-cols-[1fr_1fr_1.2fr_0.9fr] gap-x-3 text-[10px] tracking-[0.12em] text-[var(--term-dim)]">
          <span>SESSION</span>
          <span>ADAPTER</span>
          <span>MODEL</span>
          <span>STATUS</span>
        </div>
        <ul className="min-w-[300px] space-y-1.5">
          {SESSIONS.map((row, i) => (
            <BoardRow key={i} row={row} />
          ))}
        </ul>
        <ul className="mt-3 min-w-[300px] space-y-1.5 border-t border-dashed border-[var(--term-line)] pt-3">
          {GATE.map((row, i) => (
            <BoardRow key={i} row={row} />
          ))}
        </ul>
      </div>
    </div>
  )
}
