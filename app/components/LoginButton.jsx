"use client"

import {signIn } from "next-auth/react"

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("github")}
     className='bg-[#fff] disabled:bg-gray-500 inline-flex items-center justify-center rounded-full py-4 px-10 text-center text-base font-normal text-black hover:bg-opacity-90 lg:px-8 xl:px-10 mt-10'
    >
      Sign in with Github
    </button>
  )
}

export default LoginButton
