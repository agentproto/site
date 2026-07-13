import Link from "next/link"
import { CopyCommand } from "@/components/copy-command"

const LAYERS = [
  {
    layer: "Identity",
    question: "Who acts?",
    aips: "OPERATOR · IDENTITY · PERSONA",
  },
  {
    layer: "Memory",
    question: "What does the agent remember?",
    aips: "KNOWLEDGE · LESSON · PLAYBOOK",
  },
  {
    layer: "Capabilities",
    question: "What can it do?",
    aips: "SKILL · TOOL · WORKFLOW · INTENT",
  },
  {
    layer: "Drivers",
    question: "How is it actually implemented?",
    aips: "DRIVER · CLI · HTTP · MCP · SDK",
  },
  {
    layer: "Work & governance",
    question: "What gets done, under what rules?",
    aips: "COMPANY · GOVERNANCE · WORK · OFFICE",
  },
  {
    layer: "Surfaces",
    question: "What does it produce or read?",
    aips: "DESIGN · CANVAKIT · CODE",
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
 * Home page — the framework story. agentproto is first a set of
 * composable primitives for composable agents, usable with any
 * library (Mastra, AI SDK, MCP, your own). The human gateway — the
 * CLI that runs and supervises coding agents — has its own page at
 * /cli; this page sells the primitives and bridges to it.
 */
export default function HomePage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-6xl px-6">
      {/* ── 1. Hero — the primitives ────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
            <span aria-hidden="true" className="session-blink mr-2 text-fd-primary">
              ▍
            </span>
            open specs · typescript runtime · any library
          </p>
          <h1 className="mb-6 font-serif text-4xl font-bold leading-[1.07] tracking-tight text-balance sm:text-[3.4rem]">
            Composable primitives for{" "}
            <em className="text-fd-primary">composable agents.</em>
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-fd-muted-foreground text-pretty">
            Tools, skills, agents, knowledge, workflows, policies — every
            part of an agent defined once, as a file with a declared
            contract. Use them with Mastra, the Vercel AI SDK, MCP, or your
            own stack. Open numbered specs; a TypeScript runtime that loads,
            runs, and projects them.
          </p>
          <div className="mb-6">
            <CopyCommand command="npm i @agentproto/tool @agentproto/driver" />
          </div>
          <div className="mb-8 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="bg-fd-foreground px-5 py-2 font-medium text-fd-background transition-opacity hover:opacity-85"
            >
              Read the specs
            </Link>
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
            Apache-2.0 ·{" "}
            <Link href="/cli" className="text-fd-primary hover:underline">
              running coding agents? → the CLI
            </Link>
          </p>
        </div>
      </section>

      {/* ── 2. The primitive, shown ─────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>one contract, many hosts</SectionLabel>
        <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
          Define once. Run in any framework.
        </h2>
        <p className="mb-8 max-w-2xl leading-relaxed text-fd-muted-foreground">
          A tool declares its contract — schemas, side-effects, approval
          class. Implementations are drivers: in-process, CLI, HTTP, MCP.
          The same tool projects into whichever host you build with, so a
          new framework is a projection, not a rewrite.
        </p>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <pre className="min-w-0 overflow-x-auto border border-fd-border bg-fd-card p-5 font-mono text-[12.5px] leading-relaxed">
            <code>{`import { defineTool } from "@agentproto/tool"
import { implementTool } from "@agentproto/driver"
import { z } from "zod"

const greet = defineTool({
  id: "greet",
  inputSchema: z.object({ name: z.string() }),
  outputSchema: z.object({ greeting: z.string() }),
})

const impl = implementTool(greet, async ({ input }) => ({
  greeting: \`Hello \${input.name}\`,
}))`}</code>
          </pre>
          <div className="flex min-w-0 flex-col gap-4">
            <pre className="overflow-x-auto border border-fd-border bg-fd-card p-4 font-mono text-[12.5px] leading-relaxed">
              <code>{`// Mastra
toMastraTool(impl)`}</code>
            </pre>
            <pre className="overflow-x-auto border border-fd-border bg-fd-card p-4 font-mono text-[12.5px] leading-relaxed">
              <code>{`// Vercel AI SDK
toAiSdkTool(impl)`}</code>
            </pre>
            <pre className="overflow-x-auto border border-fd-border bg-fd-card p-4 font-mono text-[12.5px] leading-relaxed">
              <code>{`// MCP / CLI / HTTP
serveTool(impl)`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── 3. The component map ────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>the component map</SectionLabel>
        <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
          Everything an agent is, as files with contracts
        </h2>
        <p className="mb-8 max-w-2xl leading-relaxed text-fd-muted-foreground">
          Every serious agent system converged on the same shape — a folder
          of markdown files the agent reads, writes, and runs from. The AIP
          specs give that shape a shared vocabulary: one numbered spec per
          primitive, aligned with the de-facto standards (SKILL.md as
          Anthropic shipped it, AGENTS.md, CLAUDE.md), not forks of them.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAYERS.map(l => (
            <div key={l.layer} className="border border-fd-border bg-fd-card p-5">
              <h3 className="font-serif text-lg font-bold">{l.layer}</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">
                {l.question}
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-fd-primary">
                {l.aips}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-fd-muted-foreground">
          52 numbered specs, 8 layers ·{" "}
          <Link href="/docs" className="text-fd-primary hover:underline">
            browse the registry →
          </Link>
        </p>
      </section>

      {/* ── 4. The payoff — agents author their own parts ───────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionLabel>why files, why contracts</SectionLabel>
            <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight text-balance">
              Agents that improve their own components
            </h2>
            <p className="max-w-lg leading-relaxed text-fd-muted-foreground">
              Because every component is a file with a declared contract,
              an agent can extend itself with ordinary file operations —
              no research project, no plugin API. Self-modification becomes
              a <code className="text-fd-foreground">write_file</code> call
              the runtime can validate and you can gate.
            </p>
          </div>
          <ul className="space-y-4">
            <li className="border-l-2 border-fd-primary pl-5">
              <p className="font-medium">Add a tool</p>
              <p className="text-sm leading-relaxed text-fd-muted-foreground">
                Write a TOOL.md contract and a DRIVER.md implementation to
                disk. The runtime picks them up.
              </p>
            </li>
            <li className="border-l-2 border-fd-primary pl-5">
              <p className="font-medium">Swap a provider</p>
              <p className="text-sm leading-relaxed text-fd-muted-foreground">
                One tool, many drivers — add a second driver and update
                policy. No caller changes.
              </p>
            </li>
            <li className="border-l-2 border-fd-primary pl-5">
              <p className="font-medium">Fix a bug in itself</p>
              <p className="text-sm leading-relaxed text-fd-muted-foreground">
                Edit the driver body, rerun the contract&apos;s validators,
                ship — gated by the same checks as any other change.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ── 5. Bridge — primitives need a place to run ──────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="border border-fd-border bg-fd-card px-6 py-8 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="min-w-0">
              <SectionLabel>the human gateway</SectionLabel>
              <h2 className="mt-4 mb-3 font-serif text-2xl font-bold tracking-tight text-balance">
                Primitives need a place to run. And someone needs to see
                them.
              </h2>
              <p className="max-w-xl leading-relaxed text-fd-muted-foreground">
                The agentproto CLI + daemon run your coding agents in the
                background — Claude Code, Codex, open models, all in one
                list, terminal or web — and check each one&apos;s work
                before it&apos;s committed. Built entirely on the
                primitives above.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <pre className="max-w-full overflow-x-auto font-mono text-[12.5px] leading-relaxed text-fd-muted-foreground">
                <code>{`npm i -g @agentproto/cli
agentproto serve`}</code>
              </pre>
              <Link
                href="/cli"
                className="bg-fd-foreground px-5 py-2 font-medium text-fd-background transition-opacity hover:opacity-85"
              >
                The CLI — run &amp; supervise agents →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Honest split ─────────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>errata, in advance</SectionLabel>
        <h2 className="mt-4 mb-3 font-serif text-2xl font-bold tracking-tight">
          What&apos;s real vs. roadmap
        </h2>
        <p className="mb-4 max-w-2xl leading-relaxed text-fd-muted-foreground">
          The tool/driver primitives, the CLI, nine agent adapters, and the
          orchestration/supervision layer (nested orchestration, policy
          gates, fan-in monitoring, MCP composition) are live and used
          hands-on. The wider AIP spec family beyond that is an open
          roadmap — most of those packages are early scaffolding, not
          finished implementations. We&apos;d rather say that plainly than
          have you find out the hard way.
        </p>
        <Link href="/features" className="font-medium text-fd-primary hover:underline">
          Full features breakdown →
        </Link>
      </section>
    </main>
  )
}
