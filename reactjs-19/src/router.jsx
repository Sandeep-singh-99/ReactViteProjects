import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ActionForm from "./pages/ActionForm";
import Optimistic from "./pages/Optimisitc";
import UseHook from "./pages/UseHook";
import React from "react";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/action", element: <ActionForm /> },
  { path: "/optimistic", element: <Optimistic /> },
  { path: "/use", element: <UseHook /> },
]);
