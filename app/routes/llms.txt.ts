import { seo } from "../../paragraph.config"

export async function loader() {
  return new Response(await seo.llmsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  })
}
