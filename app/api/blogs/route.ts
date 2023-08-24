import { NextResponse } from 'next/server'
import { Blogs } from '@/app/lib/models/blog.model'
import { connectDB } from '@/app/lib/mongoose'

export async function GET() {
  await connectDB()
  try {
    const data = await Blogs.find({}, "-updatedAt -__v")
    return NextResponse.json({
      message: "Success",
      data: data
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Failed"
    })
  }
}


export async function POST(request: Request, response: Response) {
  await connectDB()

  try {
    const blog = await request.json()
    await Blogs.create(blog)
    return NextResponse.json({
      message: "Success upload new blog",
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Failed upload new blog"
    })
  }
}