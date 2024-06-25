import React from "react"

import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import CreatePost from "./Page/CreatePost"
import Home from "./Page/Home"

function App() {

  return (
    <>
     <BrowserRouter>
     <div className="max-w-4xl mx-auto mt-5">
      <div className="">
          <nav className="bg-black rounded-md text-white p-5">
            <ul className="flex gap-x-5">
              <li className="">
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/create"}>Create Post</Link>
              </li>
            </ul>
          </nav>
          <div>
            <Routes>
              <Route path="/create" element={<CreatePost />}/>
              <Route path="/" element={<Home />}/>
            </Routes>
          </div>
      </div>
     </div>
     </BrowserRouter>
    </>
  )
}

export default App
