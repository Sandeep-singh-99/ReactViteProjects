import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Registration from "./Page/Registration";
import AddBlog from "./Page/AddBlog";
import View from "./Page/View";
import Profile from "./Page/Profile";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/addBlog" element={<AddBlog />} />
      <Route path="/view" element={<View />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
