import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { deepDivesSource } from "@/lib/deep-dives-source"

/**
 * Deep-dives section layout — the same Fumadocs docs chrome (sidebar
 * tree, nav, theme toggle) as /docs, driven by the deepDives tree.
 * The root layout still renders the SiteFooter outside this.
 */
export default function DeepDivesLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <DocsLayout
      tree={deepDivesSource.pageTree}
      nav={{
        title: "agentproto",
        url: "/",
      }}
      links={[
        { text: "Specs", url: "/docs", external: false },
        {
          text: "CLI (cli.agentproto.sh)",
          url: "https://cli.agentproto.sh",
          external: true,
        },
        {
          text: "GitHub",
          url: "https://github.com/agentproto/ts",
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  )
}
