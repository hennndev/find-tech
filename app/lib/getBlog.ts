import { apiRoute } from "../config/config"

export async function getBlog(id: number) {
  const res = await fetch(`${apiRoute}/api/blogs/${id}`, {
    cache: "no-store"
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
  }
 
  return res.json()
}