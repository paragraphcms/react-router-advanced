import type { Page } from "@paragraphcms/client"
import { useLoaderData } from "react-router"
import type { Route } from "./+types/blog.$slug"
import { Post } from "../components/blog/post"
import { client } from "../../paragraph.config"

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params.slug

  if (!slug) {
    throw new Response("Not Found", { status: 404 })
  }

  const {
    data: defaultLocale,
    error: defaultLocaleError,
  } = await client.locales.getDefaultLocale()

  if (defaultLocaleError) {
    throw defaultLocaleError
  }

  const { data, error } = await client.pages.list({
    includeContent: true,
    language: defaultLocale,
    requiredSlug: true,
    slug,
  })

  if (error) {
    throw error
  }

  const page = data[0]

  if (!page || page.content === undefined) {
    throw new Response("Not Found", { status: 404 })
  }

  return {
    locale: defaultLocale,
    page: page as { title: Page["title"]; content: Page["content"] },
  }
}

export default function BlogPostRoute() {
  const { page } = useLoaderData<typeof loader>()

  return <Post page={page} />
}
