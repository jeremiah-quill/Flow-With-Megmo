import React, { useState } from "react";
import Navbar from "./Navbar";
import Classes from "./Classes.js";
import Music from "./Music.js";
import Bookings from "./Bookings.js";
import View from "./View.js";
import "../styles/MobileLayout.css";

function MobileLayout() {
	const [mobileView, setMobileView] = useState("classes");

	return (
		<div className="mobile-layout">
			{mobileView === "classes" ? (
				<Classes />
			) : mobileView === "music" ? (
				<Music />
			) : (
				<Bookings />
			)}
			<Navbar setMobileView={setMobileView} />
		</div>
	);
}

export default MobileLayout;
