import { apiRoute } from "../config/config"

export async function getBlogsByCategory(cty: string) {
  const res = await fetch(`${apiRoute}/api/blogs/category/${cty}`, {
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