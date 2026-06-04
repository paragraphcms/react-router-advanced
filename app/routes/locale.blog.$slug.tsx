import type { Page } from "@paragraphcms/client"
import { useLoaderData } from "react-router"
import type { Route } from "./+types/locale.blog.$slug"
import { Post } from "../components/blog/post"
import { client } from "../../paragraph.config"

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale
  const slug = params.slug

  if (!locale || !slug) {
    throw new Response("Not Found", { status: 404 })
  }

  const {
    data: defaultLocale,
    error: defaultLocaleError,
  } = await client.locales.getDefaultLocale()

  if (defaultLocaleError) {
    throw defaultLocaleError
  }

  if (locale === defaultLocale) {
    throw new Response("Not Found", { status: 404 })
  }

  const { data, error } = await client.pages.list({
    includeContent: true,
    language: locale,
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
    locale,
    page: page as { title: Page["title"]; content: Page["content"] },
  }
}

export default function LocalizedBlogPostRoute() {
  const { page } = useLoaderData<typeof loader>()

  return <Post page={page} />
}
