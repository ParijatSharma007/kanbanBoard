import { db, firebaseInitializer } from '@/firebase.config'
import style from '../../styles/auth.module.css'
import { updateUserData } from '@/redux/userData'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

interface DefaultValues{
    email : string,
    password : string
}

const SignInForm = () => {

  const router = useRouter()
  const dispatch = useDispatch()
      const auth = window.localStorage.getItem('UID')
      if(auth){
        router.push("/")
      }

    const defaultValues = {
        email : "",
        password : ""
    }

    const {register, handleSubmit} = useForm<DefaultValues>({defaultValues})

    const submitHandler = async(data : DefaultValues) => {
        try{
            const auth = getAuth(firebaseInitializer)
            const {user} = await signInWithEmailAndPassword(auth, data.email, data.password)
            const userDocRef = doc(db, "users", user.uid)
            const userDocSnap = await getDoc(userDocRef)

            if(userDocSnap.exists()){
              dispatch(updateUserData({...userDocSnap.data(), uid: user.uid}))
            }else{
              router.push('/signup', "", {shallow : true})
            }

              window.localStorage.setItem("UID", user.uid)

            router.push('/', "", {shallow : true})
        }catch(err){
            console.log(err);
        }
    }

  return (
    
    <body className={style.body}>
  <div className={style.background} />
  <div className={style.login_container}>
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
      Don't have an account? <Link href="/signup">Sign Up</Link>
    </div>
  </div>
</body>


  );
}

export default SignInForm