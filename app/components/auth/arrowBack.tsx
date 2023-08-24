"use client"
import React from 'react'
import Link from 'next/link'
import { HiArrowNarrowLeft } from 'react-icons/hi'

const ArrowBack = () => {
  return (
    <div className="flex-center lg:hidden">
      <div className="items-start w-full sm:w-[80%] lg:w-[90%] xl:w-[75%]">
        <Link href="/" className="flexx w-max font-semibold mt-5 text-gray-600 px-3 py-1 rounded-md transition duration-300 transform hover:-translate-x-3 mb-3">
          <HiArrowNarrowLeft className="mr-2 text-lg"/>
          Back to blogs
        </Link>
      </div>
    </div>
  )
}
export default ArrowBack