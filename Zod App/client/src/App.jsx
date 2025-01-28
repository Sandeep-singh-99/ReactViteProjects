import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import FromPage from './pages/FromPage'

function App() {
 

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/form-page' element={<FromPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
