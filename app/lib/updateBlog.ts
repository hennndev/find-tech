import { apiRoute } from "../config/config"

export const updateBlog = async (_id: string, newDataBlog: {
  blogTitle?: string
  blogAuthor?: string
  blogCategories?: {category: string}[]
  blogImage?: {
      imageId: string
      imageURL: string
  }
  blogDescriptions?: {
      descriptionTitle: string,
      descriptionContent: string
  }[]
  oldImageId?: string
}) => {
  const req = await fetch(`${apiRoute}/api/blogs/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newDataBlog)
  })
  return req.json()
}
