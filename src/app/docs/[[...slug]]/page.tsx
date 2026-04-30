import { notFound } from "next/navigation"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from "fumadocs-ui/page"
import { docsSource } from "@/lib/docs-source"
import { AipResources } from "@/components/aip-resources"

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
  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export default async function Page({ params }: DocsParamProps): Promise<React.ReactElement> {
  const { slug } = await params
  const page = docsSource.getPage(slug)
  if (!page) notFound()

  const data = page.data as {
    title?: string
    description?: string
    aip?: number | string
  }

  const aipNumber =
    typeof data.aip === "number"
      ? data.aip
      : typeof data.aip === "string"
        ? Number.parseInt(data.aip, 10)
        : undefined

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{data.title ?? "Untitled"}</DocsTitle>
      {data.description && <DocsDescription>{data.description}</DocsDescription>}
      <DocsBody>
        <MDX />
        {aipNumber !== undefined && Number.isFinite(aipNumber) && (
          <AipResources aip={aipNumber} />
        )}
      </DocsBody>
    </DocsPage>
  )
}
