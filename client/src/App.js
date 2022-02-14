import "./test.css";
import React, { useEffect, useState } from "react";
import { setContext } from "@apollo/client/link/context";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Class from "./components/Class";
import SpotifyPlayer from "./components/pages/SpotifyPlayer";
import Dashboard from "./components/pages/Dashboard";
import Navbar from "./components/Navbar";
import Bookings from "./components/Bookings";
import Classes from "./components/Classes";
import Auth from "./utils/auth";
import LoggedInHome from "./components/pages/LoggedInHome";
import DefaultHome from "./components/pages/DefaultHome";
import Modal from "./components/Modal";
import { useUserContext } from "./utils/contexts/UserContext";
import { useModalContext } from "./utils/contexts/ModalContext";
import UserButtons from "./components/UserButtons";
import Header from "./components/Header";

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
	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 765;

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	const { currentUser, setCurrentUser } = useUserContext();
	const { isModal, resetModal, modalContent, configureModal } =
		useModalContext();

	useEffect(() => {
		if (Auth.loggedIn()) {
			let userInfo = Auth.getStudent().data;
			setCurrentUser({
				loggedIn: true,
				username: userInfo.username,
				email: userInfo.email,
				_id: userInfo._id,
			});
		}
	}, []);

	// When url path changes, close any open modals
	const location = useLocation();
	useEffect(() => {
		resetModal();
	}, [location.pathname]);

	return (
		<ApolloProvider client={client}>
			{/* GLOBAL MODAL */}
			<CSSTransition
				in={isModal}
				timeout={600}
				classNames={"translate-y"}
				unmountOnExit={true}
			>
				<Modal resetModal={resetModal}>{modalContent}</Modal>
			</CSSTransition>

			{width < breakpoint ? <Navbar /> : <Header />}

			<div className="main-container">
				<Routes>
					<Route
						path="/"
						element={currentUser.loggedIn ? <LoggedInHome /> : <DefaultHome />}
					/>
					<Route path="/classes" element={<Classes />} />
					{/* <Route path="/classes/:id" element={<Class />} /> */}
					{/* <Route path="/music/:id" element={<SpotifyPlayer />} /> */}
					<Route path="/bookings" element={<Bookings />} />
					<Route path="/dashboard" element={<Dashboard />} />
					{/* add below 404 page */}
					{/* <Route path="*" element={<NoMatch />} /> */}
				</Routes>
			</div>
		</ApolloProvider>
	);
}

export default App;
