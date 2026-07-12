import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google"
import { RootProvider } from "fumadocs-ui/provider/next"
import { SiteFooter } from "@/components/site-footer"
import "./global.css"

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
})
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
})
const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-plex-serif",
})

export const metadata: Metadata = {
  title: {
    default: "agentproto — one daemon for every coding agent",
    template: "%s — agentproto",
  },
  description:
    "Run Claude Code, Codex, Hermes, opencode and Mastra under one daemon — nested orchestration, policy gates, live supervision. Built on the open AIP spec family.",
  metadataBase: new URL("https://agentproto.sh"),
  openGraph: {
    title: "agentproto",
    description:
      "One daemon to run every coding agent — and actually supervise them.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} ${plexSerif.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </RootProvider>
      </body>
    </html>
  )
}
