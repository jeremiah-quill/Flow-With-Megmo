import React from "react";
import Classes from "./Classes.js";
import Music from "./Music.js";
import Bookings from "./Bookings.js";
import View from "./View.js";
import "../styles/DesktopLayout.css";

function DesktopLayout() {
	return (
		<div className="desktop-layout">
			<View title={"Available Classes"} content={<Classes />} />
			<View title={"Previous Classes"} content={<Music />} />
			<View title={"Contact"} content={<Bookings />} />
		</div>
	);
}

export default DesktopLayout;
