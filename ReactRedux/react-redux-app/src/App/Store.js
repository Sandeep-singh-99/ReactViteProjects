import {configureStore} from '@reduxjs/toolkit'
import todoReducer from "../Features/ToDo/ToDoSlice"


export const store = configureStore({
    reducer: todoReducer
})

