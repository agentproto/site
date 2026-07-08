import Link from "next/link"

export const metadata = {
  title: "Features — what's live vs. roadmap | agentproto",
  description:
    "The honest Tier 1 / Tier 2 split: what agentproto ships and verifiably runs today, and what is still spec-only roadmap.",
}

const TIER1 = [
  {
    title: "One daemon + CLI over every adapter",
    body: "agentproto <verb> — auth, daemon, install, run, chat, sessions, serve, tunnel, browser, mcp-bridge, onboard, cron, pack and more. Nine adapters ship today (Claude Code, Claude SDK with Anthropic/Moonshot/OpenRouter gateway modes, Codex, Hermes, opencode, Mastra Code + in-process, Mastra Agent, OpenClaw, browser-as-agent), each self-declaring its models and modes via an AIP-45 manifest.",
  },
  {
    title: "Uniform agent lifecycle",
    body: "Spawn, prompt, tail output, export a full conversation to markdown, kill, list — the same verbs whether the CLI underneath is Claude Code or Hermes. Session descriptors carry pid, liveness, cost and token usage.",
  },
  {
    title: "Durable policy gates",
    body: "Attach a completion gate (shell command or LLM judge) to a session's turn-end. policy:passed / policy:failed fire on an event bus; a commit can be staged behind the gate and wait for an explicit human ack. Survives with no client attached.",
  },
  {
    title: "Nested orchestration with role gating",
    body: "Any spawned agent can become a scoped orchestrator with its own sub-gateway to spawn and supervise children — executor roles cannot delegate, supervisor roles can, with depth and children caps enforced by the daemon.",
  },
  {
    title: "Fan-in monitoring",
    body: "One long-poll call blocks until any of N watched sessions fires a lifecycle event — orchestration over many agents without an N-way polling loop. Scriptable from REST, MCP, or `agentproto sessions wait`.",
  },
  {
    title: "Workflows, routines, and cron",
    body: "WorkflowRunner executes ordered stages of concurrent steps with explicit barriers, session reuse across stages, output-schema validation with retries, and per-run cost ceilings. A durable cron scheduler lives on the daemon.",
  },
  {
    title: "MCP composition",
    body: "The daemon is itself an MCP server (~90 tools), and any spawned agent can mount external MCP servers at spawn time — including the daemon's own orchestration gateway, scoped.",
  },
  {
    title: "Terminals, browsers, tunnels, packs",
    body: "PTY sessions, a stealth browser as an agent target, Cloudflare tunnels to expose a local daemon over HTTPS, and installable skill packs (`agentproto pack skill` / `install skill/<slug>`).",
  },
]

/**
 * /features — the honest Tier 1 / Tier 2 split, linked from the
 * Show HN first comment and the README. Tier 1 mirrors the grounded
 * feature inventory; Tier 2 is stated plainly as roadmap.
 */
export default function FeaturesPage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">
          What&apos;s live today — and what isn&apos;t yet
        </h1>
        <p className="text-fd-muted-foreground leading-relaxed">
          Two tiers, kept deliberately apart. Tier 1 is shipped software you
          can run right now, verified hands-on. Tier 2 is the wider AIP spec
          family: real specifications, real intent, not yet operational
          software. We&apos;d rather say that plainly than have you find out
          the hard way.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Tier 1 — live and working
        </h2>
        <ul className="space-y-4">
          {TIER1.map(f => (
            <li key={f.title} className="rounded-md border border-fd-border p-4">
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed">
                {f.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">
          Tier 2 — the AIP spec family (roadmap)
        </h2>
        <p className="text-fd-muted-foreground leading-relaxed mb-3">
          The repo carries ~52 numbered AIP specs. Beyond the ones backing
          Tier 1, most reference-implementation packages are 0.1.0-alpha
          scaffolding — schemas and intent, with build/validate bodies still
          to be written. They are an open standard being implemented in
          public, not shipped capability. If you find a Tier 2 claim
          anywhere that reads as shipped, file an issue — this split is the
          contract.
        </p>
        <Link href="/docs" className="text-fd-primary font-medium">
          Browse the full AIP registry →
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Compare</h2>
        <p className="text-fd-muted-foreground leading-relaxed">
          Wondering how this relates to Claude Squad, Conductor, or Agent
          Farm?{" "}
          <Link href="/compare" className="text-fd-primary font-medium">
            Read the honest comparison →
          </Link>
        </p>
      </section>
    </main>
  )
}
