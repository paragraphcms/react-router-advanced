import { useLoaderData } from "react-router"
import { Blog } from "../components/blog/blog"
import { client } from "../../paragraph.config"

export async function loader() {
  const {
    data: defaultLocale,
    error: defaultLocaleError,
  } = await client.locales.getDefaultLocale()

  if (defaultLocaleError) {
    throw defaultLocaleError
  }

  const { data, error } = await client.pages.list({
    language: defaultLocale,
    requiredSlug: true,
  })

  if (error) {
    throw error
  }

  return { locale: defaultLocale, posts: data }
}

export default function BlogRoute() {
  const { posts } = useLoaderData<typeof loader>()

  return <Blog posts={posts} />
}
