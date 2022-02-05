import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/pages/Navbar.js";
import Classes from "./components/pages/Classes.js";
import Music from "./components/pages/Music.js";
import Bookings from "./components/pages/Bookings.js";
import Class from "./components/pages/Class";
import { Routes, Route, useLocation } from "react-router-dom";
import SpotifyPlayer from "./components/pages/SpotifyPlayer";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dashboard from "./components/pages/Dashboard";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
  });
  

function App() {
	const location = useLocation();

	const [direction, setDirection] = useState(null); //

	const getPathDepth = (location) => {
		let pathArr = location.pathname.split("/");
		return pathArr.filter((el) => el !== "").length;
	};
	
	const [prevPath, setPrevPath] = useState(null); //

	// every time location changes, set prev path and compare it with the new path to determine if we are going left to right or right to left
	useEffect(() => {
		setPrevPath(getPathDepth(location));
		
		if (getPathDepth(location) - prevPath >= 0) {
			setDirection("right");
		} else {
			setDirection("left");
		}
	}, [location]);

	return (
		    <ApolloProvider client={client}>

			<div className={direction}>
				<TransitionGroup component={null}>
					<CSSTransition key={location.key} classNames={"slide"} timeout={500}>
						<Routes location={location}>
							<Route path="/" element={<Navbar />} />
							<Route path="/classes" element={<Classes />} />
							<Route path="/classes/:id" element={<Class />} />
							<Route path="/music" element={<Music />} />
							<Route path="/music/:id" element={<SpotifyPlayer />} />
							<Route path="/bookings" element={<Bookings />} />
							<Route path="/dashboard" element={<Dashboard />} />
							{/* add below 404 page */}
							{/* <Route path="*" element={<NoMatch />} /> */}
						</Routes>
					</CSSTransition>
				</TransitionGroup>
			</div>
			</ApolloProvider>

	);
}

export default App;
