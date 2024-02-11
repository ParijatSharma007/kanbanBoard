import { ContextInterface } from "@/typescript/interfaces/dnd-interfaces";
import { createSlice } from "@reduxjs/toolkit";

const UserData : ContextInterface = {
    name : "",
    email : "",
    uid : "",
    todo : {
        pending : [],
        resolve : [],
        reject : []
    }
}

const UserDataSlice = createSlice({
    name : "userdata-slice",
    initialState : UserData,
    reducers : {
        updateUserData(state, acion){
            console.log("action", acion.payload);
            state = acion.payload
            console.log("userUpdated : ", state);
        },
        updateTodo(state, acion){
            state = {
                ...state,
                todo : acion.payload
            }
        }
    }
})

export const {updateTodo, updateUserData} = UserDataSlice.actions
export default UserDataSlice