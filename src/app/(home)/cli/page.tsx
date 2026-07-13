import type { Metadata } from "next"
import Link from "next/link"
import { CopyCommand } from "@/components/copy-command"
import { QuickstartTerminal } from "@/components/quickstart-terminal"
import { SessionBoard } from "@/components/session-board"

export const metadata: Metadata = {
  title: "The CLI — your gateway to your agents | agentproto",
  description:
    "Run Claude Code, Codex, and any other coding agent in the background, see them all in one place — terminal or web — and check their work before it lands.",
}

const ADAPTERS: {
  name: string
  kind: string
  icon: string
  /** currentColor SVG rendered black — invert it in dark mode */
  mono?: boolean
}[] = [
  { name: "Claude Code", kind: "cli", icon: "/icons/adapters/claude.svg" },
  { name: "Claude SDK", kind: "sdk", icon: "/icons/adapters/anthropic.svg", mono: true },
  { name: "Codex", kind: "cli", icon: "/icons/adapters/openai.svg", mono: true },
  { name: "Hermes", kind: "cli", icon: "/icons/adapters/hermes.svg", mono: true },
  { name: "opencode", kind: "cli", icon: "/icons/adapters/opencode.svg", mono: true },
  { name: "Mastra Code", kind: "cli", icon: "/icons/adapters/mastra.svg", mono: true },
  { name: "Mastra Agent", kind: "sdk", icon: "/icons/adapters/mastra.svg", mono: true },
  { name: "OpenClaw", kind: "cli", icon: "/icons/adapters/openclaw.png" },
  { name: "Browser", kind: "target", icon: "/icons/adapters/browser.svg", mono: true },
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

/** Section eyebrow — mono label preceded by a short ultramarine rule. */
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
 * /cli — the product page for the human gateway: run, watch, and
 * gate your coding agents from the terminal or the web. The
 * framework story (composable primitives) lives on the homepage;
 * this page owns the babysitter wedge end-to-end.
 */
export default function CliPage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-6xl px-6">
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
            <span aria-hidden="true" className="session-blink mr-2 text-fd-primary">
              ▍
            </span>
            runs them · watches them · checks their work
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold leading-[1.07] tracking-tight text-balance sm:text-[3.4rem]">
            Let your coding agents work{" "}
            <em className="text-fd-primary">without you watching.</em>
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-fd-muted-foreground text-pretty">
            agentproto runs Claude Code, Codex, and any other coding agent
            in the background, shows them all in one place, and checks each
            one&apos;s work — with your tests or a reviewer model — before
            anything is committed. No more babysitting terminal windows.
          </p>
          <div className="mb-6">
            <CopyCommand command="npm i -g @agentproto/cli" />
          </div>
          <div className="mb-8 flex flex-wrap gap-3">
            <a
              href="https://cli.agentproto.sh"
              className="bg-fd-foreground px-5 py-2 font-medium text-fd-background transition-opacity hover:opacity-85"
            >
              Get started
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
            9 adapters · Apache-2.0 · npm{" "}
            <span className="text-fd-foreground">@agentproto/cli</span>
          </p>
        </div>
        <SessionBoard />
      </section>

      {/* ── 2. Problem → solution ───────────────────────────────── */}
      <section className="border-t border-fd-border py-14">
        <SectionLabel>the problem</SectionLabel>
        <h2 className="mt-4 mb-8 font-serif text-3xl font-bold tracking-tight text-balance">
          Coding agents made you the babysitter.
        </h2>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
              without agentproto
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-fd-muted-foreground">
              <li>One terminal per agent — you rotate between them all day.</li>
              <li>You read every diff yourself. Or nobody does.</li>
              <li>Close the laptop and everything dies mid-task.</li>
            </ul>
          </div>
          <div className="border-l-2 border-fd-primary pl-8 md:pl-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-fd-primary">
              with agentproto
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-fd-foreground">
              <li>Agents run in the background — one list shows them all.</li>
              <li>Your tests or a reviewer model check every step.</li>
              <li>
                Commits wait for a green check and your OK. Work continues
                without you.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. Quickstart ───────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionLabel>quickstart</SectionLabel>
            <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
              Three commands to a running, watchable agent
            </h2>
            <p className="max-w-md leading-relaxed text-fd-muted-foreground">
              Install, start, delegate. The session shows up in one list
              from the first second. Attach a check to it and walk away —
              the work continues, watched and gated, without you.
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

      {/* ── 4. Fleet, from anywhere ─────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>your gateway, on any screen</SectionLabel>
        <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
          One board for the whole fleet — terminal or web
        </h2>
        <p className="mb-8 max-w-2xl leading-relaxed text-fd-muted-foreground">
          The daemon is one gateway with three surfaces: CLI, HTTP, and MCP.
          Watch the session board in your terminal, open it as a live panel
          inside your MCP client, or expose the gateway through a named
          tunnel and check on your agents — and ack that staged commit —
          from another machine. The fleet is wherever you are.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-fd-border bg-fd-card p-5">
            <p className="font-mono text-xs text-fd-primary">terminal</p>
            <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
              <code className="text-fd-foreground">
                agentproto sessions --watch
              </code>{" "}
              — the live board where you already live.
            </p>
          </div>
          <div className="border border-fd-border bg-fd-card p-5">
            <p className="font-mono text-xs text-fd-primary">mcp panel</p>
            <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
              Session and fleet views render as MCP App panels inside
              clients that support them.
            </p>
          </div>
          <div className="border border-fd-border bg-fd-card p-5">
            <p className="font-mono text-xs text-fd-primary">tunnel</p>
            <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
              A named tunnel gives the gateway a stable HTTPS address —
              reach your fleet from anywhere you trust.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Your agent, promoted ─────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionLabel>your agent, promoted</SectionLabel>
            <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
              One agent can manage the others
            </h2>
            <p className="mb-5 max-w-lg leading-relaxed text-fd-muted-foreground">
              agentproto plugs into the agent you already use, as tools.
              Ask Claude Code to spin up a Codex session for a fix — or
              three cheap open-model sessions for the grunt work — and
              every one of them shows up in the same list, gated by the
              same checks. Visible child sessions, not invisible
              subagents. That&apos;s a team, run from your prompt.
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
                  ⏺ agentproto ·{" "}
                  <span className="text-[var(--term-text)]">agent_start</span>
                </div>
                <div>
                  {"  "}⎿ adapter codex · prompt &quot;fix the flaky test&quot;
                </div>
                <div>
                  {"  "}⎿{" "}
                  <span className="session-blink text-[var(--phos)]">●</span>{" "}
                  <span className="text-[var(--phos)]">s_9k2f</span> · running
                </div>
                <div className="mt-2">
                  ⏺ agentproto ·{" "}
                  <span className="text-[var(--term-text)]">
                    session_monitor
                  </span>{" "}
                  s_9k2f
                </div>
                <div>
                  {"  "}⎿ <span className="text-[var(--phos)]">✓</span> turn-end
                  · gate lint+test{" "}
                  <span className="text-[var(--phos)]">passed</span>
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

      {/* ── 5b. Orchestration — fleet with receipts ─────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="min-w-0 max-w-full overflow-hidden border border-[var(--term-line)] bg-[var(--term-bg)] shadow-[0_24px_50px_-20px_rgba(6,24,16,0.55)]">
            <div className="flex items-center gap-2.5 border-b border-[var(--term-line)] px-4 py-2.5">
              <span
                aria-hidden="true"
                className="session-blink h-2 w-2 shrink-0 rounded-full bg-[var(--phos)]"
              />
              <span className="font-mono text-xs text-[var(--term-dim)]">
                agentproto sessions tree
              </span>
            </div>
            <div className="overflow-x-auto whitespace-nowrap p-5 font-mono text-[13px] leading-[1.9] text-[var(--term-dim)]">
              <div className="min-w-[400px]">
                <div>
                  <span className="text-[var(--phos)]">●</span>{" "}
                  <span className="text-[var(--phos)]">s_2del</span>{" "}
                  <span className="text-[var(--term-text)]">supervisor</span> ·
                  claude-code · &quot;ship the release&quot;
                </div>
                <div>
                  ├─ <span className="text-[var(--phos)]">●</span> s_9k2f{" "}
                  executor · codex · &quot;fix flaky test&quot; · gate{" "}
                  <span className="text-[var(--phos)]">✓</span>
                </div>
                <div>
                  ├─ <span className="text-[var(--phos)]">●</span> s_x1a4{" "}
                  executor · hermes/glm · &quot;lint sweep&quot; · gate{" "}
                  <span className="text-[var(--phos)]">✓</span>
                </div>
                <div>
                  └─ <span className="session-blink text-[var(--phos)]">●</span>{" "}
                  s_p8c3 executor · hermes/glm · &quot;changelog&quot; ·{" "}
                  <span className="text-[var(--term-text)]">running</span>
                </div>
                <div className="mt-2">
                  fan-in: <span className="text-[var(--term-text)]">waiting on 1 of 3</span>
                </div>
                <div>
                  cron: <span className="text-[var(--term-text)]">nightly-audit</span>{" "}
                  in 6h 12m
                </div>
              </div>
            </div>
          </div>
          <div>
            <SectionLabel>orchestration</SectionLabel>
            <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
              From one agent to a fleet — without losing the plot
            </h2>
            <p className="mb-5 max-w-lg leading-relaxed text-fd-muted-foreground">
              The whole tree is real, visible sessions — who spawned whom,
              what each one costs, which gate it&apos;s behind.
            </p>
            <ul className="space-y-4">
              <li className="border-l-2 border-fd-primary pl-5">
                <p className="font-medium">Roles keep delegation sane</p>
                <p className="text-sm leading-relaxed text-fd-muted-foreground">
                  Executors do the work and can&apos;t spawn; supervisors
                  delegate, with depth and children caps enforced by the
                  daemon. No runaway agent pyramids.
                </p>
              </li>
              <li className="border-l-2 border-fd-primary pl-5">
                <p className="font-medium">One call waits on the whole fan-out</p>
                <p className="text-sm leading-relaxed text-fd-muted-foreground">
                  <code className="text-fd-foreground">sessions wait</code>{" "}
                  blocks until any of N sessions finishes a step — no
                  polling loops, in the CLI or over HTTP/MCP.
                </p>
              </li>
              <li className="border-l-2 border-fd-primary pl-5">
                <p className="font-medium">Workflows and cron, on the daemon</p>
                <p className="text-sm leading-relaxed text-fd-muted-foreground">
                  Ordered stages of concurrent steps, output validated
                  against a schema, per-run cost ceilings — scheduled
                  nightly if you want. It runs whether you&apos;re there or
                  not.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. What it is ───────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="border-t-2 border-fd-primary pt-5">
            <h2 className="mb-2 font-serif text-xl font-bold">
              Run them all the same way
            </h2>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              Start, message, watch, and stop any agent with the same
              commands — Claude Code, Codex, Hermes, opencode, Mastra. Nine
              adapters today. No more memorizing five different CLIs.
            </p>
          </div>
          <div className="border-t-2 border-fd-primary pt-5">
            <h2 className="mb-2 font-serif text-xl font-bold">
              Work checked before it lands
            </h2>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              Attach a check — your tests, or a stronger model reviewing the
              change — and it runs each time the agent finishes. Commits wait
              for the check and your OK, even after you close your laptop.
              No more merging code nobody read.
            </p>
          </div>
          <div className="border-t-2 border-fd-primary pt-5">
            <h2 className="mb-2 font-serif text-xl font-bold">
              Keep the tools you have
            </h2>
            <p className="text-sm leading-relaxed text-fd-muted-foreground">
              It drives the agent CLIs you already use — nothing to rewrite,
              no framework to adopt. And because everything is exposed over
              MCP, your agents can even run and check other agents. Nothing
              locks you in.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. Adapters ─────────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>nine adapters, live today</SectionLabel>
        <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
          Mix vendors. Route by cost.
        </h2>
        <p className="mb-6 max-w-2xl leading-relaxed text-fd-muted-foreground">
          Claude for the plan, Codex for the refactor, a cheap open model
          for the mechanical work — same commands, same list, same checks.
          When a better or cheaper model ships, it&apos;s an adapter away,
          not a migration. No vendor decides what your fleet looks like.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {ADAPTERS.map(adapter => (
            <li
              key={adapter.name}
              className="flex items-center justify-between gap-2 border border-fd-border bg-fd-card px-3 py-2.5"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={adapter.icon}
                  alt=""
                  aria-hidden="true"
                  width={16}
                  height={16}
                  className={
                    "h-4 w-4 shrink-0 object-contain" +
                    (adapter.mono ? " dark:invert" : "")
                  }
                />
                <span className="truncate font-mono text-sm">
                  {adapter.name}
                </span>
              </span>
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

      {/* ── 8. Supervision, on stage ────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionLabel>the part nobody else does</SectionLabel>
            <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
              A gate between your agents and your main branch
            </h2>
            <p className="mb-4 max-w-lg leading-relaxed text-fd-muted-foreground">
              Every time an agent finishes a step, a check you choose runs:
              a shell command (lint, tests) or a stronger model acting as
              reviewer. The commit waits behind that check for your explicit
              OK — from any device, or none. Close your laptop; the checks
              keep running.
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
                  turn-end <span className="text-[var(--term-text)]">review</span>{" "}
                  · gate <span className="text-[var(--term-text)]">lint+test</span>{" "}
                  attached
                </div>
                <div>
                  <span className="text-[var(--phos)]">✓</span> pnpm lint — clean
                </div>
                <div>
                  <span className="text-[var(--phos)]">✓</span> pnpm test — 214
                  passed
                </div>
                <div>
                  <span className="text-[var(--phos)]">✓</span> judge:{" "}
                  &ldquo;diff matches the brief&rdquo;
                </div>
                <div>
                  commit <span className="text-[var(--term-text)]">a41f9c2</span>{" "}
                  staged behind gate
                </div>
                <div className="text-[var(--amber)]">
                  <span className="session-blink">▶</span> awaiting human ack —{" "}
                  <span className="text-[var(--term-text)]">
                    agentproto ack s_7f2k
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Deep dives ───────────────────────────────────────── */}
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
    </main>
  )
}
