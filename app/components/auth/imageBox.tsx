"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiArrowNarrowLeft } from 'react-icons/hi'

const imageBox = () => {
  return (
    <div className="hidden lg:flex flex-col flex-[0.5] bg-gray-700 rounded-s-lg">
      <div className="relative h-[400px]">
        <Image src="/imgs/auth-img.png" 
          alt="login-image" 
          fill
          sizes="auto"
          quality={75}
          className="object-contain h-full"/>
      </div>
      <div className="flex-1 flex items-center text-center flex-col px-20">
        <h1 className="text-white font-bold text-2xl">Welcome to FindTech</h1>
        <p className="text-gray-200 mt-2 leading-[1.7] tracking-[0.5px] text-sm font-medium">Enter your personal details and lets journey our blogs to get your experienced about tech and design articles</p>
        <Link href="/" className="flexx text-sm font-semibold mt-5 bg-white text-gray-600 px-3 py-1 rounded-md transition duration-300 transform hover:-translate-x-3">
          <HiArrowNarrowLeft className="mr-2"/>
          Back to blogs
        </Link>
      </div>
    </div>
  )
}

export default imageBox