import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RefPage from './pages/refPage'
import OptimisticPage from './pages/OptimisticPage'


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/use-ref' element={ <RefPage /> }/>

      <Route path='/optimistic' element={ <OptimisticPage />} />
    </Routes>
    </BrowserRouter>
  )
}
