import { apiRoute } from "@/app/config/config"
export async function getBlogsSearch(param: string) {
  const res = await fetch(`${apiRoute}/api/blogs/search/${param}`)
  if (!res.ok) return null
  return res.json()
}