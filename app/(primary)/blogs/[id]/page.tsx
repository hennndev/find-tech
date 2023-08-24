import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlog } from '@/app/lib/getBlog'
import { BlogTypes } from '@/app/types/BlogTypes.types'
import Comments from '@/app/components/blogs/blogDetail/comments'
import PageContainer from '@/app/components/layout/pageContainer'
import { apiRoute } from '@/app/config/config'


export async function generateMetadata({params}: {params: {id: number}}) {
  const response = await getBlog(params.id)
  const data = response?.data
  if(!data) {
    return {
        title: "Blog not found"
    }
  }
  return {
    title: data.blogTitle,
    description: data.blogDescriptions[0].descriptionContent
  }
}

const BlogDetail = async ({params}: {params: {id: number}}) => {
    const response = await getBlog(params.id)
    const data: BlogTypes = response?.data
    if(!Array.isArray(data) && !data) {
      return notFound()
    }
   
    return (
      <PageContainer>
        <div className="flex justify-center w-full min-h-screen mt-10">

          <div className="flex flex-col w-[1200px]">
            <div className="flex-center">
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-lg">
                <Image 
                  src={data.blogImage.imageURL}
                  fill
                  sizes="auto"
                  alt={data.blogTitle}
                  quality={75}
                  className="w-full h-full object-cover rounded-lg"/>
              </div>
            </div>

            <div className="mt-10 px-5 xxl:px-0">
              <div className="flex-center mb-4 text-sm font-medium ">
                <p className="dark:bg-blue-700 bg-blue-500 text-gray-100 py-1 px-3 rounded-md">{data.blogAuthor}</p>
                <span className="mx-2">&middot;</span> {" "} 
                <p>{new Date(data.createdAt).toDateString()}</p>
              </div>
              <h1 className="text-center leading-[1.4] dark:text-gray-200 mt-4 text-3xl md:text-4xl xl:text-5xl font-[800] text-gray-700 mb-4 md:mb-6 tracking-[0.7px]">
                {data.blogTitle}
              </h1>
              <div className="flex-center flex-wrap">
                {data.blogCategories.map((cty: {_id: string, category: string}) => (
                  <p className="blog-category text-sm md:text-base px-3" key={cty._id}>
                    {cty.category}
                  </p>
                ))}
              </div>
              <div className="flex-center">
                <div className="mt-16 max-w-[700px]">
                  {data.blogDescriptions.map(desc => (
                    <div className="mb-10" key={desc._id}>
                      <h2 className="text-xl lg:text-2xl font-bold mb-3 dark:text-gray-200 text-gray-700">{desc.descriptionTitle}</h2>
                      <p className="dark:text-gray-300 text-gray-700 font-semibold leading-[1.9] tracking-[0.5px]">{desc.descriptionContent}</p>
                    </div>
                  ))}
                  <Comments/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    )
}

// export async function generateStaticParams() {
//   const res = await fetch(`${apiRoute}/api/blogs`)
//   const data = await res.json()
//   return data?.data?.map((data: BlogTypes) => ({
//     id: data._id.toString(),
//   }))
// }

export default BlogDetail