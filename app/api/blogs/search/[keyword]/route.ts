import { Blogs } from "@/app/lib/models/blog.model"
import { connectDB } from "@/app/lib/mongoose"
import { NextResponse } from "next/server"

export async function GET(request: Request, {params: {keyword}}: {params: {keyword: string}} ) {
  await connectDB()
  try {
    const data = await Blogs.find({ 
      $or: [
        {blogTitle: { "$regex": keyword, "$options": "i" }},
        {blogAuthor: { "$regex": keyword, "$options": "i" }},
        {"blogCategories.category": {"$regex": keyword, "$options": "i"}}
      ]
    })
    console.log(data)
    return NextResponse.json({
      message: "Success get blogs by search keyword",
      data: data
    }, {status: 200})
  } catch (error) {
    return NextResponse.json({
      message: "Failed get blogs by search keyword"
    }, {status: 400})
  }
}