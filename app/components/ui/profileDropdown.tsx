"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

type PropsTypes = {
  image: string
  closeNavbar: () => void
}

const ProfileDropdown = ({image, closeNavbar}: PropsTypes) => {

  const [openDropdown, setOpenDropdown] = useState<boolean>(false)

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown)
    closeNavbar()
  }
  

  return (
    <div className="relative w-6 h-6 rounded-full cursor-pointer">
      <Image src={image ? image : "/imgs/blank-profile.png"} fill sizes="auto" quality={75} className="w-full h-full object-contain rounded-full" alt="img-account" onClick={handleDropdown}/>
      {openDropdown && (
        <div className="absolute top-8 -left-20 dark:bg-gray-800 bg-white shadow-md rounded-md flex flex-col space-y-4 p-3">
          <label htmlFor="image-upload" className="nav-link w-max text-sm hover:no-underline font-[600] text-gray-700">
            Upload image
          </label>
          <input type="file" id="image-upload" className="hidden" />
          <button className="buttonn button-danger text-white text-xs" onClick={() => signOut()}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown