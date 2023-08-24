import { apiRoute } from "../config/config"

export async function getBlogs() {
  const res = await fetch(`${apiRoute}/api/blogs`, {
    cache: "no-store"
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
  }
 
  return res.json()
}