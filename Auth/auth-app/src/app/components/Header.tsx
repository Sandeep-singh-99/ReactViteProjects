import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div>
        <div>
            <Link href='/'>Home</Link>
            <div>
                <Link href='/Login'>Profile</Link>
                <Link href='/Register'>Settings</Link>
            </div>
        </div>
    </div>
  )
}
