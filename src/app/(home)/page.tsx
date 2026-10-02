import Link from "next/link"
import { ClaimText, InlineCode, PendingMarker } from "@/components/claim"
import { CopyCommand } from "@/components/copy-command"
import { SectionLabel } from "@/components/section-label"
import { SessionBoard } from "@/components/session-board"
import { VisualSlot } from "@/components/visual-slot"
import { CLAIMS, isVisible, type Claim } from "@/content/claims"

interface Beat {
  n: string
  label: string
  heading: Claim
  points: Claim[]
}

const BEATS: Beat[] = [
  {
    n: "01",
    label: "cross-harness",
    heading: CLAIMS.crossHarness,
    points: [CLAIMS.sideBySide, CLAIMS.handoff],
  },
  {
    n: "02",
    label: "control center",
    heading: CLAIMS.controlCenter,
    points: [CLAIMS.sessionTree, CLAIMS.restartSession, CLAIMS.sandboxPicker],
  },
  {
    n: "03",
    label: "anywhere",
    heading: CLAIMS.anywhereHeading,
    points: [CLAIMS.anywhereLocal, CLAIMS.anywherePhone],
  },
  {
    n: "04",
    label: "shared everything",
    heading: CLAIMS.sharedHeading,
    points: [
      CLAIMS.sharedWallet,
      CLAIMS.sharedMcpSkills,
      CLAIMS.sharedImportedMcp,
    ],
  },
]

/** What the "real vs roadmap" block lists, in reading order. */
const LEDGER: Claim[] = [
  CLAIMS.crossHarness,
  CLAIMS.controlCenter,
  CLAIMS.restartSession,
  CLAIMS.anywhereLocal,
  CLAIMS.sharedWallet,
  CLAIMS.sharedMcpSkills,
  CLAIMS.policyGates,
  CLAIMS.setupOneCommand,
  CLAIMS.anywherePhone,
  CLAIMS.sandboxPicker,
  CLAIMS.handoff,
  CLAIMS.sharedImportedMcp,
]

/**
 * Home: the product page. Hero (one-liner, control center visual
 * slot, the setup command), the four beats, "checks the work",
 * "built on open specs", then the honest real-vs-roadmap block.
 *
 * Every product sentence comes from src/content/claims.ts. Pending
 * claims render with a "coming soon" marker. The headline is the one
 * exception to hiding: it always renders, with its marker.
 */
