"use client"
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import AlertMessage from '../ui/alertMessage'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { apiRoute } from '@/app/config/config'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

type FormValues = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignupForm = () => {  
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false)
  const { register, handleSubmit, reset, watch, formState: {errors} } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    const { passwordConfirmation, ...data } = values
    setIsError(null)
    setIsLoading(true)
    try {
      const req = await fetch(`${apiRoute}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })      
      const res = await req.json()
      if(res.error) {
        throw Error(res.error)
      } else {
        setIsError(null)
        setIsSuccess(true)
        setIsLoading(false)
        reset()
      }
    } catch (error: any) {
      setIsLoading(false)
      setIsError(error.message)
    } 
  }
  const loginGoogle = () => signIn("google")
  const handleShowPassword = (value: boolean) => setShowPassword(value)
  const handleShowPasswordConfirmation = (value: boolean) => setShowPasswordConfirmation(value)

  return (
    <form className="mt-5 w-[300px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-7">
        <h1 className="text-4xl text-gray-700 font-bold">Signup</h1>
        <p className="font-medium tracking-[0.5px] mt-2 text-gray-700">Enter your personal details</p>
        {isError && (
          <AlertMessage classes="mt-2" handleClose={() => setIsError(null)}>
            <p className="text-start font-medium text-gray-700">{isError}</p>
          </AlertMessage>
        )}
        {isSuccess && (
          <AlertMessage classes="mt-2" isSuccess handleClose={() => setIsSuccess(false)}>
            <p className="text-start font-medium text-gray-700">Success, create your account. You can login now.</p>
            <p className="text-start cursor-pointer text-blue-700 font-semibold underline" onClick={() => router.push("/login")}>Login</p>
          </AlertMessage>
        )}
      </div>
      {/* username */}
      <div className="flex flex-col mb-5">
        <label htmlFor="username" className="mb-2 text-gray-700 font-semibold text-lg">Username</label>
        <input type="text" id="username" 
          placeholder="Type your username here" 
          {...register("username", {
            required: "Username field is required"
          })}
          autoComplete="off"
          className="input-control"/>
        {errors.username?.message && (
          <small className="error-input dark:text-red-700">{errors.username?.message}</small>
        )}
      </div>
      {/* email */}
      <div className="flex flex-col mb-5">
        <label htmlFor="email" className="mb-2 text-gray-700 font-semibold text-lg">Email</label>
        <input type="email" id="email" 
          placeholder="Type your email here" 
          {...register("email", {
            required: "Email field is required!",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email not valid!"
            }
          })}
          autoComplete="off"
          className="input-control"/>
        {errors.email?.message && (
          <small className="error-input dark:text-red-700">{errors.email?.message}</small>
        )}
      </div>
      {/* password */}
      <div className="flex flex-col mb-5">
        <label htmlFor="password" className="mb-2 text-gray-700 font-semibold text-lg">Password</label>
        <div className="border border-[#ccc] text-gray-700 bg-white font-medium rounded-md px-3 py-2 flexx">
          <input 
            type={showPassword ? "text" : "password"} 
            id="password" 
            placeholder="Type your password here" 
            {...register("password", {
              required: "Password field is required!",
              minLength: {
                value: 7,
                message: "Minimum length password is 7 character!"
              }
            })}
            className="flex-1 mr-2 bg-transparent outline-none placeholder:text-gray-500 text-sm"/>
            {!showPassword ? <AiOutlineEyeInvisible className="text-xl cursor-pointer text-gray-700" onClick={() => handleShowPassword(true)}/> : <AiOutlineEye className="text-xl cursor-pointer text-gray-700" onClick={() => handleShowPassword(false)}/>}
        </div>
      </div>
      {/* password confirmation */}
      <div className="flex flex-col">
        <label htmlFor="passwordConfirmation" className="mb-2 text-gray-700 font-semibold text-lg">Password Confirmation</label>
        <div className="border border-[#ccc] text-gray-700 bg-white font-medium rounded-md px-3 py-2 flexx">
          <input type={showPasswordConfirmation ? "text" : "password"} id="passwordConfirmation" 
            placeholder="Type your password here" 
            {...register("passwordConfirmation", {
              required: "Password confirmation field is required!",
              minLength: {
                value: 7,
                message: "Minimum length password is 7 character"
              },
              validate: (value) => {
                return watch("password") === value || "Password confirmation must be match with password"
              }
            })}
            className="flex-1 mr-2 bg-transparent outline-none placeholder:text-gray-500 text-sm"/>
            {!showPasswordConfirmation ? <AiOutlineEyeInvisible className="text-xl cursor-pointer text-gray-700" onClick={() => handleShowPasswordConfirmation(true)}/> : <AiOutlineEye className="text-xl cursor-pointer text-gray-700" onClick={() => handleShowPasswordConfirmation(false)}/>}
        </div>
       
        {errors.passwordConfirmation?.message && (
          <small className="error-input dark:text-red-700">{errors.passwordConfirmation?.message}</small>
        )}
      </div>
      <button type="submit" disabled={isLoading} className={`buttonn w-full mt-5 text-base flex-center ${isLoading ? "bg-gray-500 text-gray-200 cursor-not-allowed hover:bg-gray-500 hover:text-gray-200" : "button-light"}`}>
        {isLoading && <div className="button-loading"></div>}
        {isLoading ? "Waiting..." : "Submit"}
      </button>
      <button type="button" className="button-platform flex-center mt-4 w-full" onClick={loginGoogle}>
        Sign with Google <FcGoogle className="ml-3 text-[25px]"/>
      </button>
    </form>
  )
}

export default SignupForm