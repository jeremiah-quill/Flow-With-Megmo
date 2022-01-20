import React, { useState } from "react";
import Classes from "./Classes.js";
import Music from "./Music.js";
import Bookings from "./Bookings.js";

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
		<>
			{!navView && (
				<button className="back-button" onClick={viewNav}>
					Back
				</button>
			)}
			{navView ? (
				<div className="navbar">
					<ul className="navbar-list">
						<li onClick={viewClasses} className="classes-link menu-link">
							Available Classes
						</li>
						<li onClick={viewMusic} className="music-link menu-link">
							My Music
						</li>
						<li onClick={viewBookings} className="bookings-link menu-link">
							Book a Private Event
						</li>
					</ul>
				</div>
			) : (
				""
			)}

			{classesView ? <Classes /> : ""}

			{musicView ? <Music /> : ""}

			{bookingsView ? <Bookings /> : ""}
		</>
	);
}

export default Navbar;
