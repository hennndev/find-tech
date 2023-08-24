"use client"
import React, { SyntheticEvent, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import Modal from '../ui/modal'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { BlogTypes } from '@/app/types/BlogTypes.types'

type PropsTypes = {
  data: BlogTypes
}

const BlogAdmin = ({data}: PropsTypes) => {
  const [isModal, setIsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleRoute = (route: string) => {
      router.push(route)
  }
  const handleRouteEdit = (e: SyntheticEvent, id: string) => {
    e.stopPropagation()
    router.push(`/admin/blogs/edit-blog/${id}`)
  }
  const handleOpenModal = (e: SyntheticEvent) => {
    e.stopPropagation()
    setIsModal(true)
  }
  const handleClose = (e: SyntheticEvent) => {
    e.stopPropagation()
    setIsModal(false)
  }
  const deletePromise = (id: string, imageId: string) => {
    return new Promise(async(resolve, reject) => {
      const req = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image_public_id: imageId
        })
      })
      const res = await req.json()
      if(res) {
        resolve("Success delete this blog")
      } else {
        reject("Failed delete this blog")
      }
    }) 
  }
  const handleDelete = (e: SyntheticEvent, id: string, imageId: string) => {
    e.stopPropagation()
    setIsLoading(true)
    const promise = deletePromise(id, imageId)
    toast.promise(promise, {
      loading: "Waiting",
      success: (msg) => `${msg}`,
      error: (err) => `${err}`
    }).then(() => setIsLoading(false))
  }
  return (
    <div className="min-h-[500px] cursor-pointer" onClick={() => handleRoute(`/blogs/${data._id}`)}>
      <div className="relative flex-[0.5] h-[250px]">
        <Image 
          src={data.blogImage.imageURL}
          fill
          sizes="auto"
          alt={data.blogTitle}
          quality={75}
          className="w-full h-full object-cover rounded-lg"/>
      </div>
      <div className="mt-2">
        <div className="flex-between">
          <p className="text-sm dark:text-gray-300 text-gray-700">
            {data.blogAuthor} {" "}
            <span>&middot;</span> {" "} 
            {moment(data.createdAt).startOf('day').fromNow()}
          </p>
        </div>
        <div className="mt-2 mb-4 dark:text-gray-200 text-gray-700">
          <h2 className="text-xl font-[800] mb-1">{data.blogTitle}</h2>
          <p className="text-sm font-medium dark:text-gray-400 text-gray-600 leading-[1.7] line-clamp-3">{data.blogDescriptions[0].descriptionContent}</p>
        </div>
        <div className="flexx flex-wrap">
          {data.blogCategories.map(cty => (
            <p className="blog-category" key={cty._id}>
              {cty.category}
            </p>
          ))}
        </div>
        <div className="flexx mt-3">
          <button className="border-none outline-none px-3 py-1 rounded-md button-primary text-sm text-gray-200 font-semibold mr-1" onClick={(e) => handleRouteEdit(e, data._id)}>Edit</button>
          <button className="border-none outline-none px-3 py-1 rounded-md button-danger text-sm text-gray-200 font-semibold" onClick={handleOpenModal}>Delete</button>
        </div>
      </div>

      {isModal && (
        <Modal handleClose={(e) => !isLoading && handleClose(e)}>
          <div className="p-5 pb-2 text-center">
            <p className="dark:text-gray-200 text-gray-700 text-xl font-semibold">Are you sure want to delete this blog?</p>
            <p className="dark:text-red-500 text-red-600 mt-2 font-semibold">This blog will deleted permanently</p>
          </div>
          <div className="flexx mt-3 border-t dark:border-gray-600 border-gray-400 pt-5 pb-5 pl-5">
            <button className="border-none outline-none px-3 py-1 rounded-md button-danger text-gray-200 font-semibold mr-2" onClick={(e) => handleDelete(e, data._id, data.blogImage.imageId)} disabled={isLoading}>Delete</button>
            <button className="border-none outline-none px-3 py-1 rounded-md button-secondary text-gray-200 font-semibold" onClick={(e) => handleClose(e)} disabled={isLoading}>Decline</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default BlogAdmin