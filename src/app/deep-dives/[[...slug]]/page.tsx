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
import { deepDivesSource } from "@/lib/deep-dives-source"

interface DeepDiveParamProps {
  params: Promise<{ slug?: string[] }>
}

export async function generateStaticParams(): Promise<{ slug?: string[] }[]> {
  return deepDivesSource.generateParams()
}

export async function generateMetadata({ params }: DeepDiveParamProps) {
  const { slug } = await params
  const page = deepDivesSource.getPage(slug)
  if (!page) return {}
  const data = page.data as { title?: string; description?: string }
  return {
    title: data.title,
    description: data.description,
  }
}

/**
 * Fields fumadocs-mdx attaches to each page's `data` that the generic
 * `PageData` interface doesn't expose. Mirrors the docs renderer's
 * typed handle without any/unknown drift.
 */
interface DeepDivePageData {
  title?: string
  description?: string
  full?: boolean
  toc: TOCItemType[]
  body: ComponentType<{ components?: Record<string, unknown> }>
}

export default async function Page({
  params,
}: DeepDiveParamProps): Promise<React.ReactElement> {
  const { slug } = await params
  const page = deepDivesSource.getPage(slug)
  if (!page) notFound()

  const data = page.data as DeepDivePageData
  const MDXContent = data.body

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title ?? "Untitled"}</DocsTitle>
      {data.description && <DocsDescription>{data.description}</DocsDescription>}
      <DocsBody>
        <MDXContent components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  )
}
