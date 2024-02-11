import { configureStore } from "@reduxjs/toolkit";
import UserDataSlice from "./userData";

const store = configureStore({
    reducer : {
        userData : UserDataSlice.reducer
    }
})

export default store