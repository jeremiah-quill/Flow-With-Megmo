import React from "react";

import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="navbar page">
			<ul className="navbar-list">
				<li className="classes-link menu-link">
					<Link to="/classes">Available Classes</Link>
				</li>
				<li className="music-link menu-link">
					<Link to="/music">My Music</Link>
				</li>
				<li className="bookings-link menu-link">
					<Link to="/bookings">Book a Private Event</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
