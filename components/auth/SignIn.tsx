import { db, firebaseInitializer } from '@/firebase.config'
import { updateUserData } from '@/redux/userData'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

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
    <form onSubmit={handleSubmit(submitHandler)}>
      <input {...register("email")} type="email" placeholder="EMAIL" />
      <input {...register("password")} type="password" placeholder="PASSWORD" />
      <button>SUBMIT</button>
    </form>
  );
}

export default SignInForm