import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  route("blog/rss.xml", "routes/blog.rss.xml.ts"),
  route(":locale", "routes/locale.tsx"),
  route(":locale/blog", "routes/locale.blog.tsx"),
  route(":locale/blog/:slug", "routes/locale.blog.$slug.tsx"),
  route(":locale/blog/rss.xml", "routes/locale.blog.rss.xml.ts"),
  route("llms.txt", "routes/llms.txt.ts"),
  route("robots.txt", "routes/robots.txt.ts"),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
] satisfies RouteConfig
