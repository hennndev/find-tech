import React from 'react'
import Link from 'next/link'
import BlogForm from '@/app/components/admin/blogForm'
import PageContainer from '@/app/components/layout/pageContainer'

export const metadata = {
  title: "Add New Blog"
}

const AddBlogPage = () => {
  return (
    <PageContainer classes="mt-16 px-5">
      <div className="flex-between mb-7">
          <h1 className="text-2xl font-[800] dark:text-gray-200 text-gray-700">Add new blog</h1>
          <Link href="/admin/blogs" className="button py-2">Back</Link>
      </div>
      <BlogForm/>
    </PageContainer>
  )
}

export default AddBlogPage