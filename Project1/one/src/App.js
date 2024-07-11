import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Services from "./components/Services";

import "./styles/App.scss";
import "./styles/Header.scss";
import "./styles/MediaQuery.scss"


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
