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
      provider_kind: z
        .enum(["cli", "http", "mcp", "sdk", "builtin"])
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

export default defineConfig({
  mdxOptions: {},
})
