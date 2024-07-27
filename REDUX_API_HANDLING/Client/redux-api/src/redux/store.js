import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slice/todoSlice";

const store = configureStore({
    reducer: {
        todo: todoSlice
    },
    devTools: true
})

export default store;