import React from 'react'
import { signIn } from "next-auth/react"

const SignInButton = () => {
  return (
    <div className='flex justify-center h-[50vh] items-center'>
        <button
            onClick={() => signIn()}
            type="button"
            className=' py-2 px-4 text-white text-base bg-amazon_blue-light rounded-2xl'
        >
            sign up
        </button>
    </div>
  )
}

export default SignInButton