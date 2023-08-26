"use client"
import React from 'react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BlogTypes } from '@/app/types/BlogTypes.types'

type PropsTypes = {
    data: BlogTypes[]
}
const RecentBlogs = ({data}: PropsTypes) => {

  const router = useRouter()
  const leftBlog = data[0]
  return (
    <section className="hidden lg:flex flex-col mt-20 px-5">
      <h1 className="text-2xl font-[800] dark:text-gray-200 text-gray-700 mb-7">Recent blog posts</h1>  
      <div className="flex flex-col lg:flex-row">
        <div className="flex-[0.55] xl:flex-[0.5] lg:mr-5 max-h-[600px] xl:max-h-[700px] cursor-pointer group" onClick={() => router.push(`/blogs/${leftBlog._id}`)}>
          <div className="relative w-full h-[400px] xl:h-[500px] rounded-lg">
            <Image 
              src={leftBlog.blogImage.imageURL}
              fill
              sizes="auto"
              alt="sample"
              quality={75}
              className="w-full h-full object-cover rounded-lg"/>
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium dark:text-gray-400 text-gray-700">
              {leftBlog.blogAuthor} {" "}
              <span>&middot;</span> {" "} 
              {moment(leftBlog.createdAt).startOf('minutes').fromNow()}
            </p>
            <div className="mt-1 mb-2 dark:text-gray-200 text-gray-700">
              <h2 className="text-2xl font-[800] mb-1 group-hover:underline group-hover:text-blue-600">{leftBlog.blogTitle}</h2>
              <p className="text-sm dark:text-gray-400 text-gray-600 font-semibold leading-[1.7] line-clamp-3">{leftBlog.blogDescriptions[0].descriptionContent}</p>
            </div>
            <div className="flexx">
              {leftBlog.blogCategories.map(cty => (
                <p key={cty._id} className="blog-category mr-1 mb-2">{cty.category}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-[0.45] xl:flex-[0.5] flex-col space-y-5 max-h-[600px] xl:max-h-[700px] overflow-y-auto scrollbar-hide">
          {data.map(blog => (
            <div className="flex space-x-3 cursor-pointer group" key={blog._id} onClick={() => router.push(`/blogs/${blog._id}`)}>
              <div className="relative flex-[0.5] w-full lg:h-[170px] xl:h-[190px] rounded-lg">
                <Image 
                    src={blog.blogImage.imageURL}
                    fill
                    sizes="auto"
                    alt={blog.blogTitle}
                    quality={75}
                    className="w-full h-full object-cover rounded-lg"/>
              </div>
              <div className="flex-[0.5]">
                <p className="text-xs xl:text-sm font-medium dark:text-gray-400 text-gray-700">
                  {blog.blogAuthor} {" "}
                  <span>&middot;</span> {" "} 
                  {moment(blog.createdAt).startOf('minutes').fromNow()}
                </p>
                <div className="mt-1 mb-2 dark:text-gray-200 text-gray-700">
                  <h2 className="text-lg xl:text-xl font-[800] mb-1 line-clamp-2 xl:line-clamp-3 group-hover:underline group-hover:text-blue-600">{blog.blogTitle}</h2>
                  <p className="text-sm dark:text-gray-400 text-gray-600 font-semibold leading-[1.7] line-clamp-2 xl:line-clamp-3">
                    {blog.blogDescriptions[0].descriptionContent}
                  </p>
                </div>
                <div className="flexx flex-wrap">
                  {blog.blogCategories.map(cty => (
                    <p key={cty._id} className="blog-category">{cty.category}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentBlogs