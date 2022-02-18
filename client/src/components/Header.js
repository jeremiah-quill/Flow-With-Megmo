import React from 'react'
import Navbar from './Navbar'
import UserButtons from './UserButtons'
import "../styles/Header.css"
import { useUserContext } from '../utils/contexts/UserContext'
import {Link} from 'react-router-dom';

function Header() {
  const {currentUser} = useUserContext()


  return (
    <header className="header">
        <h1 className="site-logo"><Link to={currentUser.isAdmin ? "/dashboard" : "/"}>Flow with Megmo</Link></h1>
        <Navbar />
        <UserButtons />
    </header>
  )
}

export default Header