export default function HomePage(): React.ReactElement {
  const proven = LEDGER.filter(c => c.status === "proven")
  const pending = LEDGER.filter(c => c.status === "pending")

  return (
    <main className="container mx-auto max-w-6xl px-6">
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
            <span aria-hidden="true" className="session-blink mr-2 text-fd-primary">
              ▍
            </span>
            agent control center · 14 agent CLIs · your subscriptions
          </p>
          <h1
            data-claim={CLAIMS.heroHeadline.id}
            data-status={CLAIMS.heroHeadline.status}
            className="mb-3 font-serif text-4xl font-bold leading-[1.07] tracking-tight text-balance sm:text-[3.4rem]"
          >
            Every coding agent, anywhere,{" "}
            <em className="text-fd-primary">from your phone.</em>
          </h1>
          {CLAIMS.heroHeadline.status === "pending" && (
            <p className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-fd-muted-foreground">
              <PendingMarker />
              <a href="#roadmap" className="hover:text-fd-primary hover:underline">
                phone access is in progress. See what&apos;s real today.
              </a>
            </p>
          )}
          <ClaimText
            claim={CLAIMS.heroSub}
            className="mb-8 max-w-xl text-lg leading-relaxed text-fd-muted-foreground text-pretty"
          />
          {isVisible(CLAIMS.setupCommand) ? (
            <>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <CopyCommand command={CLAIMS.setupCommand.text} />
                {CLAIMS.setupCommand.status === "pending" && <PendingMarker />}
              </div>
              {CLAIMS.setupCommand.status === "pending" && (
                <p className="mb-8 font-mono text-xs text-fd-muted-foreground">
                  works today:{" "}
                  <code className="text-fd-foreground">
                    {CLAIMS.manualInstall.text}
                  </code>
                </p>
              )}
            </>
          ) : (
            <div className="mb-8">
              <CopyCommand command={CLAIMS.manualInstall.text} />
            </div>
          )}
          <div className="mb-8 flex flex-wrap gap-3">
            <Link
              href="/start"
              className="bg-fd-foreground px-5 py-2 font-medium text-fd-background transition-opacity hover:opacity-85"
            >
              Get started
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
            Apache-2.0 core ·{" "}
            <Link href="/specs" className="text-fd-primary hover:underline">
              built on open specs →
            </Link>
          </p>
        </div>
        <VisualSlot
          label="Control Center: chat over a live session"
          width={1600}
          height={1000}
        />
      </section>

      {/* ── 2. The four beats ───────────────────────────────────── */}
      {BEATS.map(beat => (
        <section key={beat.n} className="border-t border-fd-border py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionLabel>
                {beat.n} · {beat.label}
              </SectionLabel>
              <h2
                data-claim={beat.heading.id}
                data-status={beat.heading.status}
                className="mt-4 font-serif text-3xl font-bold tracking-tight text-balance"
              >
                {beat.heading.text}
              </h2>
            </div>
            <ul className="space-y-4">
              {beat.points.map(point => (
                <ClaimText
                  key={point.id}
                  as="li"
                  claim={point}
                  className={
                    "pl-5 leading-relaxed " +
                    (point.status === "proven"
                      ? "border-l-2 border-fd-primary"
                      : "border-l-2 border-dashed border-fd-muted-foreground/50")
                  }
                />
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* ── 3. Checks the work ──────────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <SectionLabel>policy gates</SectionLabel>
            <h2 className="mt-4 mb-4 font-serif text-3xl font-bold tracking-tight text-balance">
              {CLAIMS.gatesHeading.text}
            </h2>
            <ClaimText
              claim={CLAIMS.policyGates}
              className="mb-3 max-w-lg leading-relaxed text-fd-muted-foreground"
            />
            <ClaimText
              claim={CLAIMS.stagedCommit}
              className="max-w-lg leading-relaxed text-fd-muted-foreground"
            />
          </div>
          <SessionBoard />
        </div>
      </section>

      {/* ── 4. Built on open specs ──────────────────────────────── */}
      <section className="border-t border-fd-border py-16">
        <div className="border border-fd-border bg-fd-card px-6 py-8 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div className="min-w-0">
              <SectionLabel>built on open specs</SectionLabel>
              <ClaimText
                claim={CLAIMS.openSpecs}
                className="mt-4 max-w-xl leading-relaxed text-fd-muted-foreground"
              />
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/specs"
                className="bg-fd-foreground px-5 py-2 font-medium text-fd-background transition-opacity hover:opacity-85"
              >
                The specs and SDK →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Real vs roadmap ──────────────────────────────────── */}
      <section id="roadmap" className="scroll-mt-20 border-t border-fd-border py-16">
        <SectionLabel>errata, in advance</SectionLabel>
        <h2 className="mt-4 mb-3 font-serif text-2xl font-bold tracking-tight">
          What&apos;s real vs. roadmap
        </h2>
        <p className="mb-8 max-w-2xl leading-relaxed text-fd-muted-foreground">
          Every line on this page carries a status. If it says coming soon,
          it isn&apos;t shipped yet.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-fd-border bg-fd-card p-5">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-fd-primary">
              real today
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed">
              {proven.map(c => (
                <li key={c.id} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-fd-primary">
                    ✓
                  </span>
                  <span>
                    <InlineCode text={c.text} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-dashed border-fd-muted-foreground/50 p-5">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground">
              coming soon
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-fd-muted-foreground">
              {pending.map(c => (
                <li key={c.id} className="flex gap-2.5">
                  <span aria-hidden="true">◌</span>
                  <span>
                    <InlineCode text={c.text} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link
          href="/features"
          className="mt-6 inline-block font-medium text-fd-primary hover:underline"
        >
          Full features breakdown →
        </Link>
      </section>
    </main>
  )
}
