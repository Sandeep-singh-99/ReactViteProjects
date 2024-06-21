import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Appointments from './Components/Appointments'

function App() {
  const isLinkActive = (path) => window.location.pathname === path
  return (
    <>
    <BrowserRouter>
    <div className='w-screen bg-[#f3eee5] h-screen'>
      <div className='mx-6'>
        <div className=''>
          <h1 className='text-green-600 text-2xl font-bold'>Hospital Managment App</h1>
        </div>
        <nav>

        </nav>
        <Routes>
          <Route path='/appointment' element={<Appointments />}></Route>
          <Route path='/' element={<Appointments/>}></Route>
          
        </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
