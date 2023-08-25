import React, { Fragment } from 'react'
import { getBlogs } from '@/app/lib/getBlogs'
import Blogs from '@/app/components/blogs/blogs'
import BlogsEmpty from '@/app/components/ui/blogsEmpty'
import { BlogTypes } from '@/app/types/BlogTypes.types'
import Pagination from '@/app/components/ui/pagination'
import Categories from '@/app/components/blogs/categories'
import SearchInput from '@/app/components/blogs/searchInput'
import PageContainer from '@/app/components/wrapper/pageContainer'

export const metadata = {
  title: "Blogs Page"
}

const BlogsPage = async () => {
  const response = await getBlogs()
  const blogsData: BlogTypes[] = response?.data
  return (
    <PageContainer classes="px-5 xxl:px-0">
      {blogsData?.length > 0 ? (
        <Fragment>
          <SearchInput/>
          <Categories/>
          <section className="mt-16">
            <h1 className="text-2xl font-[800] dark:text-gray-200 text-gray-700 mb-7">All blog posts</h1>
            <Blogs data={blogsData}/>
          </section>
          <Pagination/>
        </Fragment>
      ): <BlogsEmpty/>}
    </PageContainer>
  )
}
export default BlogsPage