import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screen/Home";
import Register from "./screen/Register";
import Login from "./screen/Login";
import DashBoard from "./screen/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
