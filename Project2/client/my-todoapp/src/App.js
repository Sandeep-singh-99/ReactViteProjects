import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Page/Home';
import History from './Page/History';


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/hes' element={<History/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
