import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

const getUser = () => {
    const users = localStorage.getItem("user")
    return users ? JSON.parse(users) : null
}

const removeUser = () => {
    localStorage.removeItem("user")
}

export const Registration1 = createAsyncThunk("auth/registration", async (user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/register", user)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", user)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        isError: false,
        data: getUser()
    },

    reducers: {
        logout: (state, action) => {
            state.isLoading = false
            state.data = null
            removeUser()
        },
        setCredentials: (state, action) => {
            state.isLoading = true
            state.user = action.payload
            saveUser(action.payload)
        }
    },

    extraReducers: (builder) => {
        builder.addCase(Registration1.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload 
            saveUser(action.payload.data)
        })

        builder.addCase(Registration1.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(Registration1.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload
            saveUser(action.payload.data)
        })

        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        })
    }


})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer