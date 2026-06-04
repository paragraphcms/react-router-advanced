import { Client } from "@paragraphcms/client"
import type { Config } from "@react-router/dev/config"
import { loadEnv } from "vite"

export default {
  async prerender() {
    const env = loadEnv("", process.cwd(), "")
    const apiKey = env.PARAGRAPH_API_KEY || process.env.PARAGRAPH_API_KEY

    if (!apiKey) {
      throw new Error("PARAGRAPH_API_KEY environment variable is not set")
    }

    const client = new Client({ apiKey })
    const {
      data: defaultLocale,
      error: defaultLocaleError,
    } = await client.locales.getDefaultLocale()

    if (defaultLocaleError) {
      throw defaultLocaleError
    }

    const { data: locales, error: localesError } = await client.locales.list()

    if (localesError) {
      throw localesError
    }

    const paths = new Set([
      "/",
      "/blog",
      "/blog/rss.xml",
      "/llms.txt",
      "/robots.txt",
      "/sitemap.xml",
    ])

    for (const locale of locales) {
      const { data: pages, error } = await client.pages.list({
        language: locale.code,
        requiredSlug: true,
      })

      if (error) {
        throw error
      }

      if (locale.code !== defaultLocale) {
        paths.add(`/${locale.code}`)
        paths.add(`/${locale.code}/blog`)
        paths.add(`/${locale.code}/blog/rss.xml`)
      }

      for (const page of pages) {
        paths.add(
          locale.code === defaultLocale
            ? `/blog/${page.slug}`
            : `/${locale.code}/blog/${page.slug}`,
        )
      }
    }

    return Array.from(paths).sort()
  },
  ssr: true,
} satisfies Config
