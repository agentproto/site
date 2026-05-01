import Link from "next/link"

/**
 * Footer for agentproto.sh — minimal, single-tenant. Links to the
 * GitHub repos, the OG agentik.net for context, and the LLM-discoverable
 * /llms.txt + /llms-full.txt artifacts.
 */
export function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-fd-border bg-fd-card mt-16">
      <div className="mx-auto max-w-6xl px-6 py-8 grid gap-8 md:grid-cols-4 text-sm">
        <div className="space-y-2">
          <div className="font-semibold text-fd-foreground">agentproto</div>
          <p className="text-fd-muted-foreground leading-relaxed">
            Open standards for the AI-agent ecosystem.
          </p>
        </div>

        <FooterColumn title="Repos">
          <FooterLink
            href="https://github.com/agentproto/agentproto"
            external
          >
            agentproto
          </FooterLink>
          <FooterLink href="https://github.com/agentproto/site" external>
            site
          </FooterLink>
        </FooterColumn>

        <FooterColumn title="LLM-friendly">
          <FooterLink href="/llms.txt">/llms.txt</FooterLink>
          <FooterLink href="/llms-full.txt">/llms-full.txt</FooterLink>
        </FooterColumn>

        <FooterColumn title="Related">
          <FooterLink href="https://agentik.net" external>
            agentik.net
          </FooterLink>
          <FooterLink
            href="https://github.com/agentproto/agentproto/blob/main/LICENSE-AIPs"
            external
          >
            License
          </FooterLink>
        </FooterColumn>
      </div>
      <div className="border-t border-fd-border">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-fd-muted-foreground flex justify-between gap-4 flex-wrap">
          <span>
            Specs: CC-BY-4.0 · Code: MIT · © 2026 agentproto contributors
          </span>
          <span>
            <a
              className="hover:text-fd-foreground"
              href="https://github.com/agentproto/agentproto/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report a spec issue
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="space-y-2">
      <div className="font-semibold text-fd-foreground">{title}</div>
      <ul className="space-y-1 text-fd-muted-foreground">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}): React.ReactElement {
  const props = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {}
  return (
    <li>
      <Link
        href={href}
        className="hover:text-fd-foreground transition-colors"
        {...props}
      >
        {children}
      </Link>
    </li>
  )
}
