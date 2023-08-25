import React from 'react'
import { redirect } from 'next/navigation'
import Blogs from '@/app/components/blogs/blogs'
import BlogsEmpty from '@/app/components/ui/blogsEmpty'
import { BlogTypes } from '@/app/types/BlogTypes.types'
import Pagination from '@/app/components/ui/pagination'
import { getBlogsSearch } from '@/app/lib/getBlogsSearch'
import Categories from '@/app/components/blogs/categories'
import SearchInput from '@/app/components/blogs/searchInput'
import PageContainer from '@/app/components/wrapper/pageContainer'

export const metadata = {
  title: "Blogs Search"
}

const BlogsSearch = async ({searchParams}: {searchParams: {q: string | undefined}}) => {
  const value = searchParams.q as string 
  const response = await getBlogsSearch(value)
  const blogsData: BlogTypes[] = response?.data

  if(Object.keys(searchParams)?.length < 1 || !value) {
    return redirect("/blogs")
  }

  return (
    <PageContainer classes="px-5 xxl:px-0">
      <SearchInput/>
      <Categories/>
      {blogsData?.length > 0 ? (
        <section className="mt-16">
          <h1 className="text-2xl font-[800] dark:text-gray-200 text-gray-700 mb-7">All blog posts</h1>
          <Blogs data={blogsData}/>
          <Pagination/>
        </section>
      ): <BlogsEmpty/>}
    </PageContainer>
  )
}
export default BlogsSearch