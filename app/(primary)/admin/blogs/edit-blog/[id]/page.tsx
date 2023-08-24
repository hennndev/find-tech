import React from 'react'
import Link from 'next/link'
import { getBlog } from '@/app/lib/getBlog'
import BlogForm from '@/app/components/admin/blogForm'
import { BlogTypes } from '@/app/types/BlogTypes.types'
import PageContainer from '@/app/components/layout/pageContainer'

export const metadata = {
  title: "Edit blog"
}

const EditBlogPage = async ({params}: {params: {id: number}}) => {
  const response = await getBlog(params.id)
  const data: BlogTypes = response?.data
  return (
    <PageContainer classes="mt-16 px-5">
      <div className="flex-between mb-7">
          <h1 className="text-2xl font-[800] dark:text-gray-200 text-gray-700">Edit blog</h1>
          <Link href="/admin/blogs" className="button py-2">Back</Link>
      </div>
      <BlogForm data={data}/>
    </PageContainer>
  )
}

export default EditBlogPage