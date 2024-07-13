import React from 'react'
import Products from '../Components/Products'
import Navbar from '../Components/Navbar'

function Home() {
  return (
    <div>
      <h2 className='heading'>Welcome to the Redux toolkit store</h2>
      <section>
        <h3>Product</h3>
        <Navbar/>
        <Products/>
      </section>
    </div>
  )
}

export default Home