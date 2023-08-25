import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongoose'
import { Blogs } from '@/app/lib/models/blog.model'

export async function GET() {
  await connectDB()
  try {
    const data = await Blogs.find({}, "-updatedAt -__v").sort({createdAt: -1})
    return NextResponse.json({
      message: "Success get blogs data",
      data: data
    }, {status: 200})
  } catch (error) {
    return NextResponse.json({
      message: "Failed get blogs data"
    }, {status: 400})
  }
}

export async function POST(request: Request) {
  await connectDB()
  try {
    const blog = await request.json()
    await Blogs.create(blog)
    return NextResponse.json({
      message: "Success upload new blog",
    }, {status: 201})
  } catch (error) {
    return NextResponse.json({
      message: "Failed upload new blog"
    }, {status: 400})
  }
}