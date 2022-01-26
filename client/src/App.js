import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar.js";
import Classes from "./components/Classes.js";
import Music from "./components/Music.js";
import Bookings from "./components/Bookings.js";
import Class from "./components/Class";
import { Routes, Route, useLocation } from "react-router-dom";
import SpotifyPlayer from "./components/SpotifyPlayer";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dashboard from "./components/Dashboard";
// test

function App() {
	const location = useLocation();

	const [direction, setDirection] = useState(null);

	const getPathDepth = (location) => {
		let pathArr = location.pathname.split("/");
		return pathArr.filter((el) => el !== "").length;
	};
	const [locationState, setLocationState] = useState(getPathDepth(location));

	useEffect(() => {
		location.state = locationState;

		setLocationState(getPathDepth(location));
		// console.log(`old location: ${location.state} newlocation: ${getPathDepth(location)}`)
		if (getPathDepth(location) - location.state >= 0) {
			// console.log('right!')
			setDirection("right");
		} else {
			// console.log('left!')
			setDirection("left");
		}
	}, [location]);

	return (
		<>
			<div className={direction}>
				<TransitionGroup component={null}>
					<CSSTransition key={location.key} classNames={"slide"} timeout={500}>
						<Routes location={location}>
							<Route path="/" element={<Navbar />} />
							<Route path="/classes" element={<Classes />} />
							<Route path="/music" element={<Music />} />
							<Route path="/bookings" element={<Bookings />} />
							<Route path="/classes/:id" element={<Class />} />
							<Route path="/playlists/:id" element={<SpotifyPlayer />} />
							<Route path="/dashboard" element={<Dashboard />} />
							{/* add below 404 page */}
							{/* <Route path="*" element={<NoMatch />} /> */}
						</Routes>
					</CSSTransition>
				</TransitionGroup>
			</div>
		</>
	);
}

export default App;
