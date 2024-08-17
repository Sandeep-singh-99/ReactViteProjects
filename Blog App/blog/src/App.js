import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Registration from "./Page/Registration";
import AddBlog from "./Page/AddBlog";
import Profile from "./Page/Profile";
import View from "./Page/View";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="view" element={<View />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
