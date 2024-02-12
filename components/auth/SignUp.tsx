// import { firebaseAuth } from "@/firebase/firebaseConfig";
import style from '../../styles/auth.module.css'
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { createUser } from "@/apiCalls/fireBase";
import { useState } from 'react';
import Spinner from '../loader/Spinner';

interface DefaultValues{
    email : string,
    password : string,
    fullname : string
}

const SignUpForm = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const router = useRouter()
  const defaultValues = {
        email : "",
        password : "",
        fullname : ""
    }

    const auth = window.localStorage.getItem("UID")

    if(auth){
      router.push("/")
    }
    
    const {register, handleSubmit} = useForm<DefaultValues>({defaultValues})

    const submitHandler = async(data : DefaultValues) => {
      setLoader(true)
      const{error} = await createUser(data)
      setLoader(false)
      if(!error){
        router.push('/')
      }else{
        setIsError(true)
      }
    }
    
    return (
   
         <div className={style.body}>
         <div className={style.background} />
         {!loader ? <div className={style.login_container}>
           <div className={style.login_header}>
             <p>Crate New Account</p>
           </div>
           <div className={style.login_form}>
             <form onSubmit={handleSubmit(submitHandler)}>
               <div className={style.input_group}>
               <input {...register("fullname")} placeholder="FULLNAME" type="text" className={style.input} required/>
               </div>
               <div className={style.input_group}>
               <input {...register("email")} placeholder="EMAIL" type="email" className={style.input} required/>
               </div>
               <div className={style.input_group}>
               <input {...register("password")} placeholder="PASSWORD" type="password" className={style.input} required/>
               </div>
               <button className={style.button} type="submit">Login</button>
             </form>
           </div>
           <div className={style.signup_link}>
             Already have an account? <Link href="/signin">Sign In</Link>
           </div>
         </div> : <Spinner size={230}/>}
       </div>
    );
}

export default SignUpForm

