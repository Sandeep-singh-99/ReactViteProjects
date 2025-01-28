import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='bg-slate-950 text-white flex justify-between items-center px-4 py-2'>
        <Link to={"/"} className='text-2xl font-bold'>Zod Form</Link>
        <div>
            <Link to={"/form-page"} className='bg-blue-600 px-2 py-1 rounded-md shadow-2xl'>Form Page</Link>
        </div>
    </div>
  )
}

export default Header