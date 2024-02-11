import { firebaseInstance } from "@/axiosInstance/firebaseInstance";
import { DndState } from "@/typescript/interfaces/dnd-interfaces";

export const getFirebaseData = async(uid : string) => {
    const res = await firebaseInstance.get(uid)
    return res?.data
}

export const postFirebaseData = async(uid: string, data : {todo : DndState, name : string, email : string}) => {
    const res = await firebaseInstance.post(`${uid}.json`, data)
    return res.status
}

export const putFirebaseData = async(uid : string, todo : DndState)=>{
    const res = await firebaseInstance.put(uid, todo)
    return res.status
}