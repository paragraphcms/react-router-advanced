import { Client } from "@paragraphcms/client"
import { SEO, localizedContentRoute, localizedRoute } from "@paragraphcms/seo"

const apiKey = process.env.PARAGRAPH_API_KEY

if (!apiKey) {
  throw new Error("PARAGRAPH_API_KEY environment variable is not set")
}

export const client = new Client({ apiKey })

export const site = {
  url: process.env.SITE_URL || "http://localhost:3000",
  name: process.env.SITE_NAME || "React Router Starter",
  description: process.env.SITE_DESCRIPTION || undefined,
}

export const seo = new SEO({
  client,
  site,
  routes: {
    home: localizedRoute("blog"),
    blog: localizedContentRoute("blog"),
  },
})
