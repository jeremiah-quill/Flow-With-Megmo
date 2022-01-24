import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar.js";
import Classes from "./components/Classes.js";
import Music from "./components/Music.js";
import Bookings from "./components/Bookings.js";
import Class from "./components/Class";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import SpotifyPlayer from "./components/SpotifyPlayer";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dashboard from "./components/Dashboard";

function App() {
	const location = useLocation();


	const getPathDepth = (location) => {
		let pathArr = location.pathname.split("/");
		return pathArr.filter((el) => el !== "").length;
	};

	const [currentPath, setCurrentPath] = useState(location.pathname);



	const [currentDepth, setCurrentDepth] = useState(getPathDepth(location));

	const [direction, setDirection] = useState("");

	const prevDepthRef = useRef();

	let directionRef = useRef(null)


	useEffect(() => {
		prevDepthRef.current = currentDepth;
		setCurrentPath(location.pathname)
		if (getPathDepth(location) > prevDepthRef.current) {
			setDirection("right");
			console.log('right')
		} else {
			setDirection("left");
			console.log('left')
		}
		console.log(currentPath)
	});


const dothething = (location) => {
	setCurrentDepth(getPathDepth(location));
	setCurrentPath(location.pathname)
}

	return (
		<div>
			<TransitionGroup component={null}>
				<CSSTransition key={location.key} classNames="fade" timeout={500}>
					<div
						className={direction}
						onClick={() => dothething(location) }
						
						ref={directionRef}
					>
						<Routes location={location}>
							<Route exact path="/" element={<Navbar />} />
							<Route exact path="/classes" element={<Classes />} />
							<Route exact path="/music" element={<Music />} />
							<Route exact path="/bookings" element={<Bookings />} />
							<Route exact path="/classes/:id" element={<Class />} />
							<Route exact path="/playlists/:id" element={<SpotifyPlayer />} />
							<Route exact path="/dashboard" element={<Dashboard />} />

							{/* add below 404 page */}
							{/* <Route path="*" element={<NoMatch />} /> */}
						</Routes>
					</div>
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
}

export default App;
