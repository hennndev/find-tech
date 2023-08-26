import { NextResponse } from 'next/server' 
import { v2 as cloudinary } from 'cloudinary'
import { connectDB } from "@/app/lib/mongoose"
import { Blogs } from "@/app/lib/models/blog.model"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});


export async function GET(request: Request, {params}: {params: {id: string}}) {
  await connectDB()
  try {
    const { id } = params
    const blog = await Blogs.findOne({_id: id})
    return NextResponse.json({
      message: "Success get blog",
      data: blog
    }, {status: 200})
  } catch (error) {
    return NextResponse.json({
      message: "Failed get blog"
    }, {status: 400})    
  }
}

export async function PUT(request: Request, {params: {id}}: {params: {id: string}}) {
  await connectDB()
  try {
    const data = await request.json()
    if(data.oldImageId) {
      await Blogs.updateOne({_id: id}, {...data}).then(async() => {
        await cloudinary.uploader.destroy(data.oldImageId, (err: Error) => console.log(err))
      })
    } else {
      await Blogs.updateOne({_id: id}, {...data})
    }
    return NextResponse.json({
      message: "Success update blog"
    }, {status: 200})
  } catch (error) {
    return NextResponse.json({
      message: "Failed update blog"
    }, {status: 400})
  }
}


export async function DELETE(request: Request, {params: {id}}: {params: {id: string}}) {
  await connectDB()
  try {
    const { image_public_id } = await request.json()
    await Blogs.findByIdAndDelete(id).then(async() => {
      await cloudinary.uploader.destroy(image_public_id, (err: Error) => console.log(err))
    })
    return NextResponse.json({
      message: "Success delete blog"
    }, {status: 200})
  } catch (error) {
    return NextResponse.json({
      message: "Failed delete blog"
    }, {status: 400})
  }
}