import "./reset.css";
import "./App.css";
import "./animations.css"
import React, { useEffect } from "react";
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
import { useSidebarContext } from "./utils/contexts/SidebarContext";
import { useWidthContext } from "./utils/contexts/WidthContext";
import { usePageTransitionContext } from "./utils/contexts/PageTransitionContext";
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
import NotFound from "./pages/NotFound";
import { Link } from "react-router-dom";

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
	// global toast, width, user, modal, sidebar, and page transition contexts
	const { isToast, toastMessage, toastType } = useToastContext();
	const { width, breakpoint } = useWidthContext();
	const { setCurrentUser } = useUserContext();
	const { isModal, resetModal, modalContent } = useModalContext();
	const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
	const { firstOverlay, secondOverlay, initializePageTransition } =
		usePageTransitionContext();

	// set current user when app component is mounted?
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

	// When url path changes, close any open modals and the sidebar
	const location = useLocation();
	useEffect(() => {
		resetModal();
		if (isSidebarOpen) {
			setIsSidebarOpen(false);
		}
	}, [location.pathname]);

	// when url path changes, initiate page transition
	useEffect(() => {
		initializePageTransition();
	}, [location.pathname]);

	let timeout = width < breakpoint ? 600 : 350

	return (
		<ApolloProvider client={client}>
			<header className="header">
				{width < breakpoint ? (
					""
				) : (
					<div className="hero-content">
						<h1 className="hero-title">
							<Link to="/">Flow with Megmo</Link>
						</h1>
					</div>
				)}

				{width < breakpoint ? <Sidebar /> : <Navbar />}
			</header>
			<Toast
				isToast={isToast}
				toastMessage={toastMessage}
				toastType={toastType}
			/>
			<Modal
				timeout={timeout}
				classNames={`${width < breakpoint ? "translate-y" : 'fade'}`}
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
			<TransitionGroup element={null} className="test">
				<CSSTransition key={location.pathname} classNames="" timeout={500}>
					<div className="page">
						<Routes location={location}>
							<Route path="/" element={<Home />} />
							<Route path="/my-story" element={<MyStory />} />
							<Route path="/my-class" element={<MyClass />} />
							<Route path="/how-it-works" element={<HowItWorks />} />
							<Route path="/book-private" element={<BookPrivate />} />
							<Route
								path="/dashboard"
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
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</CSSTransition>
			</TransitionGroup>
		</ApolloProvider>
	);
}

export default App;
