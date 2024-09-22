import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='bg-slate-950 text-white rounded-md px-5 py-5 w-[750px]'>
        <div className='flex justify-between'>
            <Link href={'/'}>Home</Link>
            <div className='flex gap-5'>
                <Link href={'/auth/login'}>Login</Link>
                <Link href={'/auth/registration'}>Registration</Link>
            </div>
        </div>
    </div>
  )
}

export default Header