import React from 'react'
import { getBlogs } from '@/app/lib/getBlogs'
import Hero from '@/app/components/home/hero'
import Blogs from '@/app/components/blogs/blogs'
import Pagination from '@/app/components/ui/pagination'
import { BlogTypes } from '@/app/types/BlogTypes.types'
import BlogsEmpty from '@/app/components/ui/blogsEmpty'
import RecentBlogs from '@/app/components/home/recentBlogs'
import PageContainer from '@/app/components/wrapper/pageContainer'

export const metadata = {
  title: "Home Page"
}
const HomePage = async () => {
  const response = await getBlogs()
  const blogsData: BlogTypes[] = response?.data
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