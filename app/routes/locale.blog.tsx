import { useLoaderData } from "react-router"
import type { Route } from "./+types/locale.blog"
import { Blog } from "../components/blog/blog"
import { client } from "../../paragraph.config"

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale

  if (!locale) {
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
    language: locale,
    requiredSlug: true,
  })

  if (error) {
    throw error
  }

  return { locale, posts: data }
}

export default function LocalizedBlogRoute() {
  const { posts } = useLoaderData<typeof loader>()

  return <Blog posts={posts} />
}
