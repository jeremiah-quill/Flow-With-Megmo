import React, { useState } from "react";

import { Switch, Route, Link } from "react-router-dom";

function Navbar() {
	const [navView, setNavView] = useState(true);
	const [classesView, setClassesView] = useState(false);
	const [musicView, setMusicView] = useState(false);
	const [bookingsView, setBookingsView] = useState(false);

	const viewClasses = () => {
		setClassesView(true);
		setNavView(false);
	};
	const viewMusic = () => {
		setMusicView(true);
		setNavView(false);
	};
	const viewBookings = () => {
		setBookingsView(true);
		setNavView(false);
	};
	const viewNav = () => {
		console.log("test");
		setNavView(true);
		setClassesView(false);
		setMusicView(false);
		setBookingsView(false);
	};

	return (
		// <>
		// 	{!navView && (
		// 		<button className="back-button" onClick={viewNav}>
		// 			Back
		// 		</button>
		// 	)}
		// 	{navView ? (
				<div className="navbar">
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
		// 	) : (
		// 		""
		// 	)}

		// 	{classesView ? <Classes /> : ""}

		// 	{musicView ? <Music /> : ""}

		// 	{bookingsView ? <Bookings /> : ""}
		// </>
	);
}

export default Navbar;
