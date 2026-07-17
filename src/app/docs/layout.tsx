import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { docsSource } from "@/lib/docs-source"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <DocsLayout
      tree={docsSource.pageTree}
      nav={{
        title: "agentproto",
        url: "/",
      }}
      links={[
        { text: "Deep dives", url: "/deep-dives", external: false },
        {
          text: "CLI — get started",
          url: "https://cli.agentproto.sh/docs/getting-started",
          external: true,
        },
        {
          text: "GitHub",
          url: "https://github.com/agentproto/agentproto",
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  )
}
