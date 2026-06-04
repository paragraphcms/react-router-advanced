import { redirect } from "react-router"
import type { Route } from "./+types/locale"
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

  return redirect(`/${locale}/blog`)
}

export default function LocaleRoute() {
  return null
}
