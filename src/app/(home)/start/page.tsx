import type { Metadata } from "next"
import Link from "next/link"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import { ClaimText, PendingMarker } from "@/components/claim"
import { CopyCommand } from "@/components/copy-command"
import { SectionLabel } from "@/components/section-label"
import { CLAIMS, isVisible, type Claim } from "@/content/claims"

export const metadata: Metadata = {
  title: "Get started",
  description:
    "Install agentproto, run the daemon, connect Claude Code, Cursor, Codex or Claude Desktop, and start your first agent session.",
}

/** The `agentproto setup` wizard, one row per step (SETUP-PLAN.md). */
const WIZARD: { step: string; claim: Claim }[] = [
  { step: "preflight", claim: CLAIMS.setupPreflight },
  { step: "workspace", claim: CLAIMS.setupWorkspace },
  { step: "daemon", claim: CLAIMS.setupDaemon },
  { step: "agents", claim: CLAIMS.setupAgents },
  { step: "auth", claim: CLAIMS.setupAuth },
  { step: "clients", claim: CLAIMS.setupClients },
  { step: "skills", claim: CLAIMS.setupSkills },
  { step: "first run", claim: CLAIMS.setupFirstRun },
]

const CLIENTS: { name: string; agent: string; claim: Claim }[] = [
  { name: "Claude Code", agent: "claude", claim: CLAIMS.clientClaudeCode },
  { name: "Cursor", agent: "cursor", claim: CLAIMS.clientCursor },
  { name: "Codex", agent: "codex", claim: CLAIMS.clientCodex },
  {
    name: "Claude Desktop",
    agent: "claude-desktop",
    claim: CLAIMS.clientClaudeDesktop,
  },
]

const MANUAL: { claim: Claim; commands: string[] }[] = [
  { claim: CLAIMS.manualCli, commands: ["npm i -g @agentproto/cli"] },
  {
    claim: CLAIMS.manualDaemon,
    commands: ["agentproto daemon install", "agentproto serve"],
  },
  { claim: CLAIMS.manualAgent, commands: ["agentproto install claude-code"] },
  {
    claim: CLAIMS.manualAuth,
    commands: [
      "agentproto auth discover",
      "agentproto auth profile import claude-code anthropic",
    ],
  },
  { claim: CLAIMS.manualClients, commands: ["agentproto install-mcp --all"] },
  {
    claim: CLAIMS.manualSkills,
    commands: ["agentproto install skill/agentproto-pack"],
  },
  {
    claim: CLAIMS.manualFirstRun,
    commands: [
      'agentproto sessions start claude-code --prompt "say hello" --attach',
    ],
  },
]

function Commands({ lines }: { lines: string[] }): React.ReactElement {
  return (
    <pre className="mt-3 min-w-0 overflow-x-auto border border-[var(--term-line)] bg-[var(--term-bg)] p-4 font-mono text-[12.5px] leading-relaxed text-[var(--term-text)]">
      <code>
        {lines.map(line => (
          <span key={line} className="block">
            <span aria-hidden="true" className="text-[var(--term-dim)]">
              ${" "}
            </span>
            {line}
          </span>
        ))}
      </code>
    </pre>
  )
}

/**
 * /start: the onboarding page. Hero command, what `agentproto setup`
 * does step by step, per-client tabs, the manual path that works today,
 * troubleshooting, then the phone and local-model extras.
 *
 * Copy comes from src/content/claims.ts; the wizard, doctor and phone
 * rows are pending until they ship in a CLI release.
 */
