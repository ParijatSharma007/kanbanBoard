import style from '../../styles/auth.module.css'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { verifyUser } from '@/apiCalls/fireBase'
import Spinner from '../loader/Spinner'

interface DefaultValues{
    email : string,
    password : string
}

const SignInForm = () => {

  const[loader, setLoader] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const router = useRouter()
      const auth = window.localStorage.getItem("UID")

      console.log(auth,"auth")
      if(auth){
        router.push("/")
      }

    const defaultValues = {
        email : "",
        password : ""
    }

    const {register, handleSubmit} = useForm<DefaultValues>({defaultValues})

    const submitHandler = async(data : DefaultValues) => {
      const {error} = await verifyUser(data)
      if(!error){
        router.push('/')
      }else{
        setIsError(false)
      }
    }

  return (  
    <div className={style.body}>
      <div className={style.background} />
        {loader? <Spinner size={230}/> : <div className={style.login_container}>
          <div className={style.login_header}>
             <p>Login to your account</p>
          </div>
        <div className={style.login_form}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={style.input_group}>
          <input {...register("email")} type="email" placeholder="EMAIL" className={style.input}/>
        </div>
        <div className={style.input_group}>
          <input {...register("password")} type="password" placeholder="PASSWORD" className={style.input}/>
        </div>
        <button className={style.button} type="submit">Login</button>
      </form>
    </div>
    <div className={style.signup_link}>
      {"Don't have an account? "}
      <Link href="/signup">Sign Up</Link>
    </div>
  </div>}
</div>


  );
}

export default SignInForm