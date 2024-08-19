import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
    <Header/>
    <div className='pt-20'>
      <Outlet/>
    </div>
    </>
  )
}

export default Home