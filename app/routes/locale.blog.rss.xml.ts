import type { Route } from "./+types/locale.blog.rss.xml"
import { client, seo } from "../../paragraph.config"

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale

  if (!locale) {
    throw new Response("Not Found", { status: 404 })
  }

  const { data: defaultLocale, error: defaultLocaleError } =
    await client.locales.getDefaultLocale()

  if (defaultLocaleError) {
    throw defaultLocaleError
  }

  if (locale === defaultLocale) {
    throw new Response("Not Found", { status: 404 })
  }

  return new Response(await seo.rssXml({ locale, route: "blog" }), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  })
}
