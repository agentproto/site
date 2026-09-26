/**
 * The honest-claims ledger. Every product sentence on the home page and
 * on /start is a claim with a status. Pages render copy from here, never
 * inline, so a claim can't read as shipped until its status flips.
 *
 * - `proven`: run hands-on, cold. `proof` says where.
 * - `pending`: real intent, not shipped. Rendered with a visible
 *   "coming soon" marker, or hidden when SHOW_PENDING_CLAIMS is false.
 *
 * Flip a status only with a proof pointer (a merged + released PR, a
 * recorded run). Counts follow 01-FACTS.md (2026-09-11).
 */

export type ClaimStatus = "proven" | "pending"

export interface Claim {
  id: string
  text: string
  status: ClaimStatus
  /** Where the proof lives (proven), or what is still missing (pending). */
  proof?: string
}

/** false = pending claims are not rendered at all (instead of "coming soon"). */
export const SHOW_PENDING_CLAIMS = true

function claim(
  id: string,
  status: ClaimStatus,
  text: string,
  proof?: string
): Claim {
  return { id, text, status, proof }
}

export const CLAIMS = {
  // ── hero ────────────────────────────────────────────────────────
  heroHeadline: claim(
    "hero.headline",
    "pending",
    "Every coding agent, anywhere, from your phone.",
    "Phone half pending: remote enable --qr is merged, session-chat token support is in flight, proof run not done (PHONE-PLAN P1)."
  ),
  heroSub: claim(
    "hero.sub",
    "proven",
    "Run Claude Code, Codex, opencode, Hermes, pi and more on your machine or in a sandbox. Drive them from one control center, on your own subscriptions, with the same MCP servers and skills.",
    "PROOF-RUN claims 2 (CLI half) and 3; session-chat."
  ),
  setupCommand: claim(
    "setup.command",
    "pending",
    "npx agentproto setup",
    "Wizard PR in flight; the unscoped `agentproto` npm package is still a placeholder, not a shim."
  ),
  setupOneCommand: claim(
    "setup.one-command",
    "pending",
    "One command sets it all up: `npx agentproto setup`.",
    "Same as setup.command."
  ),
  manualInstall: claim(
    "install.manual",
    "proven",
    "npm i -g @agentproto/cli && agentproto serve",
    "Current install path on npm (@agentproto/cli)."
  ),

  // ── beat 1: cross-harness ──────────────────────────────────────
  crossHarness: claim(
    "beat.cross-harness",
    "proven",
    "One daemon, 14 agent CLIs, same verbs.",
    "01-FACTS.md: 12 AGENT-CLI adapters + 2 first-party runtimes."
  ),
  sideBySide: claim(
    "beat.cross-harness.side-by-side",
    "proven",
    "Start claude-code and codex side by side. Prompt, watch, export and kill them with the same commands.",
    "AIP-45 lifecycle: agent_start / agent_prompt / agent_output / agent_kill / agent_export."
  ),
  handoff: claim(
    "beat.cross-harness.handoff",
    "pending",
    "Hand the work from one agent to another: checkpoint, then continue fresh in a different harness.",
    "PROOF-RUN claim 4 failed: continue-fresh is same-harness only. Harness override PR in flight."
  ),

  // ── beat 2: control center ─────────────────────────────────────
  controlCenter: claim(
    "beat.control-center",
    "proven",
    "One chat over any session, whichever agent runs it.",
    "session-chat, served by the daemon at /apps/@agentik/session-chat/ui."
  ),
  sessionTree: claim(
    "beat.control-center.tree",
    "proven",
    "See the session tree: supervisors and the executors they spawned.",
    "session-chat sidebar tree."
  ),
  restartSession: claim(
    "beat.control-center.restart",
    "proven",
    "Restart an ended session from where it stopped.",
    "session_restart allowlisted in session-chat (agentproto/ts#1389)."
  ),
  sandboxPicker: claim(
    "beat.control-center.sandbox",
    "pending",
    "Start a sandbox session from the same New session button: pick the agent, the model, where it runs and which wallet pays.",
    "PROOF-RUN claim 2 partial: the New session picker isn't built (gap #4)."
  ),

  // ── beat 3: anywhere ───────────────────────────────────────────
  anywhereHeading: claim(
    "beat.anywhere",
    "proven",
    "Your machine or a sandbox. Same verbs.",
    "PROOF-RUN claim 2, CLI half."
  ),
  anywhereLocal: claim(
    "beat.anywhere.local-or-sandbox",
    "proven",
    "Run an agent on this machine or in an e2b sandbox. Same verbs, same session list.",
    "PROOF-RUN claim 2: `sessions start --sandbox e2b` streamed back into the session list."
  ),
  anywherePhone: claim(
    "beat.anywhere.phone",
    "pending",
    "Open the control center on your phone. Scan a QR code in your terminal, see live sessions, send a prompt.",
    "PHONE-PLAN P1: token support in session-chat in flight; claim 1 not recorded."
  ),

  // ── beat 4: shared wallet / MCP / skills ───────────────────────
  sharedHeading: claim(
    "beat.shared",
    "proven",
    "One wallet, one MCP server, one set of skills.",
    "PROOF-RUN claim 3."
  ),
  sharedWallet: claim(
    "beat.shared.wallet",
    "proven",
    "One wallet: your auth profiles, subscriptions and API keys. A sandboxed agent bills the profile you picked.",
    "PROOF-RUN claim 3: sandbox session billed accessProfile claude-subs-agentik."
  ),
  sharedMcpSkills: claim(
    "beat.shared.mcp-skills",
    "proven",
    "The same daemon MCP server and the same skills, local or in a sandbox.",
    "PROOF-RUN claim 3: identical skills list and agentproto MCP resources inside e2b."
  ),
  sharedImportedMcp: claim(
    "beat.shared.imported-mcp",
    "pending",
    "Your other imported MCP servers follow the agent into the sandbox too.",
    "PROOF-RUN claim 3 caveat: not verified for user-imported servers."
  ),

  // ── checks the work ────────────────────────────────────────────
  gatesHeading: claim(
    "gates.heading",
    "proven",
    "And it checks the work before it lands.",
    "/features Tier 1: durable policy gates."
  ),
  policyGates: claim(
    "gates",
    "proven",
    "Attach a gate to a session's turn end: a shell command or an LLM judge.",
    "/features Tier 1: durable policy gates."
  ),
  stagedCommit: claim(
    "gates.staged-commit",
    "proven",
    "Stage a commit behind the gate. It waits for your ack, with or without a client attached.",
    "/features Tier 1: durable policy gates."
  ),

  // ── open specs ─────────────────────────────────────────────────
  openSpecs: claim(
    "specs",
    "proven",
    "Built on open, numbered specs (AIPs). The CLI, daemon, adapters, specs and SDK are Apache-2.0.",
    "github.com/agentproto/agentproto, github.com/agentproto/ts."
  ),

  // ── /start: setup wizard ───────────────────────────────────────
  setupBehaviour: claim(
    "setup.behaviour",
    "pending",
    "It checks first, shows what it would change, then asks. Re-run it any time: finished steps are skipped.",
    "Wizard PR in flight."
  ),
  setupPreflight: claim(
    "setup.preflight",
    "pending",
    "Checks Node >= 20.9, your OS, and whether your CLI is current.",
    "Wizard PR in flight."
  ),
  setupWorkspace: claim(
    "setup.workspace",
    "pending",
    "Registers the current folder as a workspace.",
    "Wizard PR in flight."
  ),
  setupDaemon: claim(
    "setup.daemon",
    "pending",
    "Installs the daemon as a login service on macOS, starts it and waits for /health. On Linux it runs it in the background.",
    "Wizard PR in flight."
  ),
  setupAgents: claim(
    "setup.agents",
    "pending",
    "Detects the agent CLIs you have, and installs the ones you pick.",
    "Wizard PR in flight."
  ),
  setupAuth: claim(
    "setup.auth",
    "pending",
    "Finds your existing logins and keys, and imports them as profiles in one pass. Optionally adds an API key.",
    "Wizard PR in flight."
  ),
  setupClients: claim(
    "setup.clients",
    "pending",
    "Registers the daemon's MCP server in the coding clients you pick.",
    "Wizard PR in flight."
  ),
  setupSkills: claim(
    "setup.skills",
    "pending",
    "Installs the agentproto skill pack into each connected client.",
    "Wizard PR in flight."
  ),
  setupFirstRun: claim(
    "setup.first-run",
    "pending",
    "Runs a 20-second test session and streams it back. That is the proof it works.",
    "Wizard PR in flight."
  ),

  // ── /start: clients (manual path works today) ──────────────────
  clientsIntro: claim(
    "clients",
    "proven",
    "The daemon is an MCP server. Register it once and your client can start, watch and stop agent sessions.",
    "docs/cli/verbs/install-mcp.md; agent_start / agent_output / agent_kill tools."
  ),
  clientClaudeCode: claim(
    "client.claude-code",
    "proven",
    "Registers the daemon over HTTP with `claude mcp add --scope user`, falling back to ./.mcp.json.",
    "docs/cli/verbs/install-mcp.md, onboard.md."
  ),
  clientCursor: claim(
    "client.cursor",
    "proven",
    "Writes the agentproto entry into ~/.cursor/mcp.json, bridged over stdio.",
    "docs/cli/verbs/install-mcp.md."
  ),
  clientCodex: claim(
    "client.codex",
    "proven",
    "Adds [mcp_servers.agentproto] to ~/.codex/config.toml, bridged over stdio.",
    "docs/cli/verbs/install-mcp.md."
  ),
  clientClaudeDesktop: claim(
    "client.claude-desktop",
    "proven",
    "Writes claude_desktop_config.json (macOS), bridged over stdio.",
    "docs/cli/verbs/install-mcp.md."
  ),

  // ── /start: manual install (the path that works today) ─────────
  manualCli: claim(
    "manual.cli",
    "proven",
    "Install the CLI. Needs Node 20.9 or newer.",
    "@agentproto/cli on npm."
  ),
  manualDaemon: claim(
    "manual.daemon",
    "proven",
    "Run the daemon. On macOS `agentproto daemon install` keeps it running as a login service; anywhere, `agentproto serve` runs it in the foreground.",
    "docs/cli/verbs/daemon.md, serve.md."
  ),
  manualAgent: claim(
    "manual.agent",
    "proven",
    "Install an agent adapter.",
    "docs/cli/verbs/install.md."
  ),
  manualAuth: claim(
    "manual.auth",
    "proven",
    "Find the logins you already have, then import one as a profile.",
    "docs/cli/verbs/auth.md: discover + profile import."
  ),
  manualClients: claim(
    "manual.clients",
    "proven",
    "Register the daemon's MCP server in every coding client it detects.",
    "docs/cli/verbs/install-mcp.md."
  ),
  manualSkills: claim(
    "manual.skills",
    "pending",
    "Install the agentproto skill pack into your clients.",
    "Last cold install failed at skill-pack resolution; re-verify on a fresh machine (SCOPE.md)."
  ),
  manualFirstRun: claim(
    "manual.first-run",
    "proven",
    "Start a session and watch it run.",
    "docs/cli/verbs/sessions.md."
  ),
  troubleshootIssue: claim(
    "troubleshoot.issue",
    "proven",
    "Stuck? Open an issue on agentproto/ts with your CLI version (`agentproto --version`) and OS.",
    "github.com/agentproto/ts/issues."
  ),

  // ── /start: troubleshooting, phone, local model ────────────────
  doctor: claim(
    "doctor",
    "pending",
    "`agentproto doctor` checks every step and prints the exact command that fixes each one. It changes nothing.",
    "Merged (agentproto/ts#1396), not in a published CLI release yet."
  ),
  doctorJson: claim(
    "doctor.json",
    "pending",
    "`agentproto doctor --json` prints the same report as JSON. Attach it to bug reports.",
    "Ships with doctor."
  ),
  phoneConnect: claim(
    "phone.connect",
    "pending",
    "`agentproto remote enable --qr` opens a tunnel, mints a one-time token and prints a QR code. Scan it to open the control center on your phone.",
    "Link + QR merged (agentproto/ts#1402), unreleased; session-chat token support in flight; proof run not done."
  ),
  localModel: claim(
    "local-model",
    "pending",
    "Point agentproto at a model on your network, an Ollama or llama-server box, and use it as a provider like any other.",
    "Not documented or proven end to end yet."
  ),
} as const satisfies Record<string, Claim>

export type ClaimKey = keyof typeof CLAIMS

export function isVisible(c: Claim): boolean {
  return c.status === "proven" || SHOW_PENDING_CLAIMS
}

export const PROVEN_CLAIMS: Claim[] = Object.values(CLAIMS).filter(
  c => c.status === "proven"
)
export const PENDING_CLAIMS: Claim[] = Object.values(CLAIMS).filter(
  c => c.status === "pending"
)
