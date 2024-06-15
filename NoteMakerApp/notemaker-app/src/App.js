import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NoteMakerList from "./Components/NoteMakerList";

function App() {
  return (
    <div>
    {/* <h1 className="flex justify-center items-center text-3xl ">Sandeep Singh</h1> */}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NoteMakerList/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
