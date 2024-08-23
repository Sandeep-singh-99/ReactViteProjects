import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice, { setCredentials } from "./slice/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const token = localStorage.getItem("token");
const preloadedState = token
  ? { auth: { isLogged: true, data: { token } } }
  : {};

  const persistConfig = {
    key: "auth",
    storage
  }

  const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, authSlice)
  })

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: true,
});

if (token) {
  store.dispatch(setCredentials({ token }));
}

export const persistor = persistStore(store);
