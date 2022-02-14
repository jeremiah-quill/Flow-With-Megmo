import React from 'react'
import Navbar from './Navbar'
import UserButtons from './UserButtons'
import "../styles/Header.css"

function Header() {
  return (
    <header className="header">
        <h1>Flow with Megmo</h1>
        <Navbar />
        <UserButtons />
    </header>
  )
}

export default Header