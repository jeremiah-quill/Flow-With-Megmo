import "./App.css";
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
// import SpotifyPlayer from "./components/pages/SpotifyPlayer";
import Dashboard from "./components/pages/Dashboard";
import Contact from "./components/pages/Contact";
import Classes from "./components/Classes";
import Auth from "./utils/auth";
import StudentProfile from "./components/pages/StudentProfile";
import DefaultHome from "./components/pages/DefaultHome";
import Modal from "./components/Modal";
import { useUserContext } from "./utils/contexts/UserContext";
import { useModalContext } from "./utils/contexts/ModalContext";
import Header from "./components/Header";
import Toast from "./components/Toast";
import { useToastContext } from "./utils/contexts/ToastContext";
import UserButtons from "./components/UserButtons";
import RequireAdmin from './components/RequireAdmin'

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
	const { isToast, toastMessage, toastType } = useToastContext();

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
				isAdmin: userInfo.isAdmin,
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
			{width < breakpoint ? <UserButtons /> : ""}
			<Toast
				isToast={isToast}
				toastMessage={toastMessage}
				toastType={toastType}
			/>
			<Modal
				timeout={600}
				classNames={"translate-y"}
				unmountOnExit={true}
				isModal={isModal}
				resetModal={resetModal}
				content={modalContent}
			/>
			{/* {currentUser.isAdmin ? <Dashboard /> : ""} */}
			{/* {!currentUser.isAdmin ? <Header /> : ""} */}
			<Header />
			<div className="main-container">
				{/* <TransitionGroup component={null}>
				<CSSTransition key={location.key} classNames="page-transition" timeout={250}> */}
				<Routes location={location}>
					<Route
						path="/"
						element={
							currentUser.loggedIn ? <StudentProfile /> : <DefaultHome />
						}
					/>
					<Route path="/classes" element={<Classes />} />
					<Route path="/contact" element={<Contact />} />
					<Route
						path="/dashboard"
						element={
							<RequireAdmin>
								<Dashboard />
							</RequireAdmin>
						}
					/>
					{/* add below 404 page */}
					{/* <Route path="*" element={<NoMatch />} /> */}
				</Routes>
				{/* </CSSTransition>
				</TransitionGroup> */}
			</div>
		</ApolloProvider>
	);
}

export default App;
