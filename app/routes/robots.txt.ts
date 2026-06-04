import { seo } from "../../paragraph.config"

export async function loader() {
  return new Response(await seo.robotsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  })
}
