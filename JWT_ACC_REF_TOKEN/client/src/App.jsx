import DashBoard from "./screen/DashBoard";
import Home from "./screen/Home";
import Login from "./screen/Login";
import Registration from "./screen/Registration";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
