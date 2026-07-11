/**
 * Deep-dives source loader — wraps fumadocs-mdx's loader against the
 * `deepDives` collection defined in `source.config.ts`.
 *
 * Distinct from `docs-source.ts`: deep dives are the site's own
 * authored long-form articles (tracked in `content/deep-dives/`),
 * not the AIP specs mirrored from the upstream repo. They render
 * under `/deep-dives` with the same Fumadocs docs chrome.
 */

import { loader } from "fumadocs-core/source"
import { deepDives } from "../../.source/server"

export const deepDivesSource = loader({
  baseUrl: "/deep-dives",
  source: deepDives.toFumadocsSource(),
})
