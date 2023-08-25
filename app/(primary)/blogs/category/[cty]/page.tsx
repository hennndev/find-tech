import React, { Fragment } from 'react'
import Blogs from '@/app/components/blogs/blogs'
import Pagination from '@/app/components/ui/pagination'
import { BlogTypes } from '@/app/types/BlogTypes.types'
import Categories from '@/app/components/blogs/categories'
import SearchInput from '@/app/components/blogs/searchInput'
import { getBlogsByCategory } from '@/app/lib/getBlogsByCategory'
import PageContainer from '@/app/components/wrapper/pageContainer'

export async function generateMetadata({params}: {params: {cty: string}}) {
  return {
    title: `Blogs ${params.cty}`
  }
}

const BlogsCategory = async ({params}: {params: {cty: string}}) => {
  let response = await getBlogsByCategory(params.cty)
  const data: BlogTypes[] = response?.data

  return (
    <PageContainer classes="px-5 xxl:px-0">
      <SearchInput/>
      <Categories/>
      <section className="mt-16">
        {data.length > 0 ? (
          <Fragment>
            <h1 className="text-2xl font-[800] dark:text-gray-200 text-gray-700 mb-7 capitalize">{params.cty}</h1>
            <Blogs data={data}/>
            <Pagination/>
          </Fragment>
        ) : (
          <div className="flex-center">
            <p className="text-lg font-semibold dark:text-gray-200 text-gray-700">No blogs anymore</p>
          </div>
        )}
      </section>
    </PageContainer>
  )
}

export default BlogsCategory