import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <h1>Home <Link to={"/register"}>Register</Link></h1>
  )
}

export default Home