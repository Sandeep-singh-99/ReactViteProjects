import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/ProfilePage";
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>;
  }

  return (
    <div data-theme={theme}>
     
        <NavBar />
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={"/"}/>} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"}/>} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to={"/login"} />} />
        </Routes>
        <Toaster/>
    </div>
  );
}
