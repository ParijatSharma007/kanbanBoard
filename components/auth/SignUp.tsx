// import { firebaseAuth } from "@/firebase/firebaseConfig";
import { firebaseInitializer } from "@/firebase.config";
import { db } from "@/firebase.config";
import { updateUserData } from "@/redux/userData";
import { IUsersData } from "@/typescript/interfaces/dnd-interfaces";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

interface DefaultValues{
    email : string,
    password : string,
    fullname : string
}

const SignUpForm = () => {
    const dispatch = useDispatch()
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
        console.log(data);
        
        try{
            const auth = getAuth(firebaseInitializer)
            const {uid} = (await createUserWithEmailAndPassword(auth, data.email, data.password)).user
            const usersRef = collection(db, "users")
            const newData : IUsersData = {
                name : data.fullname,
                email : data.email,
                todo : {
                    pending : [],
                    resolve : [],
                    reject : []
                }
            }
            
            await setDoc(doc(usersRef, uid), newData)

            dispatch(updateUserData({...newData, uid : uid}))

            window.localStorage.setItem("UID", uid)
            router.push('/', "", {shallow : true})
            
        }catch(err){
            console.log(err);
        }
    }
    
    return (
      <form onSubmit={handleSubmit(submitHandler)}>
        <input {...register("fullname")} placeholder="FULLNAME" type="text"/>
        <input {...register("email")} placeholder="EMAIL" type="email"/>
        <input {...register("password")} placeholder="PASSWORD" type="password"/>
        <button>SUBMIT</button>
      </form>
    );
}

export default SignUpForm