export default function StartPage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-4xl px-6">
      {/* ── 1. Hero command ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <SectionLabel>get started</SectionLabel>
        <h1 className="mt-4 mb-4 font-serif text-4xl font-bold leading-[1.07] tracking-tight text-balance sm:text-5xl">
          From zero to a running agent.
        </h1>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-fd-muted-foreground text-pretty">
          One command will walk you through it. Until it ships, the manual
          path below works today.
        </p>
        {isVisible(CLAIMS.setupCommand) && (
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <CopyCommand command={CLAIMS.setupCommand.text} />
            {CLAIMS.setupCommand.status === "pending" && <PendingMarker />}
          </div>
        )}
        <p className="font-mono text-xs text-fd-muted-foreground">
          works today:{" "}
          <a href="#manual" className="text-fd-primary hover:underline">
            manual install →
          </a>
        </p>
      </section>

      {/* ── 2. What setup does ──────────────────────────────────── */}
      {isVisible(CLAIMS.setupCommand) && (
        <section className="border-t border-fd-border py-16">
          <SectionLabel>what agentproto setup does</SectionLabel>
          <h2 className="mt-4 mb-3 flex flex-wrap items-center gap-3 font-serif text-3xl font-bold tracking-tight">
            Eight steps, each one skippable
            {CLAIMS.setupCommand.status === "pending" && <PendingMarker />}
          </h2>
          <ClaimText
            claim={CLAIMS.setupBehaviour}
            className="mb-8 max-w-2xl leading-relaxed"
          />
          <ol className="divide-y divide-fd-border border border-fd-border bg-fd-card">
            {WIZARD.map((row, i) => (
              <li
                key={row.step}
                className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <p className="font-mono text-sm text-fd-primary">
                  <span className="text-fd-muted-foreground">{i + 1}.</span>{" "}
                  {row.step}
                </p>
                <ClaimText claim={row.claim} className="text-sm leading-relaxed" />
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ── 3. Per-client tabs ──────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>your coding client</SectionLabel>
        <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight">
          Connect the client you already use
        </h2>
        <ClaimText
          claim={CLAIMS.clientsIntro}
          className="mb-6 max-w-2xl leading-relaxed text-fd-muted-foreground"
        />
        <Tabs items={CLIENTS.map(c => c.name)}>
          {CLIENTS.map(c => (
            <Tab key={c.name} value={c.name}>
              <ClaimText claim={c.claim} className="text-sm leading-relaxed" />
              <Commands lines={[`agentproto install-mcp --agent ${c.agent}`]} />
              <p className="mt-3 text-sm text-fd-muted-foreground">
                Undo with{" "}
                <code className="font-mono text-fd-foreground">
                  agentproto install-mcp --agent {c.agent} --uninstall
                </code>
                .
              </p>
            </Tab>
          ))}
        </Tabs>
      </section>

      {/* ── 4. Manual install ───────────────────────────────────── */}
      <section id="manual" className="scroll-mt-20 border-t border-fd-border py-16">
        <SectionLabel>manual install</SectionLabel>
        <h2 className="mt-4 mb-3 font-serif text-3xl font-bold tracking-tight">
          The path that works today
        </h2>
        <p className="mb-8 max-w-2xl leading-relaxed text-fd-muted-foreground">
          The same steps, one verb at a time.
        </p>
        <ol className="space-y-8">
          {MANUAL.filter(m => isVisible(m.claim)).map((m, i) => (
            <li key={m.claim.id} className="min-w-0">
              <div className="flex gap-3">
                <span className="font-mono text-sm text-fd-primary">
                  {i + 1}.
                </span>
                <ClaimText claim={m.claim} className="leading-relaxed" />
              </div>
              <Commands lines={m.commands} />
            </li>
          ))}
        </ol>
      </section>

      {/* ── 5. Troubleshooting ──────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <SectionLabel>troubleshooting</SectionLabel>
        <h2 className="mt-4 mb-6 font-serif text-3xl font-bold tracking-tight">
          Something off?
        </h2>
        <div className="space-y-6">
          {isVisible(CLAIMS.doctor) && (
            <div>
              <ClaimText claim={CLAIMS.doctor} className="leading-relaxed" />
              <Commands lines={["agentproto doctor"]} />
            </div>
          )}
          {isVisible(CLAIMS.doctorJson) && (
            <div>
              <ClaimText claim={CLAIMS.doctorJson} className="leading-relaxed" />
              <Commands lines={["agentproto doctor --json > doctor.json"]} />
            </div>
          )}
          <p className="leading-relaxed">
            <a
              href="https://github.com/agentproto/ts/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fd-primary"
            >
              <ClaimText as="span" claim={CLAIMS.troubleshootIssue} />
            </a>
          </p>
        </div>
      </section>

      {/* ── 6. Connect your phone ───────────────────────────────── */}
      {isVisible(CLAIMS.phoneConnect) && (
        <section className="border-t border-fd-border py-16">
          <SectionLabel>connect your phone</SectionLabel>
          <h2 className="mt-4 mb-4 font-serif text-3xl font-bold tracking-tight">
            Your agents, in your pocket
          </h2>
          <ClaimText claim={CLAIMS.phoneConnect} className="leading-relaxed" />
          <Commands lines={["agentproto remote enable --qr"]} />
          <p className="mt-3 text-sm text-fd-muted-foreground">
            Close it with{" "}
            <code className="font-mono text-fd-foreground">
              agentproto remote disable
            </code>
            .
          </p>
        </section>
      )}

      {/* ── 7. Optional: a local model ──────────────────────────── */}
      {isVisible(CLAIMS.localModel) && (
        <section className="border-t border-fd-border py-16">
          <SectionLabel>optional · local model</SectionLabel>
          <h2 className="mt-4 mb-4 font-serif text-3xl font-bold tracking-tight">
            Bring a model from your network
          </h2>
          <ClaimText claim={CLAIMS.localModel} className="leading-relaxed" />
        </section>
      )}

      <section className="border-t border-fd-border py-16">
        <p className="leading-relaxed text-fd-muted-foreground">
          Every verb, flag and output is in the{" "}
          <a
            href="https://cli.agentproto.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-fd-primary hover:underline"
          >
            CLI reference
          </a>
          . What&apos;s shipped and what isn&apos;t:{" "}
          <Link href="/#roadmap" className="font-medium text-fd-primary hover:underline">
            real vs roadmap
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
