import "./test.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.js";

import Class from "./components/pages/Class";
import { Routes, Route, useLocation } from "react-router-dom";
import SpotifyPlayer from "./components/pages/SpotifyPlayer";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dashboard from "./components/pages/Dashboard";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import MobileLayout from "./components/MobileLayout";
import DesktopLayout from "./components/DesktopLayout";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("id_token");
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	const [width, setWidth] = React.useState(window.innerWidth);
	const breakpoint = 765;

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);

		// Return a function from the effect that removes the event listener
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	// const location = useLocation();

	// const [direction, setDirection] = useState(null); //

	// const getPathDepth = (location) => {
	// 	let pathArr = location.pathname.split("/");
	// 	return pathArr.filter((el) => el !== "").length;
	// };

	// const [prevPath, setPrevPath] = useState(null); //

	// // every time location changes, set prev path and compare it with the new path to determine if we are going left to right or right to left
	// useEffect(() => {
	// 	setPrevPath(getPathDepth(location));

	// 	if (getPathDepth(location) - prevPath >= 0) {
	// 		setDirection("right");
	// 	} else {
	// 		setDirection("left");
	// 	}
	// }, [location]);

	return (
		<ApolloProvider client={client}>
			<div className="main-container">
				{/* <TransitionGroup component={null}>
					<CSSTransition key={location.key} classNames={"slide"} timeout={500}> */}
				<Routes>
					<Route
						path="/"
						element={width < breakpoint ? <MobileLayout /> : <DesktopLayout />}
					/>
					{/* <Route path="/classes" element={<Classes />} /> */}
					<Route path="/classes/:id" element={<Class />} />
					{/* <Route path="/music" element={<Music />} /> */}
					<Route path="/music/:id" element={<SpotifyPlayer />} />
					{/* <Route path="/bookings" element={<Bookings />} /> */}
					<Route path="/dashboard" element={<Dashboard />} />
					{/* add below 404 page */}
					{/* <Route path="*" element={<NoMatch />} /> */}
				</Routes>
				{/* </CSSTransition>
				</TransitionGroup> */}
				{/* {width < breakpoint ? <Navbar /> : ""} */}
			</div>
		</ApolloProvider>
	);
}

export default App;
