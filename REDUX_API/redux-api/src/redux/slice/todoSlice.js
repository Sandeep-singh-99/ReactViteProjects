import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchToDo = createAsyncThunk('fetchToDo', async() => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/photos")
    return response.data
})

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToDo.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })

        builder.addCase(fetchToDo.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(fetchToDo.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true
        })
    }
})

export default todoSlice.reducer