import Link from "next/link"
import { CopyCommand } from "@/components/copy-command"
import { QuickstartTerminal } from "@/components/quickstart-terminal"
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
 * A section eyebrow: a mono label preceded by a short ultramarine
 * rule. Gives every section a consistent, document-flavored header.
 */
function SectionLabel({
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

/**
 * Home page — the launch landing page. One job: make a skeptical,
 * terminal-native developer run `npm i -g @agentproto/cli` — or at
 * least click GitHub. Product leads; the AIP spec family appears
 * once, at the end, as the credibility floor (full registry lives
 * under /docs).
 */
export default function HomePage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-6xl px-6">
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
            <span aria-hidden="true" className="session-blink mr-2 text-fd-primary">
              ▍
            </span>
            one daemon · any coding agent · real supervision
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold leading-[1.07] tracking-tight text-balance sm:text-[3.4rem]">
            One daemon runs every coding agent.{" "}
            <em className="text-fd-primary">And actually supervises them.</em>
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
          <div className="mb-8 flex flex-wrap gap-3">
            <a
              href="https://cli.agentproto.sh"
              className="bg-fd-foreground px-5 py-2 font-medium text-fd-background transition-opacity hover:opacity-85"
            >
              Start the daemon
            </a>
            <a
              href="https://github.com/agentproto/ts"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-fd-border px-5 py-2 font-medium transition-colors hover:border-fd-primary/50"
            >
              GitHub
            </a>
          </div>
          <p className="font-mono text-xs text-fd-muted-foreground">
            9 adapters · MIT · npm <span className="text-fd-foreground">@agentproto/cli</span>
          </p>
        </div>
        <SessionBoard />
      </section>

      {/* ── 2. Proof strip ──────────────────────────────────────── */}
      <section className="border-t border-fd-border py-14">
        <SectionLabel>People are hand-rolling this today.</SectionLabel>
        <div className="mt-8 grid gap-y-8 md:grid-cols-3 md:divide-x md:divide-fd-border md:gap-y-0">
          {PROOF.map((p, i) => (
            <figure
              key={p.attribution}
              className={i === 0 ? "md:pr-8" : i === 1 ? "md:px-8" : "md:pl-8"}
            >
              <blockquote className="font-serif text-[17px] italic leading-snug text-fd-foreground">
                &ldquo;{p.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-mono text-xs text-fd-muted-foreground">
                — {p.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 3. Quickstart — moved up: prove it in 30 seconds ────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionLabel>quickstart</SectionLabel>
            <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
              Three commands to a running, watchable agent
            </h2>
            <p className="max-w-md leading-relaxed text-fd-muted-foreground">
              Install, serve, start a session. Then gate it: attach a
              policy to any session&apos;s turn-end and stage the commit
              behind a human ack.
            </p>
            <Link
              href="/deep-dives"
              className="mt-4 inline-block font-medium text-fd-primary hover:underline"
            >
              See how it works inside →
            </Link>
          </div>
          <QuickstartTerminal />
        </div>
      </section>

      {/* ── 4. MCP ingress — it works both directions ───────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionLabel>or zero new commands</SectionLabel>
            <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
              Claude Code can drive the daemon — from inside its own loop
            </h2>
            <p className="mb-5 max-w-lg leading-relaxed text-fd-muted-foreground">
              The daemon is an MCP server. Register it once and the agent
              you already use gains agentproto&apos;s tools: it spawns real
              sessions on any adapter — observable, gateable, killable —
              instead of invisible native subagents.
            </p>
            <pre className="mb-4 max-w-lg overflow-x-auto border border-fd-border bg-fd-card p-4 font-mono text-[12.5px] leading-relaxed">
              <code>{`# Claude Code (native HTTP transport)
claude mcp add --transport http agentproto \\
  http://127.0.0.1:18790/mcp

# Codex, Cursor, Claude Desktop (stdio)
agentproto mcp-bridge`}</code>
            </pre>
            <a
              href="https://cli.agentproto.sh/docs/guides/mcp-in-coding-cli"
              className="font-medium text-fd-primary hover:underline"
            >
              Full guide: MCP inside coding CLIs →
            </a>
          </div>
          <div className="min-w-0 max-w-full overflow-hidden border border-[var(--term-line)] bg-[var(--term-bg)] shadow-[0_24px_50px_-20px_rgba(6,24,16,0.55)]">
            <div className="flex items-center gap-2.5 border-b border-[var(--term-line)] px-4 py-2.5">
              <span
                aria-hidden="true"
                className="session-blink h-2 w-2 shrink-0 rounded-full bg-[var(--phos)]"
              />
              <span className="font-mono text-xs text-[var(--term-dim)]">
                claude code — with agentproto tools
              </span>
            </div>
            <div className="overflow-x-auto whitespace-nowrap p-5 font-mono text-[13px] leading-[1.9] text-[var(--term-dim)]">
              <div className="min-w-[380px]">
                <div>
                  <span className="text-[var(--term-text)]">&gt;</span>{" "}
                  <span className="text-[var(--term-text)]">
                    spin up a codex session to fix the flaky test
                  </span>
                </div>
                <div className="mt-2">
                  ⏺ agentproto · <span className="text-[var(--term-text)]">agent_start</span>
                </div>
                <div>
                  {"  "}⎿ adapter codex · prompt &quot;fix the flaky test&quot;
                </div>
                <div>
                  {"  "}⎿ <span className="session-blink text-[var(--phos)]">●</span>{" "}
                  <span className="text-[var(--phos)]">s_9k2f</span> · running
                </div>
                <div className="mt-2">
                  ⏺ agentproto · <span className="text-[var(--term-text)]">session_monitor</span>{" "}
                  s_9k2f
                </div>
                <div>
                  {"  "}⎿ <span className="text-[var(--phos)]">✓</span> turn-end · gate
                  lint+test <span className="text-[var(--phos)]">passed</span>
                </div>
                <div className="mt-2 text-[var(--term-text)]">
                  Done — commit staged behind the gate,
                </div>
                <div className="text-[var(--term-text)]">
                  {"  "}awaiting your ack{" "}
                  <span className="session-blink text-[var(--amber)]">▶</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. What it is ───────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="border-t-2 border-fd-primary pt-5">
            <h2 className="mb-2 font-serif text-xl font-bold">One lifecycle</h2>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              The same start, prompt, monitor, and kill verbs across every
              adapter. Stop memorizing five different CLIs — one daemon, one
              interface, nine adapters today.
            </p>
          </div>
          <div className="border-t-2 border-fd-primary pt-5">
            <h2 className="mb-2 font-serif text-xl font-bold">Real supervision</h2>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              Policy gates fire on turn-end — shell command or LLM judge. A
              commit can be staged behind the gate and wait for an explicit
              human ack. It all survives a client disconnect.
            </p>
          </div>
          <div className="border-t-2 border-fd-primary pt-5">
            <h2 className="mb-2 font-serif text-xl font-bold">
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

      {/* ── 5. Adapters ─────────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>Adapters — live today</SectionLabel>
        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {ADAPTERS.map(adapter => (
            <li
              key={adapter.name}
              className="flex items-center justify-between gap-2 border border-fd-border bg-fd-card px-3 py-2.5"
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
              className="block border border-dashed border-fd-border bg-fd-card px-3 py-2.5 transition-colors hover:border-fd-primary/50"
            >
              <span className="font-mono text-sm text-fd-primary">yours?</span>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wide text-fd-muted-foreground">
                Write an adapter
              </span>
            </a>
          </li>
        </ul>
      </section>

      {/* ── 6. Supervision, on stage ────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionLabel>the part nobody else does</SectionLabel>
            <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
              A gate between your agents and your main branch
            </h2>
            <p className="mb-4 max-w-lg leading-relaxed text-fd-muted-foreground">
              Every session turn-end can trigger a policy: a shell command
              (lint, tests) or an LLM judge. The commit is staged behind the
              gate and waits for your explicit ack — from any client, or
              none. Close your laptop; the daemon keeps supervising.
            </p>
            <Link
              href="/features"
              className="font-medium text-fd-primary hover:underline"
            >
              Full features breakdown →
            </Link>
          </div>
          <div className="min-w-0 max-w-full overflow-hidden border border-[var(--term-line)] bg-[var(--term-bg)] shadow-[0_24px_50px_-20px_rgba(6,24,16,0.55)]">
            <div className="flex items-center gap-2.5 border-b border-[var(--term-line)] px-4 py-2.5">
              <span
                aria-hidden="true"
                className="session-blink h-2 w-2 shrink-0 rounded-full bg-[var(--amber)]"
              />
              <span className="font-mono text-xs text-[var(--term-dim)]">
                policy · session review · turn-end
              </span>
            </div>
            <div className="overflow-x-auto whitespace-nowrap p-5 font-mono text-[13px] leading-[1.9] text-[var(--term-dim)]">
              <div className="min-w-[340px]">
                <div>
                  turn-end <span className="text-[var(--term-text)]">review</span> · gate{" "}
                  <span className="text-[var(--term-text)]">lint+test</span> attached
                </div>
                <div>
                  <span className="text-[var(--phos)]">✓</span> pnpm lint — clean
                </div>
                <div>
                  <span className="text-[var(--phos)]">✓</span> pnpm test — 214 passed
                </div>
                <div>
                  <span className="text-[var(--phos)]">✓</span> judge: &ldquo;diff matches the brief&rdquo;
                </div>
                <div>
                  commit <span className="text-[var(--term-text)]">a41f9c2</span> staged
                  behind gate
                </div>
                <div className="text-[var(--amber)]">
                  <span className="session-blink">▶</span> awaiting human ack —{" "}
                  <span className="text-[var(--term-text)]">agentproto ack s_7f2k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Deep dives ───────────────────────────────────────── */}
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
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-fd-muted-foreground">
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
                className="group flex h-full flex-col border border-fd-border bg-fd-card p-6 transition-colors hover:border-fd-primary/50"
              >
                <span className="font-mono text-xs text-fd-primary">
                  {d.step}
                </span>
                <h3 className="mt-3 mb-2 font-serif text-xl font-bold group-hover:text-fd-primary">
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

      {/* ── 8. Honest split ─────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>errata, in advance</SectionLabel>
        <h2 className="mt-4 mb-3 font-serif text-2xl font-bold tracking-tight">
          What&apos;s real vs. roadmap
        </h2>
        <p className="mb-4 max-w-2xl leading-relaxed text-fd-muted-foreground">
          The CLI, the nine adapters above, and the orchestration/
          supervision primitives (nested orchestration, policy gates,
          fan-in monitoring, MCP composition) are live and used
          hands-on. The wider AIP spec family beyond that is an open
          roadmap — most of those packages are early scaffolding, not
          finished implementations. We&apos;d rather say that plainly
          than have you find out the hard way.
        </p>
        <Link href="/features" className="font-medium text-fd-primary hover:underline">
          Full features breakdown →
        </Link>
      </section>

      {/* ── 9. Specs pointer — the credibility floor ────────────── */}
      <section className="border-t border-fd-border py-14">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-fd-border bg-fd-card px-6 py-6 sm:px-8">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
              built on a written standard
            </p>
            <p className="mt-2 max-w-xl font-serif text-lg font-bold leading-snug">
              Every contract the daemon implements is specified in the open —
              the AIP family, AIP-1 through AIP-52.
            </p>
          </div>
          <Link
            href="/docs"
            className="shrink-0 border border-fd-foreground/80 px-5 py-2 font-medium transition-colors hover:border-fd-primary hover:text-fd-primary"
          >
            Read the specs →
          </Link>
        </div>
      </section>
    </main>
  )
}
