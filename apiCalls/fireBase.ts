import { auth, db } from "@/firebase.config"
import { DndState } from "@/typescript/interfaces/dnd-interfaces"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

export const createUser = async(data : {email : string, password : string, fullname : string}) => {
    const {email, password, fullname} = data
    try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        const userRef = collection(db, "users")
        const todoRef = collection(db, "todoList")
        await setDoc(doc(userRef), {
            email,
            fullname
        })

        await setDoc(doc(todoRef, user.uid), {
            pending : [],
            resolve : [],
            reject : []
        })

        window.localStorage.setItem("UID", user.uid)
        
        return{
            success : true,
            error : false,
        }
    }catch(err : any){
        console.log(err);
        return {
            error : true,
            message : err.message
        }
    }
}


export const verifyUser = async(data : {email : string, password : string}) => {
    const {email, password} = data
    try{
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        window.localStorage.setItem("UID", user.uid)
        return{
            error : false,
        }
    }catch(err : any){
        return {
            error : true,
            message : err.message
        }
    }
}

export const getBoard = async(auth : string) => {
   const docRef = doc(db, "todoList", auth)
   try{
       const docSnap = await getDoc(docRef)
       if(docSnap.exists()){
        console.log("doc existed");
        return {
            data : docSnap.data(),
            error : false
        }
       }else{
        console.log("data don't exist");
        return {
            error : true,
            message : "doc doesn't exixts"
        }
       }
   }catch(err){
    console.log("there is some error");
        return {
            error : true
        }
   }
}

export const updateTask = async(auth : string, arr : string[], state : string) => {
    try {
        const docRef = doc(db, 'todoList', auth)
        await updateDoc(docRef, {[state] : [...arr]})
        return {
            error : false
        }
    }catch(err){
        return {
            error : true
        }
    }
}

export const setTask = async(auth : string, todo : DndState) => {
    try {
        const docRef = doc(db, 'todoList', auth)
        await setDoc(docRef, todo)
        return {
            error : false
        }
    }catch(err){
        return {
            error : true
        }
    }
}