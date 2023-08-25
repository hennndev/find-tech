import { apiRoute } from "@/app/config/config"
export async function getBlogs() {
  const res = await fetch(`${apiRoute}/api/blogs`, {
    next: {
      revalidate: 60
    }
  })
  if (!res.ok) return null
  return res.json()
}