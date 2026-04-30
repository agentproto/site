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
}

export default withMDX(config)
