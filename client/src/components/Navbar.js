import React from "react";
import "../styles/Navbar.css";

function Navbar({ setMobileView }) {
	return (
		<div className="navbar">
			<button className="menu-button" onClick={() => setMobileView("classes")}>
				Available Classes
			</button>

			<button className="menu-button" onClick={() => setMobileView("music")}>My Music</button>

			<button className="menu-button" onClick={() => setMobileView("event")}>
				Book a Private Event
			</button>
		</div>
	);
}

export default Navbar;
