import "./reset.css";
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
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./utils/auth";
import Modal from "./components/Modal";
import { useUserContext } from "./utils/contexts/UserContext";
import { useModalContext } from "./utils/contexts/ModalContext";
import { useToastContext } from "./utils/contexts/ToastContext";
import { useWidthContext } from "./utils/contexts/WidthContext";
import Toast from "./components/Toast";
import RequireAdmin from "./components/RequireAdmin";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import MyStory from "./pages/MyStory";
import MyClass from "./pages/MyClass";
import HowItWorks from "./pages/HowItWorks";
import BookPrivate from "./pages/BookPrivate";
import StudentManage from "./pages/StudentManage";
import Navbar from "./components/Navbar";

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
	// full page transition overlays
	const [firstOverlay, setFirstOverlay] = useState(false);
	const [secondOverlay, setSecondOverlay] = useState(false);
	// sidebar local state
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	// global toast context
	const { isToast, toastMessage, toastType } = useToastContext();
	// global width context
	const { width, breakpoint } = useWidthContext();

	const { setCurrentUser } = useUserContext();
	const { isModal, resetModal, modalContent } = useModalContext();

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
		if (isSidebarOpen) {
			closeSidebar();
		}
	}, [location.pathname]);

	useEffect(() => {
		// turn on first overlay
		setFirstOverlay(true);

		// after half a second, turn off first overlay
		setTimeout(() => {
			setFirstOverlay(false);
		}, 500);

		// after half a second, turn on second overlay
		setTimeout(() => {
			setSecondOverlay(true);
			// after half a second, turn off second overlay
			setTimeout(() => {
				setSecondOverlay(false);
			}, 500);
		}, 500);
	}, [location.pathname]);

	return (
		<ApolloProvider client={client}>
			<header className="header">
				{width < breakpoint ? (
					""
				) : (
					<div className="hero-content">
						<h1 className="hero-title">Flow with Megmo</h1>
					</div>
				)}

				{width < breakpoint ? (
					<Sidebar
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
						closeSidebar={closeSidebar}
					/>
				) : (
					<Navbar />
				)}
			</header>
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
			<div
				className={`first-overlay ${
					firstOverlay === true ? "first-overlay-on" : "first-overlay-off"
				}`}
			></div>
			<div
				className={`second-overlay ${
					secondOverlay === true ? "second-overlay-on" : "second-overlay-off"
				}`}
			></div>
			{/* Half a second after pathname changes, transition in the new page and out the old page */}
			<TransitionGroup element={null}>
				<CSSTransition key={location.pathname} classNames="" timeout={500}>
					<div className="page">
						<Routes location={location}>
							<Route path="/" element={<Home />} />
							<Route path="/my-story" element={<MyStory />} />
							<Route path="/my-class" element={<MyClass />} />
							<Route path="/how-it-works" element={<HowItWorks />} />
							<Route path="/book-private" element={<BookPrivate />} />
							<Route
								path="/manage-classes"
								element={
									<StudentManage width={width} breakpoint={breakpoint} />
								}
							/>
							<Route
								path="/admin-dashboard"
								element={
									<RequireAdmin>
										<AdminDashboard width={width} breakpoint={breakpoint} />
									</RequireAdmin>
								}
							/>
						</Routes>
					</div>
				</CSSTransition>
			</TransitionGroup>
		</ApolloProvider>
	);
}

export default App;
