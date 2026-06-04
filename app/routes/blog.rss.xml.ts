import { seo } from "../../paragraph.config"

export async function loader() {
  return new Response(await seo.rssXml({ route: "blog" }), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  })
}
