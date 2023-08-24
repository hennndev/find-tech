import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { HiOutlineFingerPrint } from 'react-icons/hi'
import ImageBox from '@/app/components/auth/imageBox'
import LoginForm from '@/app/components/auth/loginForm'
import ArrowBack from '@/app/components/auth/arrowBack'
import PageContainer from '@/app/components/layout/pageContainer'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const metadata = {
  title: "Login page"
}

const LoginPage = async () => {

  const session = await getServerSession(authOptions)
  const isLoggedIn = session?.user

  return (
    <PageContainer classes="lg:flex lg:items-center xl:flex-none min-h-screen md:pt-20 lg:pt-0 w-full px-3 lg:px-0">
      {isLoggedIn ? (
        <section className="flex-center flex-col w-full h-full text-center -mt-20">
          <h2 className="dark:text-gray-200 text-gray-700 text-2xl font-bold mb-2">You has been logged in now</h2>
          <p className="dark:text-gray-200 text-gray-700 font-medium tracking-[0.5px] mb-7">You can back to home page by click this button.</p>
          <Link href="/" className="button text-base">Back to home</Link>
      </section>
      ) : (
        <>
        <ArrowBack/>
        <div className="flex-center mb-10 lg:mb-0 w-full">
          <div className="flex w-full sm:w-[80%] lg:w-[90%] xl:w-[75%] h-[650px] rounded-lg shadow-lg bg-white px-3 sm:px-0">
            <ImageBox/>
            <div className="flex-1 lg:flex-[0.5] overflow-y-auto items-center py-10">
              <div className="flex-center">
                <HiOutlineFingerPrint className="text-gray-700 text-5xl"/>
              </div>
              <div className="flex-center w-full">
                <LoginForm/>
              </div>
              <div className="mt-4 text-center text-gray-600 text-[16px]">
                Dont have an account?
                <Link href="/signup" className="text-blue-600 font-semibold ml-2 hover:underline">Signup</Link>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </PageContainer>
  )
}

export default LoginPage