import React from 'react'
import Navbar from '../Common/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Common/Footer'

const CommonPage = () => {
  return (
    <div className="relative eshop-home-container">
      <Navbar />
      <main className="container mx-auto bg-white px-4 py-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default CommonPage