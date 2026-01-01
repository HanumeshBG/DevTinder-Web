import React from 'react'
import NavBar from './NavBar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'

const Body = () => {
  return (
    <>        
        <NavBar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Body