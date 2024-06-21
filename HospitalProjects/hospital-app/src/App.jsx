import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'
import Appointments from './Page/Appointments'
import Doctors from './Page/Doctors'
import Patients from './Page/Patients'

function App() {
  const isLinkActive = (path) => window.location.pathname === path
  return (
    <>
    <BrowserRouter>
    <div className='w-screen bg-[#f3eee5] h-screen'>
      <div className='p-5'>
        <div className='mb-8'>
          <h1 className='text-green-600 text-4xl font-bold'>Hospital Managment App</h1>
        </div>
        <nav className='bg-[#51adac] p-1 rounded-md px-4 text-white'>
          <ul className='flex space-x-10 items-center'>

            <li className={isLinkActive('/appointments') ? 'active' : ''}>
            <NavLink to="/appointments">
            Appointments
            </NavLink>
            </li>

            <li className={isLinkActive('/doctors') ? 'active' : ''}>
            <NavLink to="/doctors">Doctors</NavLink>
            </li>

            <li className={isLinkActive('/patients') ? 'active' : ''}>
            <NavLink to="/patients">Patients</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/appointments' element={<Appointments />}></Route>
          <Route path='/' element={<Appointments/>}></Route>
          <Route path='/doctors' element={<Doctors/>}></Route>
          <Route path='/patients' element={<Patients/>}></Route>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
