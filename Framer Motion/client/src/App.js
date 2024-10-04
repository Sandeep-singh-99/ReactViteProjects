import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnimatedBox from "./Screen/AnimatedBox";
import TodoList from "./Screen/ToDoList";
import BouncingBox from "./Screen/BouncingBox";
import ReorderableList from "./Screen/ReorderableList";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/animatedBox" element={ <AnimatedBox/> }/>
    <Route path="/todo" element={ <TodoList/> }/>
    <Route path="/bouncingBox" element={<BouncingBox/>}/>
    <Route path="/reorderlist" element={<ReorderableList/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
