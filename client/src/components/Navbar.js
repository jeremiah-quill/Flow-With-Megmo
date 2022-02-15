import React from "react";
import Auth from "../utils/auth";
import {Link} from 'react-router-dom'

import "../styles/Navbar.css";
import { useModalContext } from "../utils/contexts/ModalContext";

function Navbar() {
	const {resetModal} = useModalContext()
	return (
		<div className="navbar">
			<Link onClick={resetModal} className="nav-item" to="/">Home</Link>
			<Link className="nav-item" to="/classes">Schedule</Link>
			<Link className="nav-item" to="/contact">Contact Me</Link>
		</div>
	);
}

export default Navbar;
