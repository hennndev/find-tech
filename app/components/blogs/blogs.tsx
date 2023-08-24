"use client"
import React from 'react'
import Blog from './blog'
import BlogAdmin from '../admin/blogAdmin'
import { Toaster } from 'react-hot-toast'
import { BlogTypes } from '@/app/types/BlogTypes.types'

type PropsTypes = {
  data: BlogTypes[]
  isAdmin?: boolean
}

const Blogs = ({data, isAdmin = false}: PropsTypes) => {
  return (
    <div className="grid grid-cols-cards gap-x-10 gap-y-5">
      <Toaster/>
      {data.map((blog) => (
        !isAdmin ? <Blog key={blog._id} data={blog}/> : <BlogAdmin key={blog._id} data={blog}/>
      ))}
    </div>
  )
}
export default Blogs