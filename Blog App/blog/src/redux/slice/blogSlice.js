import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../service/api";

export const addBlog = createAsyncThunk("blog/add", async (user, thunkAPI) => {
    try {
        const response = await API.post("/add-blog", user)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAllBlog = createAsyncThunk("blog/getallblog", async (user, thunkAPI) => {
    try {
        const response = await API.get("/get-all-blog")
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getBlog = createAsyncThunk("blog/get", async (id, thunkAPI) => {
    try {
        const response = await API.get(`/get-blog`)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        data: null,
        isLoading: false,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(addBlog.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
        })

        builder.addCase(addBlog.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(addBlog.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(getAllBlog.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
        })

        builder.addCase(getAllBlog.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(getAllBlog.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(getBlog.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
        })

        builder.addCase(getBlog.pending, (state, action) => {
            state.isLoading = true
        })  

        builder.addCase(getBlog.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })
    }

})

export default blogSlice.reducer