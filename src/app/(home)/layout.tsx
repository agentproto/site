import { HomeLayout } from "fumadocs-ui/layouts/home"
import type { LinkItemType } from "fumadocs-ui/layouts/shared"

const NAV_LINKS: LinkItemType[] = [
  { text: "Features", url: "/features", external: false },
  { text: "Compare", url: "/compare", external: false },
  { text: "Deep dives", url: "/deep-dives", external: false },
  { text: "Specs", url: "/docs", external: false },
  { text: "CLI", url: "/cli", external: false },
  {
    text: "GitHub",
    url: "https://github.com/agentproto/ts",
    external: true,
  },
]

/**
 * Wraps the landing pages (/, /features, /compare) in fumadocs-ui's
 * HomeLayout so they get the same nav bar, theme toggle, and mobile
 * menu as /docs — without a sidebar. The root layout still renders
 * the SiteFooter outside this layout.
 */
export default function HomeLayoutRoute({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <HomeLayout nav={{ title: "agentproto", url: "/" }} links={NAV_LINKS}>
      {children}
    </HomeLayout>
  )
}
