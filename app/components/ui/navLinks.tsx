"use client"
import React, { useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

type PropsTypes = {
  isAdmin: boolean
  isDesktop?: boolean,
  closeNavbar: () => void
}

const NavLinks = ({isDesktop = false, isAdmin, closeNavbar}: PropsTypes) => {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState(false)
  const handleRoute = (route?: string) => {
    router.push(`/${route}`)
    setOpenDropdown(false)
    closeNavbar()
  }
  return (
    <Fragment>
      <p onClick={() => handleRoute("")} className="nav-link w-max">
        Home
      </p>
      <p onClick={() => handleRoute("blogs")} className="nav-link w-max">
        Blogs
      </p>
      {isAdmin && (
        <div className="relative">
          <div className="nav-link w-max hover:no-underline cursor-pointer flexx" onClick={() => setOpenDropdown(!openDropdown)}>
            <p>Admin</p>
            {openDropdown ? <HiChevronUp className="text-lg ml-0.5 mt-0.5"/> : <HiChevronDown className="text-lg ml-0.5 mt-0.5"/>}
          </div>
          {openDropdown && (
            <div className={`${isDesktop ? "absolute -bottom-14 -left-16 px-6 py-2.5 dark:bg-gray-800 bg-white shadow-md rounded-md flexx space-x-5" : "flex flex-col space-y-4 px-5 py-4"}`}>
              <p onClick={() => handleRoute("admin/blogs")} className="nav-link w-max text-base font-[600] text-gray-700">
                {!isDesktop ? "#" : ""} Blogs
              </p>
              <p onClick={() => handleRoute("admin/users")} className="nav-link w-max text-base font-[600] text-gray-700 mb-0">
                {!isDesktop ? "#" : ""} Users
              </p>
            </div>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default NavLinks