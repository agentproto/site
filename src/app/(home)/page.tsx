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

const DEEP_DIVES = [
  {
    step: "01",
    title: "Adding a harness",
    href: "/deep-dives/adding-a-harness",
    body: "Driving an agent CLI that ships no ACP server — one manifest, one client that owns its RPC subprocess, one pure event mapper.",
  },
  {
    step: "02",
    title: "Bridging MCP",
    href: "/deep-dives/bridging-mcp",
    body: "Teaching an agent with no MCP client to call MCP tools — a generated extension that speaks MCP on the agent's behalf. No fork.",
  },
  {
    step: "03",
    title: "Leaf to orchestrator",
    href: "/deep-dives/leaf-to-orchestrator",
    body: "The one bridged tool — agent_start — that promotes a leaf executor into an orchestrator spawning real, observable child sessions.",
  },
]

/**
 * A section eyebrow: a mono label preceded by a short accent rule.
 * Gives every section a consistent, terminal-flavored header without a
 * heavy visual system. Used for the mono uppercase section labels.
 */
function SectionLabel({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-fd-primary/50" />
      {children}
    </p>
  )
}

/**
 * Home page — the launch landing page. One job: make a skeptical,
 * terminal-native developer run `npm i -g @agentproto/cli` — or at
 * least click GitHub.
 */
export default function HomePage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-6xl px-6">
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
            <span aria-hidden="true" className="session-blink shrink-0 text-fd-primary">
              ▍
            </span>
            one daemon · any coding agent · real supervision
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            One daemon to run every coding agent — and actually supervise them
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-fd-muted-foreground text-pretty">
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
              className="rounded-md bg-fd-primary px-4 py-2 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              Start the daemon
            </a>
            <a
              href="https://github.com/agentproto/ts"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-fd-border px-4 py-2 font-medium transition-colors hover:border-fd-primary/40"
            >
              GitHub
            </a>
          </div>
        </div>
        <SessionBoard />
      </section>

      {/* ── 2. Proof strip ──────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>People are hand-rolling this today.</SectionLabel>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PROOF.map(p => (
            <figure
              key={p.attribution}
              className="flex flex-col gap-3 rounded-lg border border-fd-border bg-fd-card p-5"
            >
              <blockquote className="text-sm leading-relaxed text-fd-foreground">
                &ldquo;{p.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto font-mono text-xs text-fd-muted-foreground">
                — {p.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 3. What it is ───────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-fd-foreground">
              One lifecycle
            </h2>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              The same start, prompt, monitor, and kill verbs across every
              adapter. Stop memorizing five different CLIs — one daemon, one
              interface, nine adapters today.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-fd-foreground">
              Real supervision
            </h2>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              Policy gates fire on turn-end — shell command or LLM judge. A
              commit can be staged behind the gate and wait for an explicit
              human ack. It all survives a client disconnect.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-fd-foreground">
              Composition, not a framework
            </h2>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              Drives the CLIs you already use. The daemon is itself an MCP
              server, and any spawned agent can mount any MCP server at spawn
              time — including the daemon&rsquo;s own orchestration gateway.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. Adapters ─────────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>Adapters — live today</SectionLabel>
        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {ADAPTERS.map(adapter => (
            <li
              key={adapter.name}
              className="flex items-center justify-between gap-2 rounded-md border border-fd-border bg-fd-card px-3 py-2.5"
            >
              <span className="font-mono text-sm">{adapter.name}</span>
              <span className="rounded bg-fd-muted px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-fd-muted-foreground">
                {adapter.kind}
              </span>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/agentproto/ts"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md border border-dashed border-fd-border bg-fd-card px-3 py-2.5 transition-colors hover:border-fd-primary/40"
            >
              <span className="font-mono text-sm text-fd-foreground">
                yours?
              </span>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wide text-fd-muted-foreground">
                Write an adapter
              </span>
            </a>
          </li>
        </ul>
      </section>

      {/* ── 5. See it work ──────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>quickstart</SectionLabel>
        <pre className="mt-6 overflow-x-auto rounded-lg border border-fd-border bg-fd-card p-5 font-mono text-[13px] leading-relaxed">
          <code>{`agentproto serve
agentproto sessions start claude-code --prompt "refactor the payments module"
agentproto sessions --watch`}</code>
        </pre>
        <p className="mt-3 text-sm text-fd-muted-foreground">
          Three commands. Then gate it: attach a policy to any
          session&rsquo;s turn-end and stage the commit behind a human ack.
        </p>
      </section>

      {/* ── 6. Deep dives ───────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <SectionLabel>Deep dives — read the code</SectionLabel>
          <Link
            href="/deep-dives"
            className="font-mono text-xs text-fd-primary hover:underline"
          >
            all deep dives →
          </Link>
        </div>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-fd-muted-foreground">
          Code-first, reproducible walkthroughs — each takes one real
          mechanism, walks the source, and ends with commands you can run on
          a cold clone. The three below turn a hostile agent (no ACP, no MCP)
          into a supervised orchestrator, in order.
        </p>
        <ul className="grid gap-4 md:grid-cols-3">
          {DEEP_DIVES.map(d => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="group flex h-full flex-col rounded-lg border border-fd-border bg-fd-card p-5 transition-colors hover:border-fd-primary/40"
              >
                <span className="font-mono text-xs text-fd-muted-foreground">
                  {d.step}
                </span>
                <h3 className="mt-2 mb-2 font-semibold group-hover:text-fd-primary">
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed text-fd-muted-foreground">
                  {d.body}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 7. Honest split ─────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <h2 className="mb-3 text-xl font-semibold">What&apos;s real vs. roadmap</h2>
        <p className="mb-4 max-w-2xl leading-relaxed text-fd-muted-foreground">
          The CLI, the nine adapters above, and the orchestration/
          supervision primitives (nested orchestration, policy gates,
          fan-in monitoring, MCP composition) are live and used
          hands-on. The wider AIP spec family beyond that is an open
          roadmap — most of those packages are early scaffolding, not
          finished implementations. We&apos;d rather say that plainly
          than have you find out the hard way.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/features" className="font-medium text-fd-primary hover:underline">
            Full features breakdown →
          </Link>
          <Link href="/docs" className="font-medium text-fd-primary hover:underline">
            See the full spec index →
          </Link>
        </div>
      </section>

      {/* ── 8. AipRegistry (spec index) — unchanged ────────────── */}
      <section className="border-t border-fd-border py-16">
        <AipRegistry />
      </section>
    </main>
  )
}
