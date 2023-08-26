"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { apiRoute } from '@/app/config/config'
import toast, { Toaster } from 'react-hot-toast'
import { updateBlog } from '@/app/lib/updateBlog'
import { uploadImage } from '@/app/lib/uploadImage'
import { BlogTypes } from '@/app/types/BlogTypes.types'
import { useForm, useFieldArray } from 'react-hook-form' 
import { usePreviewImage } from '@/app/hooks/usePreviewImage'
import { AiFillCloseSquare, AiFillCloseCircle } from 'react-icons/ai'

type PropsTypes = {
  dataEdit?: BlogTypes
} 
type FormValues = {
  blogTitle: string
  blogAuthor: string
  blogCategoryTerm: string
  blogCategories: {category: string}[]
  blogImage: FileList | string | null,
  blogDescriptions: {descriptionTitle: string, descriptionContent: string}[]
}
const imageFormat = ["jpeg", "png"]

const BlogForm = ({dataEdit}: PropsTypes) => {

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      blogTitle: "",
      blogAuthor: "",
      blogCategoryTerm: "",
      blogCategories: [],
      blogImage: null,
      blogDescriptions: [
        {
          descriptionTitle: "", 
          descriptionContent: ""
        }
      ]
    }
  })
  const { register, control, handleSubmit, setValue, getValues, clearErrors, watch, reset, formState: {errors} } = form
  const { fields, append, remove } = useFieldArray({name: "blogCategories", control})
  const { fields: fieldsDesc, append: appendDesc, remove: removeDesc } = useFieldArray({name: "blogDescriptions", control})
  const { prevImage, setPrevImage, handleChangePrevImage } = usePreviewImage()

  const uploadNewBlog = async (dataBlog: {
    blogTitle: string
    blogAuthor: string
    blogCategories: {category: string}[],
    blogDescriptions: {descriptionTitle: string, descriptionContent: string}[]
  } , file: File) => {
    return new Promise(async(resolve, reject) => {
      const image = await uploadImage(file)
      if(image) {
        await fetch(`${apiRoute}/api/blogs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...dataBlog,
            blogImage: {
              imageId: image.public_id,
              imageURL: image.url
            }
          })
        }).then((res) => {
          if(!res.ok) {
            reject("Failed upload new blog")
          } else {
            resolve("Success upload new blog")
          }
        })
      } else {
        reject("Failed upload image blog")
      }
    })
  }

  const uploadEditBlog = async (newDataBlog: {
    blogTitle?: string
    blogAuthor?: string
    blogCategories?: {category: string}[],
    blogDescriptions?: {descriptionTitle: string, descriptionContent: string}[]
  } , dataImage: File | null) => {
    return new Promise(async(resolve, reject) => {
      const dataBlog = dataEdit as BlogTypes
      if(dataImage) {
        const fileImage = dataImage as File
        const image = await uploadImage(fileImage)
        if(image) {
          await updateBlog(dataBlog._id, {
            ...newDataBlog,
            blogImage: {
              imageId: image.public_id,
              imageURL: image.url
            },
            oldImageId: dataBlog.blogImage.imageId
          }).then(() => resolve("Success upload edit blog")).catch(() => reject("Failed upload edit blog"))
        } else {
          reject("Failed upload image blog")
        }
      } else {
        await updateBlog(dataBlog._id, newDataBlog).then(() => {
          resolve("Success upload edit blog")
        }).catch(() => reject("Failed upload edit blog"))
      }
    })
  }

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    const {blogImage, blogCategoryTerm, ...dataBlog} = data
    const file = (blogImage as FileList)[0]
    const promise = dataEdit ? uploadEditBlog(dataBlog, typeof(file) !== "string" ? file : null) : uploadNewBlog(dataBlog, file)
    toast.promise(promise, {
      loading: "Waiting",
      success: "Success upload new blog",
      error: (err) => `${err.toString()}`
    }).then((res) => {
      setIsLoading(false)
      setPrevImage(null)
      reset()
    }).catch(() => setIsLoading(false))
  }
  const handleDeletePrevImage = () => {
    setPrevImage(null)
    clearErrors("blogImage")
    setValue("blogImage", null)
  }
  const handleAddCategory = () => {
    append({category: getValues("blogCategoryTerm")})
    clearErrors("blogCategoryTerm")
    setValue("blogCategoryTerm", "")
  }

  useEffect(() => {
    if(dataEdit) {
      setValue("blogTitle", dataEdit.blogTitle)
      setValue("blogAuthor", dataEdit.blogAuthor)
      setValue("blogCategories", dataEdit.blogCategories)
      setValue("blogDescriptions", dataEdit.blogDescriptions)
      setValue("blogImage", dataEdit.blogImage.imageURL)
      setPrevImage(dataEdit.blogImage.imageURL)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEdit])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Toaster/>
  
      <div className="flex flex-col mb-6">
        <label htmlFor="blogTitle" className="form-label">Blog title</label>
        <input 
          type="text" 
          placeholder="Type blog title" 
          className="input-control dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-300 text-base" 
          {...register("blogTitle", {
            required: "Blog title field is required!"
          })}/>
        <small className="error-input">{errors.blogTitle?.message}</small>
      </div>

      <div className="flex flex-col mb-6">
        <label htmlFor="blogTitle" className="form-label">Blog author</label>
        <input 
          type="text" 
          placeholder="Type blog title" 
          className="input-control dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-300 text-base" 
          {...register("blogAuthor", {
            required: "Blog author field is required!"
          })}/>
        <small className="error-input">{errors.blogAuthor?.message}</small>
      </div>
  
      <div className="flex flex-col mb-6">
        <label htmlFor="blogTitle" className="form-label">Blog categories</label>
        <div className="flexx">
          <input 
            type="text" 
            id="blogCategoryTerm"
            placeholder="Type blog title" 
            className="input-control dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-300 text-base flex-1 mr-3"
            {...register("blogCategoryTerm", {
              onChange: (e) => setValue("blogCategoryTerm", e.target.value.includes(" ") ? e.target.value.replace(" ", "-").toLowerCase() : e.target.value.toLowerCase()),
              validate: {
                blogCategoriesRequired: () => fields.length > 0 || "Blog categories is required, please type 1 or more category for this blog!"
              }
            })}/>
          <button type="button" className="button button-dark button-light py-2" disabled={watch("blogCategoryTerm") === ""} onClick={handleAddCategory}>Add</button>
        </div>
        {fields.length > 0 && (
          <div className="flexx flex-wrap mt-3">    
            {fields.map((field, index) => (
              <div className="relative dark:bg-gray-700 bg-gray-100 px-2 py-1.5 rounded-md mr-2 mb-2" key={field.id}>
                <p className="dark:text-gray-200 text-gray-700 font-medium">{field.category}</p>
                <AiFillCloseCircle className="absolute -top-0.5 -right-0.5 dark:text-red-400 text-red-500" onClick={() => remove(index)}/>
              </div>  
            ))}
          </div>
        )}
        <small className="error-input">{errors.blogCategoryTerm?.message}</small>
      </div>

      <div className="flex flex-col mb-6">
        <label htmlFor="blogImage" className="form-label">Blog image</label>
        <input 
          id="blogImage"
          type="file" 
          className="input-control dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-300 text-base"
          {...register("blogImage", {
            onChange: (e) => {
              handleChangePrevImage(e.target.files[0])
            },
            required: {
              value: typeof(getValues("blogImage")) === "string" ? false : true,
              message: "Blog image field is required!"
            },
            validate: { 
              onlyImage: (files) => {
                return typeof(files) !== "string" ? files !== null && imageFormat.some(type => files[0]?.type.split("/")[1].includes(type)) || "This file just required an image and only png/jpeg format!" : typeof(files) === "string" || "Image URL must be string/character"
              },
              lessThan2MB: (files) =>  typeof(files) !== "string" ? files !== null && files[0]?.size < 2000000 || "Minimum file image size is less than 2 mb" : typeof(files) === "string" || "Image URL must be string/character"
            }
          })}
        />
        <small className="error-input">{errors.blogImage?.message}</small>
        {prevImage && (
          <div className="relative mt-5 h-[150px] w-[200px]">
            <Image src={prevImage} fill sizes="auto" className="w-full h-full object-cover" alt="preview-image" />
            <AiFillCloseSquare className="cursor-pointer absolute -top-1 -right-5 text-red-400 text-2xl" onClick={handleDeletePrevImage}/>
          </div>
        )}
      </div>
      
      <div className="flex flex-col mb-6">
        <label className="form-label">Blog description</label>
        {fieldsDesc.map((field, index) => (
          <div className="flex flex-col mb-3" key={field.id}>
            <div className="flex flex-col mb-1">
              <input 
                type="text" 
                placeholder="Description title" 
                className="input-control dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-300 text-base"
                {...register(`blogDescriptions.${index}.descriptionTitle`, {
                  required: "Blog description title is required!"
                })}/>
              <small className="error-input">{errors.blogDescriptions?.[index]?.descriptionTitle?.message}</small>
            </div>

            <div className="flex flex-col">
              <textarea   
                rows={6} 
                placeholder="Description content" 
                className="input-control dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-300 text-base"
                {...register(`blogDescriptions.${index}.descriptionContent`, {
                  required: "Blog description content is required!"
                })}></textarea>
                <small className="error-input">{errors.blogDescriptions?.[index]?.descriptionContent?.message}</small>
            </div>
            {index > 0 && (
              <button type="button" className="button button-dark button-light py-2 w-max mt-1" onClick={() => removeDesc(index)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" className="button button-dark button-light py-2 w-max mt-2" onClick={() => appendDesc({
          descriptionTitle: "",
          descriptionContent: ""
        })}>Add another description</button>
      </div>
      
      <button type="submit" disabled={isLoading} className={`button ${isLoading ? "button-disabled" : "button-primary"} w-full font-semibold text-lg`}>
       {isLoading && (
         <div className="button-loading"/>
       )}
        Submit new blog
      </button>
    </form>
  )
}
export default BlogForm