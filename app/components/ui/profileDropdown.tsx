"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

type PropsTypes = {
  image: string
  name: string
  closeNavbar: () => void
}

const ProfileDropdown = ({image, name, closeNavbar}: PropsTypes) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const handleDropdown = () => {
    setOpenDropdown(!openDropdown)
    closeNavbar()
  }
  return (
    <div className="relative w-6 h-6 rounded-full cursor-pointer">
      <Image src={image ? image : `https://api.multiavatar.com/${name}.png`} fill sizes="auto" quality={75} className="w-full h-full object-contain rounded-full" alt="img-account" onClick={handleDropdown}/>
      {openDropdown && (
        <div className="absolute z-[50] top-8 -left-20 dark:bg-gray-800 bg-white shadow-md rounded-md flex flex-col space-y-4 p-3">
          <button className="button button-danger text-white text-xs" onClick={() => signOut()}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown