import dynamic from 'next/dynamic'
import React from 'react'
const SignUpForm = dynamic(import('../components/auth/SignUp'), {ssr : false})

const SignUp = () => {
  return (
    <div>
        <SignUpForm/>
    </div>
  )
}

export default SignUp