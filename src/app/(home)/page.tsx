import Link from "next/link"
import { AipRegistry } from "@/components/aip-registry"
import { CopyCommand } from "@/components/copy-command"
import { SessionBoard } from "@/components/session-board"

const ADAPTERS = [
  { name: "Claude Code", kind: "cli" },
  { name: "Claude SDK", kind: "sdk" },
  { name: "Codex", kind: "cli" },
  { name: "Hermes", kind: "cli" },
  { name: "opencode", kind: "cli" },
  { name: "Mastra Code", kind: "cli" },
  { name: "Mastra Agent", kind: "sdk" },
  { name: "OpenClaw", kind: "cli" },
  { name: "Browser", kind: "target" },
]

const PROOF = [
  {
    quote:
      "I'm not convinced there is any hope for a productive, long-term, burnout-free parallel agent workflow.",
    attribution: "grim_io, HN",
  },
  {
    quote: "Keep agents simple, push orchestration to the outside.",
    attribution: "IssueConnect7471, r/ClaudeAI (built a tmux+Redis watchdog)",
  },
  {
    quote:
      "Today I have Claude Code and Codex CLI and Codex Web running, often in parallel",
    attribution: "simonw, HN",
  },
]

/**
 * Home page — the launch landing page. One job: make a skeptical,
 * terminal-native developer run `npm i -g @agentproto/cli` — or at
 * least click GitHub.
 */
export default function HomePage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-6xl px-6 py-12">
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center mb-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-fd-muted-foreground mb-4">
            one daemon · any coding agent · real supervision
          </p>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            One daemon to run every coding agent — and actually supervise them
          </h1>
          <p className="text-lg text-fd-muted-foreground leading-relaxed mb-6">
            Claude Code, Codex, Hermes, opencode, and Mastra get the same
            start-stop-restart lifecycle, so you stop memorizing five
            different CLIs. Then nest them, gate them behind policy, and
            watch every run from one place.
          </p>
          <div className="mb-6">
            <CopyCommand command="npm i -g @agentproto/cli" />
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://cli.agentproto.sh"
              className="rounded-md bg-fd-primary px-4 py-2 text-fd-primary-foreground font-medium"
            >
              Start the daemon
            </a>
            <a
              href="https://github.com/agentproto/ts"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-fd-border px-4 py-2 font-medium"
            >
              GitHub
            </a>
          </div>
        </div>
        <SessionBoard />
      </section>

      {/* ── 2. Proof strip ──────────────────────────────────────── */}
      <section className="mb-20">
        <p className="font-mono text-xs uppercase tracking-wide text-fd-muted-foreground mb-4">
          People are hand-rolling this today.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {PROOF.map(p => (
            <figure
              key={p.attribution}
              className="rounded-lg border border-fd-border bg-fd-card p-4 flex flex-col gap-3"
            >
              <blockquote className="text-sm text-fd-foreground leading-relaxed">
                &ldquo;{p.quote}&rdquo;
              </blockquote>
              <figcaption className="font-mono text-xs text-fd-muted-foreground mt-auto">
                — {p.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 3. What it is ───────────────────────────────────────── */}
      <section className="mb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wide text-fd-muted-foreground mb-2">
              One lifecycle
            </h2>
            <p className="text-fd-muted-foreground leading-relaxed text-sm">
              The same start, prompt, monitor, and kill verbs across every
              adapter. Stop memorizing five different CLIs — one daemon, one
              interface, nine adapters today.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wide text-fd-muted-foreground mb-2">
              Real supervision
            </h2>
            <p className="text-fd-muted-foreground leading-relaxed text-sm">
              Policy gates fire on turn-end — shell command or LLM judge. A
              commit can be staged behind the gate and wait for an explicit
              human ack. It all survives a client disconnect.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wide text-fd-muted-foreground mb-2">
              Composition, not a framework
            </h2>
            <p className="text-fd-muted-foreground leading-relaxed text-sm">
              Drives the CLIs you already use. The daemon is itself an MCP
              server, and any spawned agent can mount any MCP server at spawn
              time — including the daemon&rsquo;s own orchestration gateway.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Adapters ─────────────────────────────────────────── */}
      <section className="mb-20">
        <h2 className="font-mono text-xs uppercase tracking-wide text-fd-muted-foreground mb-4">
          Adapters — live today
        </h2>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {ADAPTERS.map(adapter => (
            <li
              key={adapter.name}
              className="rounded-md border border-fd-border bg-fd-card px-3 py-2 flex items-center justify-between gap-2"
            >
              <span className="font-mono text-sm">{adapter.name}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-fd-muted-foreground">
                {adapter.kind}
              </span>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/agentproto/ts"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md border border-dashed border-fd-border bg-fd-card px-3 py-2 hover:border-fd-primary/40 transition-colors"
            >
              <span className="font-mono text-sm text-fd-foreground">
                yours?
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-wide text-fd-muted-foreground mt-0.5">
                Write an adapter
              </span>
            </a>
          </li>
        </ul>
      </section>

      {/* ── 5. See it work ──────────────────────────────────────── */}
      <section className="mb-20">
        <p className="font-mono text-xs uppercase tracking-wide text-fd-muted-foreground mb-3">
          quickstart
        </p>
        <pre className="rounded-lg border border-fd-border bg-fd-card p-4 font-mono text-[13px] leading-relaxed overflow-x-auto">
          <code>{`agentproto serve
agentproto sessions start claude-code --prompt "refactor the payments module"
agentproto sessions --watch`}</code>
        </pre>
        <p className="text-sm text-fd-muted-foreground mt-3">
          Three commands. Then gate it: attach a policy to any
          session&rsquo;s turn-end and stage the commit behind a human ack.
        </p>
      </section>

      {/* ── 6. Honest split ─────────────────────────────────────── */}
      <section className="mb-20">
        <h2 className="text-xl font-semibold mb-3">What&apos;s real vs. roadmap</h2>
        <p className="text-fd-muted-foreground leading-relaxed mb-3">
          The CLI, the nine adapters above, and the orchestration/
          supervision primitives (nested orchestration, policy gates,
          fan-in monitoring, MCP composition) are live and used
          hands-on. The wider AIP spec family beyond that is an open
          roadmap — most of those packages are early scaffolding, not
          finished implementations. We&apos;d rather say that plainly
          than have you find out the hard way.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/features" className="text-fd-primary font-medium">
            Full features breakdown →
          </Link>
          <Link href="/docs" className="text-fd-primary font-medium">
            See the full spec index →
          </Link>
        </div>
      </section>

      {/* ── 7. AipRegistry (spec index) — unchanged ────────────── */}
      <AipRegistry />
    </main>
  )
}
