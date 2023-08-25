"use client"
import React, { useState } from 'react'

const Hero = () => {
  const [isFocus, setIsFocus] = useState(false)
  const onFocus = () => setIsFocus(true)
  const onBlur = () => setIsFocus(false)

  return (
    <div className="mt-20 lg:mt-32 px-4">
      <h1 className="text-[40px] md:text-[50px] font-[800] text-center dark:text-gray-200 text-gray-700">
        Get experience about tech and design
      </h1>
      <p className="mt-3 text-center text-base lg:text-lg dark:text-gray-200 text-gray-700 tracking-[0.5px] leading-[1.7] font-semibold">
        Subscribe to get new and updated blogs about technologies and modern design
      </p>
      <div className="flex-center">
        <div className={`flexx w-[500px] mt-7 border ${isFocus ? "dark:border-gray-600 border-gray-400 border-2" : "dark:border-gray-600 border-[#ccc]"} pl-3 pr-1 rounded-lg`}>
          <input onFocus={onFocus} onBlur={onBlur} type="text" placeholder="Type your email" className="bg-transparent border-none outline-none flex-1 py-3.5 mr-3 dark:text-gray-200 text-gray-700 dark:placeholder:text-gray-200 placeholder:text-gray-700"/>
          <button className="text-base px-3 py-2 button button-dark button-light">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}
export default Hero