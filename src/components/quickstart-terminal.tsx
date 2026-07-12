/**
 * Self-typing quickstart terminal for the landing page. Three real
 * commands type themselves in sequence (CSS `steps()` width animation,
 * staggered via the `--type-delay` custom property), each followed by
 * its daemon output. No JS — under `prefers-reduced-motion` every
 * line renders fully, immediately.
 */
interface Line {
  kind: "cmd" | "out"
  delay: string
  content: React.ReactNode
}

const LINES: Line[] = [
  {
    kind: "cmd",
    delay: "0s",
    content: "npm i -g @agentproto/cli",
  },
  {
    kind: "out",
    delay: "1.9s",
    content: "+ @agentproto/cli — 9 adapters detected",
  },
  {
    kind: "cmd",
    delay: "2.3s",
    content: "agentproto serve",
  },
  {
    kind: "out",
    delay: "4.2s",
    content: (
      <>
        <span className="text-[var(--phos)]">●</span> gateway up ·
        http://127.0.0.1:18790 · panel ready
      </>
    ),
  },
  {
    kind: "cmd",
    delay: "4.6s",
    content: 'agentproto sessions start claude-code --prompt "fix the flaky test"',
  },
  {
    kind: "out",
    delay: "6.5s",
    content: (
      <>
        <span className="session-blink text-[var(--phos)]">●</span>{" "}
        <span className="text-[var(--phos)]">s_7f2k</span> · claude-code ·
        running — <span className="text-[var(--term-text)]">sessions --watch</span>
      </>
    ),
  },
]

export function QuickstartTerminal(): React.ReactElement {
  return (
    <div className="min-w-0 max-w-full overflow-hidden border border-[var(--term-line)] bg-[var(--term-bg)] shadow-[0_24px_50px_-20px_rgba(6,24,16,0.55)]">
      <div className="flex items-center gap-2.5 border-b border-[var(--term-line)] px-4 py-2.5">
        <span
          aria-hidden="true"
          className="session-blink h-2 w-2 shrink-0 rounded-full bg-[var(--phos)]"
        />
        <span className="font-mono text-xs text-[var(--term-dim)]">
          zsh — 30 seconds to a supervised agent
        </span>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.9]">
        <div className="min-w-[420px]">
          {LINES.map((line, i) =>
            line.kind === "cmd" ? (
              <div key={i} className="whitespace-nowrap">
                <span className="text-[var(--term-dim)]">$ </span>
                <span
                  className="type-line text-[var(--term-text)]"
                  style={{ "--type-delay": line.delay } as React.CSSProperties}
                >
                  {line.content}
                </span>
              </div>
            ) : (
              <div
                key={i}
                className="type-out whitespace-nowrap text-[var(--term-dim)]"
                style={{ "--type-delay": line.delay } as React.CSSProperties}
              >
                {line.content}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
