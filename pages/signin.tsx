import React from 'react'
import dynamic from 'next/dynamic'
const SignInForm = dynamic(import('../components/auth/SignIn'), {ssr : false})

const SignIn = () => {
  return (
    <div>
        <SignInForm/>
    </div>
  )
}

export default SignIn