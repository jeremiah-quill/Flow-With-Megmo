import React from "react";
import Auth from "../utils/auth";
import {Link} from 'react-router-dom'

import "../styles/Navbar.css";

function Navbar() {
	return (
		<div className="navbar">
			<Link className="nav-item" to="/">Home</Link>
			<Link className="nav-item" to="/classes">Schedule</Link>
			<Link className="nav-item" to="/bookings">Contact Me</Link>

			{/* <button className="menu-button" onClick={() => setMobileView("classes")}>
				Available Classes
			</button>

			<button className="menu-button" onClick={() => setMobileView("music")}>My Music</button>

			<button className="menu-button" onClick={() => setMobileView("event")}>
				Book a Private Event
			</button> */}
				
		</div>
	);
}

export default Navbar;
