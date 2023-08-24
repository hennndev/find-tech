"use client"
import React from 'react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BlogTypes } from '@/app/types/BlogTypes.types'

type PropsTypes = {
  data: BlogTypes
}
const Blog = ({data}: PropsTypes) => {
  const router = useRouter()
  return (
    <div className="min-h-[450px] cursor-pointer group" onClick={() => router.push(`/blogs/${data._id}`)}>
      <div className="relative flex-[0.5] h-[250px]">
        <Image 
          src={data.blogImage.imageURL}
          fill
          sizes="auto"
          alt={data.blogTitle}
          quality={75}
          className="w-full h-full object-cover rounded-lg"/>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium dark:text-gray-400 text-gray-700">
          {data.blogAuthor} {" "}
          <span>&middot;</span> {" "} 
          {moment(data.createdAt).startOf('day').fromNow()}
        </p>
        <div className="mt-1 mb-3 dark:text-gray-200 text-gray-700">
          <h2 className="text-xl font-[800] mb-1 group-hover:underline group-hover:text-blue-600">{data.blogTitle}</h2>
          <p className="text-sm font-semibold dark:text-gray-400 text-gray-600 leading-[1.7] line-clamp-3">{data.blogDescriptions[0].descriptionContent}</p>
        </div>
        <div className="flexx flex-wrap">
          {data.blogCategories.map(cty => (
            <p className="blog-category" key={cty._id}>
              {cty.category}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog