import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Trailing slashes off so /docs/aip-14 stays canonical (matches the
  // spec naming convention used in cross-references).
  trailingSlash: false,
  experimental: {
    typedRoutes: true,
  },
  async redirects() {
    return [
      // The home v3 protocol section + footer CTA link to /specs — the
      // specs index itself lives at /docs (the AIP registry landing).
      {
        source: "/specs",
        destination: "/docs",
        permanent: false,
      },
    ]
  },
}

export default withMDX(config)
