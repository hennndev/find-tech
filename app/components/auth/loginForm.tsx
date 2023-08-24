"use client"
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import AlertMessage from '../ui/alertMessage'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

type FormValues = {
  email: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<null | string>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { register, handleSubmit, reset, formState: {errors} } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setIsError(null)
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then(res => {
      if(res?.error) {
        throw Error(res.error)  
      } else {
        setIsLoading(false)
        router.push("/")
      }
    }).catch(error => {
      setIsLoading(false)
      setIsError(error.message)
    })
  }
  const loginGoogle = () => signIn("google", {callbackUrl: "/"})
  const handleShowPassword = (value: boolean) => setShowPassword(value)

  return (
    <form className="mt-5 w-[300px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-7">
        <h1 className="text-4xl text-gray-700 font-bold">Login</h1>
        <p className="font-medium tracking-[0.5px] mt-2 text-gray-700">Enter your personal details</p>
        {isError && (
          <AlertMessage classes="mt-2" handleClose={() => setIsError(null)}>
            <p className="text-start font-medium text-gray-700">{isError}</p>
          </AlertMessage>
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
          autoComplete='off'
          className="input-control"/>
        {errors.email?.message && (
          <small className="error-input dark:text-red-700">{errors.email?.message}</small>
        )}
      </div>


      {/* password */}
      <div className="flex flex-col">
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

        {errors.password?.message && (
          <small className="error-input dark:text-red-700">{errors.password?.message}</small>
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

export default LoginForm