import { Link } from "react-router"

type BlogPost = {
  id: string
  slug: string
  title: string
}

export function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <main>
      <h1>Blog</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
