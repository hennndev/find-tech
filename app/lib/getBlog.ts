import { apiRoute } from "../config/config"

export async function getBlog(id: string) {
  const res = await fetch(`${apiRoute}/api/blogs/${id}`, {
    next: {
      revalidate: 60
    }
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
  }
 
  return res.json()
}