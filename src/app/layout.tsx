import type { Metadata } from "next"
import { RootProvider } from "fumadocs-ui/provider"
import "fumadocs-ui/style.css"
import "./global.css"

export const metadata: Metadata = {
  title: {
    default: "agentproto — open standards for the AI-agent ecosystem",
    template: "%s — agentproto",
  },
  description:
    "AIP specifications + reference TypeScript runtime: tool contracts (AIP-14), provider supertype (AIP-30), kind-specific provider runtimes, and framework adapters.",
  metadataBase: new URL("https://agentproto.sh"),
  openGraph: {
    title: "agentproto",
    description: "Open standards for the AI-agent ecosystem.",
    url: "https://agentproto.sh",
    siteName: "agentproto",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
