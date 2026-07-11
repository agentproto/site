import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config"
import { z } from "zod"

/**
 * Fumadocs source config — reads .mdx from `content/docs/`, populated
 * by `scripts/sync-content.mjs` from either the local sibling repo
 * (dev) or a `git clone --depth 1` cache (CI/prod).
 *
 * Frontmatter schema mirrors the spec layer's AIP fields so the docs
 * page renderer can introspect AIP number / status / provider_kind
 * for the registry / family / resources panels.
 */
export const docs = defineDocs({
  dir: "content/docs",
  // Resources are raw spec artifacts (SKILL.md, ADAPTER.md, schema
  // JSON, examples) served externally by GitHub. Excluding them here
  // prevents Fumadocs from trying to MDX-parse non-MDX content.
  docs: {
    files: ["**/*.mdx", "!**/resources/**"],
    schema: frontmatterSchema.extend({
      aip: z.union([z.number(), z.string()]).optional(),
      status: z.string().optional(),
      type: z.string().optional(),
      "ref-impl": z.string().optional(),
      // Mirror-AIP attribution: the upstream spec author when the AIP
      // anchors a third-party standard (e.g. AIP-3 mirrors anthropics/
      // skills, AIP-4 mirrors google-labs-code/design.md). The
      // `aip-editor` is who maintains the AIP entry inside this
      // registry, distinct from the spec author.
      "spec-author": z.string().optional(),
      "aip-editor": z.string().optional(),
      // Canonical npm package implementing this AIP (when applicable).
      // Distinct from `ref-impl:` — `package` always names a published
      // npm package, while `ref-impl:` can be any URL (a doc, a schema
      // file, an internal path). The spec page renders this with the
      // currently-published version fetched from the npm registry at
      // build time, so the spec doesn't have to mirror the impl's
      // semver. Example: `package: "@agentproto/tool"`.
      package: z.string().optional(),
      provider_kind: z
        .enum(["cli", "http", "mcp", "sdk", "builtin"])
        .optional(),
      // Semantic layer for the registry's 8-section grouping on /docs.
      // Optional — un-tagged AIPs land in the catch-all "Misc" bucket.
      layer: z
        .enum([
          "process",
          "primitives",
          "identity",
          "memory",
          "coordination",
          "capabilities",
          "drivers",
          "surfaces",
        ])
        .optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    files: ["**/*.json", "!**/resources/**"],
  },
})

/**
 * Deep dives — the site's own long-form, code-first content wave.
 *
 * Unlike `docs` (which is wiped and re-synced from the public spec
 * repo by `scripts/sync-content.mjs`), this collection is authored
 * and tracked directly in `content/deep-dives/` — it is site content,
 * not mirrored spec content. Plain frontmatter: title + description.
 */
export const deepDives = defineDocs({
  dir: "content/deep-dives",
})

export default defineConfig({
  mdxOptions: {},
})
