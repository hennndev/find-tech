"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const SearchInput = () => {
  const router = useRouter()
  const [isFocus, setIsFocus] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const onFocus = () => setIsFocus(true)
  const onBlur = () => setIsFocus(false)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)
  const handleSearch = () => {
    router.push(`/blogs/search?q=${searchTerm}`)
  }

  return (
    <div className="mt-20">
      <p className="text-center dark:text-gray-200 text-gray-700 font-semibold tracking-[0.5px]">
        Find specific blogs what do you want to read by title, category, writer or dates
      </p>
      <div className="flex-center">
        <div className={`flexx w-[500px] mt-3 border ${isFocus ? "dark:border-gray-600 border-gray-400 border-2" : "dark:border-gray-600 border-[#ccc]"} pl-3 pr-1 rounded-lg`}>
          <input value={searchTerm} onChange={onChange} onFocus={onFocus} onBlur={onBlur} type="text" placeholder="Find specific blogs" className="bg-transparent border-none outline-none flex-1 py-2 mr-3 dark:text-gray-200 text-gray-700 dark:placeholder:text-gray-200 placeholder:text-gray-700 font-medium"/>
          <button className="text-base px-3 py-1 button">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchInput