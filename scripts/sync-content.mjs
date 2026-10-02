#!/usr/bin/env node
/**
 * sync-content.mjs — pull agentproto spec content into the site.
 *
 * Two paths, picked deterministically at script start:
 *
 *  1. **Local sibling repo** — when `../agentproto/specs/` exists on
 *     disk (typical in the agentik-studio bootstrapped layout where
 *     both repos live under `projects/agentproto/`), copy from there.
 *     Fast, instant feedback during dev, no network.
 *
 *  2. **Git clone of the public repo** — when no sibling is present
 *     (CI / fresh clone of just `agentproto/site`), clone
 *     `github.com/agentproto/agentproto` into `.cache/agentproto/`
 *     and copy specs from the cache. `--depth 1` keeps it cheap.
 *
 * Output goes to `content/docs/agentproto/` so Fumadocs picks it up.
 * The target dir is gitignored — content always reflects the latest
 * sync, never lives in the site repo's git tree.
 *
 * Idempotent: re-runs are safe and refresh stale content.
 */

import { existsSync } from "node:fs"
import { mkdir, rm, cp, stat, readdir, readFile } from "node:fs/promises"
import { execFileSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { compile } from "@mdx-js/mdx"
import YAML from "yaml"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")

const SIBLING_DIR = path.resolve(ROOT, "../agentproto")
const SIBLING_SPECS = path.join(SIBLING_DIR, "specs")
const CACHE_DIR = path.join(ROOT, ".cache/agentproto")
const CACHE_SPECS = path.join(CACHE_DIR, "specs")
// Sync directly to content/docs/ (not a sub-namespace) so URLs are
// /docs/aip-N, matching the cross-references already authored in the
// .mdx specs (`[AIP-2](/docs/aip-2)` etc). The Fumadocs `baseUrl`
// in lib/docs-source.ts is `/docs`, the file becomes aip-N.mdx, and
// the URL collapses to /docs/aip-N.
const TARGET_DIR = path.join(ROOT, "content/docs")

const REPO_URL =
  process.env.AGENTPROTO_REPO_URL ?? "https://github.com/agentproto/agentproto.git"
const REPO_BRANCH = process.env.AGENTPROTO_REPO_BRANCH ?? "main"

async function isDir(p) {
  try {
    const s = await stat(p)
    return s.isDirectory()
  } catch {
    return false
  }
}

async function syncFromSibling() {
  console.log(`[sync-content] using sibling repo at ${SIBLING_DIR}`)
  await rm(TARGET_DIR, { recursive: true, force: true })
  await mkdir(TARGET_DIR, { recursive: true })
  await cp(SIBLING_SPECS, TARGET_DIR, { recursive: true })
}

async function syncFromGit() {
  console.log(`[sync-content] no sibling found — cloning ${REPO_URL}`)
  await mkdir(path.dirname(CACHE_DIR), { recursive: true })
  if (existsSync(CACHE_DIR)) {
    // Refresh existing cache via fast-forward pull to pick up upstream
    // changes between runs without re-downloading the whole repo.
    try {
      execFileSync("git", ["-C", CACHE_DIR, "fetch", "--depth", "1", "origin", REPO_BRANCH], { stdio: "inherit" })
      execFileSync("git", ["-C", CACHE_DIR, "reset", "--hard", `origin/${REPO_BRANCH}`], { stdio: "inherit" })
    } catch (err) {
      console.warn(`[sync-content] cache fetch failed (${err.message}) — re-cloning`)
      await rm(CACHE_DIR, { recursive: true, force: true })
      execFileSync("git", ["clone", "--depth", "1", "--branch", REPO_BRANCH, REPO_URL, CACHE_DIR], { stdio: "inherit" })
    }
  } else {
    execFileSync("git", ["clone", "--depth", "1", "--branch", REPO_BRANCH, REPO_URL, CACHE_DIR], { stdio: "inherit" })
  }

  if (!(await isDir(CACHE_SPECS))) {
    throw new Error(`[sync-content] cache clone succeeded but ${CACHE_SPECS} does not exist`)
  }

  await rm(TARGET_DIR, { recursive: true, force: true })
  await mkdir(TARGET_DIR, { recursive: true })
  await cp(CACHE_SPECS, TARGET_DIR, { recursive: true })
}

// Strip the `---\n...\n---\n` frontmatter block before handing a file to
// the raw MDX compiler — frontmatter is YAML, not MDX, and fumadocs-mdx's
// own pipeline parses it separately. Replaced with blank lines (not
// removed) so any reported error line number still matches the file on
// disk.
function stripFrontmatter(src) {
  if (!src.startsWith("---\n")) return src
  const end = src.indexOf("\n---\n", 4)
  if (end === -1) return src
  const linesConsumed = src.slice(0, end + 5).split("\n").length - 1
  return "\n".repeat(linesConsumed) + src.slice(end + 5)
}

// Must match the `layer` enum in source.config.ts.
const LAYERS = [
  "process",
  "primitives",
  "identity",
  "memory",
  "coordination",
  "capabilities",
  "drivers",
  "surfaces",
]

// fumadocs-mdx parses the frontmatter as YAML and validates it against
// source.config.ts; both failures otherwise surface as a Turbopack error.
function frontmatterProblem(src) {
  if (!src.startsWith("---\n")) return null
  const end = src.indexOf("\n---\n", 4)
  if (end === -1) return null
  try {
    const data = YAML.parse(src.slice(4, end))
    if (data?.layer !== undefined && !LAYERS.includes(data.layer)) {
      return `layer "${data.layer}" is not one of ${LAYERS.join("|")}`
    }
  } catch (err) {
    return err.message.split("\n")[0]
  }
  return null
}

async function findMdxFiles(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "resources") continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...(await findMdxFiles(full)))
    } else if (entry.name.endsWith(".mdx")) {
      out.push(full)
    }
  }
  return out
}

// Catch a broken spec BEFORE `next build` ever sees it. A malformed .mdx
// (an unclosed inline code span wrapping a `{`, a stray JSX-looking
// `<tag>`) fails deep inside fumadocs-mdx/Turbopack with a stack trace
// that names an internal loader file, not the offending spec — this
// turns that into a flat "file:line" list while the content is still
// sitting right here, synced but not yet committed to a build.
async function validateContent() {
  const files = await findMdxFiles(TARGET_DIR)
  const failures = []
  for (const file of files) {
    const raw = await readFile(file, "utf8")
    const rel = path.relative(TARGET_DIR, file)
    const problem = frontmatterProblem(raw)
    if (problem) failures.push(`  ${rel} (frontmatter): ${problem}`)
    try {
      await compile(stripFrontmatter(raw), { format: "mdx" })
    } catch (err) {
      const at = err.place ? ` @ line ${err.place.line ?? "?"}` : ""
      failures.push(`  ${rel}${at}: ${err.message}`)
    }
  }
  if (failures.length > 0) {
    throw new Error(
      `[sync-content] ${failures.length} synced .mdx file(s) fail to compile:\n${failures.join("\n")}`
    )
  }
}

async function main() {
  if (await isDir(SIBLING_SPECS)) {
    await syncFromSibling()
  } else {
    await syncFromGit()
  }
  await validateContent()
  console.log(`[sync-content] done — content at ${TARGET_DIR}`)
}

main().catch(err => {
  console.error("[sync-content] failed:", err)
  process.exit(1)
})
