export const metadata = {
  title: "agentproto vs Claude Squad, Conductor, Agent Farm | agentproto",
  description:
    "An honest comparison: interactive cockpits for parallel coding-agent sessions vs. a daemon with a programmatic lifecycle and supervision primitives.",
}

interface Row {
  dimension: string
  agentproto: string
  claudeSquad: string
  conductor: string
  agentFarm: string
}

const ROWS: Row[] = [
  {
    dimension: "Agents supported",
    agentproto:
      "Claude Code, Codex, Hermes, opencode, Mastra (Code + Agent), claude-sdk (Anthropic/Moonshot/OpenRouter), OpenClaw, browser-as-agent — uniform AIP-45 manifests",
    claudeSquad: "Claude Code, Codex, Gemini, Aider, other local agents",
    conductor: "Claude Code, Codex, Cursor",
    agentFarm: "Claude Code only (by design)",
  },
  {
    dimension: "Interface",
    agentproto:
      "Daemon with CLI + HTTP + MCP surfaces; scriptable from code, another agent, or cron — no terminal required",
    claudeSquad: "Interactive terminal TUI (human sits in it)",
    conductor: "Mac desktop app (human sits in it)",
    agentFarm: "Python script / batch CLI",
  },
  {
    dimension: "Isolation",
    agentproto:
      "Daemon-tracked sessions; git-worktree isolation; sandbox provider family landing (local shipped, e2b microVM in progress)",
    claudeSquad: "tmux session per agent + git worktree per branch",
    conductor: "Isolated workspace per agent",
    agentFarm: "tmux panes + lock-based file coordination",
  },
  {
    dimension: "Programmatic API",
    agentproto:
      "Yes — spawn/prompt/monitor/kill/export over MCP or HTTP; fan-in monitor; usage/cost introspection",
    claudeSquad: "No — TUI app",
    conductor: "No — desktop app",
    agentFarm: "Partial — configurable script, not a long-lived API",
  },
  {
    dimension: "Durable supervision / policy gates",
    agentproto:
      "Yes — shell or LLM-judge gate on turn-end, event bus, commit gated on human ack; survives client disconnect",
    claudeSquad: "No — human watches the TUI",
    conductor: "No — human reviews in the app",
    agentFarm: "Partial — workload watchdog (auto-restart), not per-turn gates",
  },
  {
    dimension: "Nested orchestration",
    agentproto:
      "Yes — scoped sub-gateways, executor/supervisor role gating, depth/children caps",
    claudeSquad: "No",
    conductor: "No",
    agentFarm: "Partial — fans one workload across N agents",
  },
  {
    dimension: "MCP surface",
    agentproto:
      "Yes — the daemon is an MCP server (~90 tools); agents can mount external MCP servers",
    claudeSquad: "No",
    conductor: "No",
    agentFarm: "No",
  },
  {
    dimension: "License / platform",
    agentproto: "Apache-2.0 — cross-platform daemon + CLI (macOS + Linux verified)",
    claudeSquad: "AGPL-3.0 — cross-platform TUI (requires tmux + gh)",
    conductor: "Closed source — macOS only",
    agentFarm: "MIT — cross-platform (Python 3.13+, tmux, Claude Code)",
  },
]

const CELL = "border border-fd-border px-3 py-2 align-top"

/**
 * /compare — the honest comparison page, linked from the Show HN
 * first comment. Framing: these tools are cockpits you sit inside;
 * agentproto is the daemon you script against. They can compose.
 */
export default function ComparePage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-5xl px-6 py-12">
      <header className="mb-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
          <span
            aria-hidden="true"
            className="mr-3 inline-block h-0.5 w-6 translate-y-[-3px] bg-fd-primary align-middle"
          />
          the honest comparison
        </p>
        <h1 className="mb-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          agentproto vs Claude Squad, Conductor, Agent Farm
        </h1>
        <p className="text-fd-muted-foreground leading-relaxed">
          The honest framing first: these four tools are not really
          competitors.{" "}
          <a
            href="https://github.com/smtg-ai/claude-squad"
            className="text-fd-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claude Squad
          </a>
          ,{" "}
          <a
            href="https://conductor.build"
            className="text-fd-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conductor
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/Dicklesworthstone/claude_code_agent_farm"
            className="text-fd-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agent Farm
          </a>{" "}
          are interactive tools a human sits inside of to run several
          coding-agent sessions at once — and they are good at that.
          agentproto is a daemon with a programmatic lifecycle you call from
          code, from another agent, or from cron. The supervision primitives
          it adds — durable policy gates, multiplexed fan-in monitoring,
          nested orchestration — do not exist in the other three.
        </p>
      </header>

      <section className="mb-12 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="text-left">
              <th className={CELL}>Dimension</th>
              <th className={CELL}>agentproto</th>
              <th className={CELL}>Claude Squad</th>
              <th className={CELL}>Conductor</th>
              <th className={CELL}>Agent Farm</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => (
              <tr key={row.dimension}>
                <td className={`${CELL} font-medium`}>{row.dimension}</td>
                <td className={CELL}>{row.agentproto}</td>
                <td className={CELL}>{row.claudeSquad}</td>
                <td className={CELL}>{row.conductor}</td>
                <td className={CELL}>{row.agentFarm}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-fd-muted-foreground">
          Facts sourced from each project&apos;s own page, 2026-07-07.
          Corrections welcome — file an issue.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 font-serif text-xl font-bold">When to use which</h2>
        <ul className="space-y-3 text-fd-muted-foreground leading-relaxed">
          <li>
            <strong className="text-fd-foreground">Claude Squad</strong> — you
            want a terminal cockpit for a handful of parallel sessions with
            git worktrees, reviewing each by hand.
          </li>
          <li>
            <strong className="text-fd-foreground">Conductor</strong> — same
            workflow, polished Mac app, across Claude Code, Codex and Cursor.
          </li>
          <li>
            <strong className="text-fd-foreground">Agent Farm</strong> — you
            have a lint/type-fix queue and want to throw ~50 Claude Code
            instances at it and get an HTML report.
          </li>
          <li>
            <strong className="text-fd-foreground">agentproto</strong> — you
            want to drive coding agents from code or cron, with gates that
            survive a client disconnect, fan-in monitoring over N sessions,
            and children that can be granted their own scoped orchestration
            gateway.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 font-serif text-xl font-bold">They can compose</h2>
        <p className="text-fd-muted-foreground leading-relaxed">
          agentproto does not replace the cockpits. A tool like Claude Squad
          or Conductor could mount the agentproto MCP server and get durable
          policy gates and multiplexed monitoring for free, instead of
          hand-rolling a tmux + Redis watchdog around its panes. Interactive
          cockpit on top, supervised daemon underneath, any adapter either
          side wants to drive.
        </p>
      </section>
    </main>
  )
}
