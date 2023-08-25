"use client"
import React from 'react'
import { categoriesData } from '@/app/constants/blogs'
import { useRouter, usePathname } from 'next/navigation'

const Categories = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isPathname = pathname.split("/").reverse()[0]
  const onClick = (path?: string) => router.push(`/blogs${path}`)

  return (
    <section className="flex-center mt-10">
      <div className="flex sm:flex-center flex-wrap max-w-[700px]">
        {categoriesData.map(category => (
          <div key={category.path} 
            className={`group category 
              ${isPathname === (category.path === "" ? "blogs" : category.path) ? "category-active" : ""}`} 
              onClick={() => onClick(category.path === "" ? "" : `/category/${category.path}`)}>
            <p className={`category-text ${isPathname === (category.path === "" ? "blogs" : category.path) ? "category-text-active" : "dark:text-gray-300 text-gray-700" }`}>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
export default Categories