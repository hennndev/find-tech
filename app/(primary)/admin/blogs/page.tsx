import React from 'react'
import Link from 'next/link'
import { apiRoute } from '@/app/config/config'
import Blogs from '@/app/components/blogs/blogs'
import BlogsEmpty from '@/app/components/ui/blogsEmpty'
import { BlogTypes } from '@/app/types/BlogTypes.types'
import PageContainer from '@/app/components/layout/pageContainer'

export const metadata = {
  title: "Admin Blogs"
}
async function getBlogs() {
  const res = await fetch(`${apiRoute}/api/blogs`)
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
  }
 
  return res.json()
}
const AdminBlogsPage = async () => {
  const response = await getBlogs()
  const data: BlogTypes[] = response?.data
  return (
    <PageContainer classes="px-5 xxl:px-0 mt-16">
      {data?.length > 0 ? (
        <>
          <div className="flex-between mb-7">
            <h1 className="text-2xl font-[800] dark:text-gray-200 text-gray-700">All blog posts</h1>
            <Link href="/admin/blogs/add-blog" className="border-none outline-none px-3 py-2 rounded-md button-primary text-gray-200 font-semibold">Add new blog</Link>
          </div>
          <Blogs isAdmin data={data}/>
        </>
      ): (
        <div className="flex-center flex-col">
          <BlogsEmpty/>
          <Link href="/admin/blogs/add-blog" className="border-none outline-none px-3 py-2 rounded-md button-primary text-gray-200 font-semibold mt-3">Add new blog</Link>
        </div>
      )}
    </PageContainer>
  )
}
export default AdminBlogsPage