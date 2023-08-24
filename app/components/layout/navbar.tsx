"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import NavLinks from '../ui/navLinks'
import { useTheme } from 'next-themes'
import { useSession } from 'next-auth/react'
import ProfileDropdown from '../ui/profileDropdown'
import { MdDarkMode, MdSunny, MdOutlineMenu, MdClose } from 'react-icons/md'

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { data:session, status } = useSession()
  const [openNavbar, setOpenNavbar] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const handleTheme = () => theme === 'dark' ? setTheme('light') : setTheme('dark')
  if (!mounted) return null

  const handleOpenNavbar = () => {
    setOpenNavbar(!openNavbar)
  }

  const isAdmin = session && session?.user?.role !== "user" ? true : false

  console.log(session)

  return (
    <header className="py-5 w-full px-5">
      <div className="flex-between">
        <h1 className="font-extrabold text-3xl dark:text-gray-200 text-gray-700">
          Find
          <span className="dark:text-blue-500 text-blue-700">
            Tech
          </span>
        </h1>
        <nav className="flexx">
          <div className="hidden lg:flexx space-x-10 mr-24">
            <NavLinks isDesktop closeNavbar={() => setOpenNavbar(false)} isAdmin={isAdmin}/>
          </div>
          <div className="flexx space-x-3 lg:space-x-5">
            {theme === "light" ? 
              <MdDarkMode className="nav-icon" onClick={handleTheme}/> : <MdSunny className="nav-icon" onClick={handleTheme}/>
            }
            {session?.user && <ProfileDropdown image={session?.user?.image} closeNavbar={() => setOpenNavbar(false)}/>}
            {!session?.user && (
              <div className="hidden lg:flexx space-x-5">
                <Link href="/login" className="nav-link">
                  Log in
                </Link>
                <Link href="/signup" className="button">
                  Sign up
                </Link>
              </div>
            )}
            {openNavbar ? <MdClose className="nav-icon block lg:hidden" onClick={handleOpenNavbar}/> : <MdOutlineMenu className="nav-icon block lg:hidden" onClick={handleOpenNavbar}/>}
          </div>
        </nav>
      </div>
        
      {/* mobile */}
      <div className={`flex-col dark:bg-gray-800 bg-gray-50 py-6 px-5 rounded-md mt-4 ${openNavbar ? "flex lg:hidden" : "hidden"}`}>
        <nav className="flex flex-col space-y-4">
          <NavLinks closeNavbar={() => setOpenNavbar(false)} isAdmin={isAdmin}/>
          <div className="flexx space-x-3">
            {!session?.user && (
              <>
                <Link href="/login" className="nav-link">
                  Log in
                </Link>
                <span>|</span>
                <Link href="/signup" className="nav-link">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar