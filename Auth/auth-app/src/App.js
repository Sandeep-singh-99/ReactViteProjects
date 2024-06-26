import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";


function App() {
  return (
    <BrowserRouter>
    <div className="max-w-4xl mx-auto mt-5">
      <div>
        <nav className="bg-black rounded-md text-white p-5">
          <ul className="flex gap-x-5">
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
