import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("fetch", async () => {
  const response = await axios.get("http://localhost:5000/api/get-user");
  return response.data;
});

export const addData = createAsyncThunk("todo/addUser", async (user) => {
  const response = await axios.post("http://localhost:5000/api/add-user", user);
  return response.data;
});

export const updateData = createAsyncThunk(
  "todo/updateuser",
  async (id, user) => {
    const response = await axios.put(
      `http://localhost:5000/api/update-user/${(id, user)}`
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("todo/deleteUser", async (id) => {
  await axios.delete(`http://localhost:5000/api/delete-user/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      console.log("Error: ", action.payload);
      state.isError = true;
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(updateData.fulfilled, (state, action) => {
        const index = state.data.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      builder.addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
