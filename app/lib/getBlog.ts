import { apiRoute } from "../config/config"
export async function getBlog(id: string) {
  const res = await fetch(`${apiRoute}/api/blogs/${id}`, {
    next: {
      revalidate: 60
    }
  })
  if (!res.ok)  return null
  return res.json()
}