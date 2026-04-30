/**
 * GitHub resource URL builder.
 *
 * Resources (SKILL.md, ADAPTER.md, schema.json, examples) live in the
 * public spec repo under `specs/resources/aip-N/<channel>/...`. This
 * site does NOT serve them — links go directly to GitHub for both
 * file viewing (via `/blob/`) and raw bytes (via `/raw/`). Zero
 * proxy, zero rate limit, zero cache to manage; GitHub renders
 * markdown / json / yaml natively.
 *
 * The repo coords are env-overridable so private forks can repoint.
 */

const REPO_OWNER = process.env.NEXT_PUBLIC_AGENTPROTO_REPO_OWNER ?? "agentproto"
const REPO_NAME = process.env.NEXT_PUBLIC_AGENTPROTO_REPO_NAME ?? "agentproto"
const REPO_BRANCH = process.env.NEXT_PUBLIC_AGENTPROTO_REPO_BRANCH ?? "main"

const RESOURCES_BASE_PATH = "specs/resources"

const REPO_BLOB_BASE = `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/${REPO_BRANCH}`
const REPO_RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}`
const REPO_TREE_BASE = `https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/${REPO_BRANCH}`

/**
 * Browse-friendly URL for a resource — opens GitHub's file viewer
 * (renders markdown, json, schema, etc). Use for anchor links the
 * visitor clicks.
 */
export function resourceBlobUrl(relativePath: string): string {
  return `${REPO_BLOB_BASE}/${RESOURCES_BASE_PATH}/${normalize(relativePath)}`
}

/**
 * Raw bytes URL for a resource — direct content stream, no UI chrome.
 * Use for `Download` buttons or programmatic fetch from build steps.
 */
export function resourceRawUrl(relativePath: string): string {
  return `${REPO_RAW_BASE}/${RESOURCES_BASE_PATH}/${normalize(relativePath)}`
}

/**
 * Folder browse URL — opens GitHub's tree view for an AIP's resources.
 * Use for "All resources for AIP-N" links.
 */
export function resourceTreeUrl(relativePath: string = ""): string {
  const base = `${REPO_TREE_BASE}/${RESOURCES_BASE_PATH}`
  return relativePath ? `${base}/${normalize(relativePath)}` : base
}

/**
 * GitHub blob URL for an arbitrary path inside the public repo (e.g.
 * `packages/provider/core/src/define-provider.ts`). Used by AIP
 * pages that want to link into the reference implementation.
 */
export function repoBlobUrl(relativePath: string): string {
  return `${REPO_BLOB_BASE}/${normalize(relativePath)}`
}

function normalize(p: string): string {
  return p.replace(/^\/+/, "").replace(/\/+$/, "")
}
