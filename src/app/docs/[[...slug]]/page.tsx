import { notFound } from "next/navigation"
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page"
import defaultMdxComponents from "fumadocs-ui/mdx"
import type { ComponentType } from "react"
import type { TOCItemType } from "fumadocs-core/toc"
import { docsSource } from "@/lib/docs-source"
import { AipRegistry } from "@/components/aip-registry"
import { AipResources } from "@/components/aip-resources"
import { DriverFamily } from "@/components/driver-family"

interface DocsParamProps {
  params: Promise<{ slug?: string[] }>
}

export async function generateStaticParams(): Promise<{ slug?: string[] }[]> {
  return docsSource.generateParams()
}

export async function generateMetadata({ params }: DocsParamProps) {
  const { slug } = await params
  const page = docsSource.getPage(slug)
  if (!page) return {}
  const data = page.data as { title?: string; description?: string }
  return {
    title: data.title,
    description: data.description,
  }
}

const mdxComponents = {
  ...defaultMdxComponents,
  // AIP-specific components used inline in spec .mdx pages.
  AipRegistry,
  AipResources,
  DriverFamily,
} as Record<string, unknown>

/**
 * MDX-specific fields that fumadocs-mdx attaches to each page's `data`
 * but the generic `PageData` interface doesn't expose. Casting the
 * loader's result through this shape gives us the typed handle without
 * any/unknown drift at the call sites below.
 */
interface AipPageData {
  title?: string
  description?: string
  aip?: number | string
  full?: boolean
  toc: TOCItemType[]
  body: ComponentType<{ components?: Record<string, unknown> }>
}

export default async function Page({
  params,
}: DocsParamProps): Promise<React.ReactElement> {
  const { slug } = await params
  const page = docsSource.getPage(slug)
  if (!page) notFound()

  const data = page.data as AipPageData
  const MDXContent = data.body

  const aipNumber =
    typeof data.aip === "number"
      ? data.aip
      : typeof data.aip === "string" && /^\d+$/.test(data.aip)
        ? Number(data.aip)
        : undefined

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title ?? "Untitled"}</DocsTitle>
      {data.description && <DocsDescription>{data.description}</DocsDescription>}
      <DocsBody>
        <MDXContent components={mdxComponents} />
        {aipNumber !== undefined && Number.isFinite(aipNumber) && (
          <AipResources aip={aipNumber} />
        )}
      </DocsBody>
    </DocsPage>
  )
}
