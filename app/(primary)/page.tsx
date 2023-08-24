import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Hero from '@/app/components/home/hero'
import { getBlogs } from '@/app/lib/getBlogs'
import Blogs from '@/app/components/blogs/blogs'
import BlogsEmpty from '../components/ui/blogsEmpty'
import { BlogTypes } from '../types/BlogTypes.types'
import Pagination from '@/app/components/ui/pagination'
import RecentBlogs from '@/app/components/home/recentBlogs'
import PageContainer from '@/app/components/layout/pageContainer'

export const metadata = {
  title: "Home Page"
}

const HomePage = async () => {
  const response = await getBlogs()
  const blogsData: BlogTypes[] = response?.data
  // const recentData = blogsData?.slice(0, 5)
  // const session = await getServerSession(authOptions)


  return (
    <PageContainer>
      <Hero/>
      {blogsData?.length > 0 ? (
        <>
          <RecentBlogs data={blogsData?.slice(0, 5)}/>
          <section className="mt-20 px-5 xl:px-0">
            <h1 className="text-2xl font-[800] dark:text-gray-200 text-gray-700 mb-7">All blog posts</h1>
            <Blogs data={blogsData}/>
          </section>
          <Pagination/>
        </>
      ): <BlogsEmpty/>}
    </PageContainer>
  )
}

export default HomePage