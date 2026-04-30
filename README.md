# agentproto.sh — public docs site

Standalone Next.js + Fumadocs site for the [agentproto open standard](https://github.com/agentproto/agentproto).

## Architecture

The site is **content-source-agnostic**: it doesn't track AIP markdown
in its own git tree. At build/dev time, `scripts/sync-content.mjs`
materialises the content into `content/docs/agentproto/` from one of
two sources:

1. **Local sibling repo** (`../agentproto/specs/`) — picked
   automatically when the `agentproto/agentproto` repo is checked out
   alongside this one (the typical agentik-studio bootstrap layout).
   Instant dev feedback, no network.

2. **Git clone of the public repo** — falls back to
   `git clone --depth 1 https://github.com/agentproto/agentproto` into
   `.cache/agentproto/` and reads from there. Used in CI, on Vercel,
   or anywhere the sibling isn't on disk.

Resources (`SKILL.md`, `ADAPTER.md`, schema files, examples) are
**linked directly to GitHub** rather than proxied through this site —
GitHub's native viewer handles markdown, JSON, and YAML rendering.

## Develop

```bash
pnpm install
pnpm dev          # runs prebuild content sync + Next.js dev server
```

The `predev` hook syncs content automatically. Edit specs in the
sibling repo and re-run `node scripts/sync-content.mjs` (or restart
`pnpm dev`) to pick up changes.

## Build

```bash
pnpm build        # runs prebuild content sync + Next.js production build
pnpm start
```

In CI, set the `AGENTPROTO_REPO_BRANCH` env var to point at a non-`main`
branch when previewing spec changes.

## Layout

```
src/
├── app/
│   ├── docs/[[...slug]]/page.tsx    Fumadocs MDX renderer
│   ├── docs/layout.tsx              docs sidebar + nav
│   └── page.tsx                     landing (registry + family)
├── components/
│   ├── aip-registry.tsx             flat AIP index
│   ├── aip-resources.tsx            per-AIP resource panel → GitHub
│   └── provider-family.tsx          AIP-30 supertype + subtypes
└── lib/
    ├── docs-source.ts               Fumadocs loader
    └── github-resources.ts          URL builder for GitHub blob/raw/tree

scripts/sync-content.mjs             dev/CI content materialisation
source.config.ts                     Fumadocs MDX schema
```

## License

MIT (site code). The synced AIP content is governed by the upstream
`LICENSE-AIPs` (CC-BY-4.0) in `agentproto/agentproto`.
