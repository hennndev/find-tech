import { NextResponse } from 'next/server'
import { connectDB } from "@/app/lib/mongoose"
import { Blogs } from "@/app/lib/models/blog.model"

export async function GET(request: Request, {params}: {params: {cty: string}}) {
  await connectDB()
  try {
    const { cty } = params
    const blogs = await Blogs.find({
      blogCategories: {
        $elemMatch: {
          category: cty
        }
      }
    })
    return NextResponse.json({
      message: "Success get blogs by category",
      data: blogs
    })
  } catch (error) {
    return NextResponse.json({
      message: "Success get blogs by category"
    })
  }
}