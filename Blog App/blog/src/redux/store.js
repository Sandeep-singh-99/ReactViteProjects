import { configureStore } from "@reduxjs/toolkit";
import authSlice, { setCredentials } from "./slice/authSlice";

const token = localStorage.getItem("token");
const preloadedState = token
  ? { auth: { isLogged: true, data: { token } } }
  : {};

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  preloadedState,
  devTools: true,
});

if (token) {
  store.dispatch(setCredentials({ token }));
}

export default store;
