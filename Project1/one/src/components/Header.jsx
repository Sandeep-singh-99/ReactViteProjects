import React from 'react'
import { Link } from 'react-router-dom'
import {HashLink} from 'react-router-hash-link'

function Header() {
  return (
    <nav>
        <h1>Stark</h1>
        <main>
            <HashLink >Home</HashLink>
            <Link>Contact</Link>
            <HashLink>About</HashLink>
            <HashLink>Brands</HashLink>
            <Link>Services</Link>

        </main>
    </nav>
  )
}

export default Header