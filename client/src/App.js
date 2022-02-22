import "./App.css";
import "./reset.css";
import "./test.css";
import "./test2.css";
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
import AdminDashboard from "./components/pages/AdminDashboard";
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
import RequireAdmin from "./components/RequireAdmin";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import MyStory from "./pages/MyStory";
import MyClass from "./pages/MyClass";
import HowItWorks from "./pages/HowItWorks";
import BookPrivate from "./pages/BookPrivate";
import StudentManage from "./pages/StudentManage";
import Navbar from "./components/Navbar";
import yogaSpinner from "./images/yoga-spinner.png";

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
	const [firstOverlay, setFirstOverlay] = useState(false);
	const [secondOverlay, setSecondOverlay] = useState(false);
	const [pageDelay, setPageDelay] = useState(false);

	const { isToast, toastMessage, toastType } = useToastContext();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 1200;

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
		if (isSidebarOpen) {
			closeSidebar();
		}
	}, [location.pathname]);

	useEffect(() => {
		setFirstOverlay(true);

		// setFirstOverlay(true);
		setTimeout(() => {
			setFirstOverlay(false);
		}, 500);

		setTimeout(() => {
			setSecondOverlay(true);
			setTimeout(() => {
				setSecondOverlay(false);
			}, 500);
		}, 500);
	}, [location.key]);

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

			{/* {isSidebarOpen ? <Sidebar closeSidebar={closeSidebar} /> : ""} */}
			{/* {width < breakpoint ? <UserButtons /> : ""} */}

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
			{/* <Header /> */}
			{/* <div className="main-container"> */}
			<div
				className={`first-overlay ${
					firstOverlay === true ? "first-overlay-on" : "first-overlay-off"
				}`}
			>
				{/* <img className="yoga-spinner" src={yogaSpinner} /> */}
			</div>
			<div
				className={`second-overlay ${
					secondOverlay === true ? "second-overlay-on" : "second-overlay-off"
				}`}
			>
				{/* <img className="yoga-spinner" src={yogaSpinner}/> */}
			</div>
			<TransitionGroup element={null}>
				<CSSTransition key={location.key} classNames="page-delay" timeout={550}>
					<div className="page">
						<Routes location={location}>
							{/* <CSSTransition in={isSidebarOpen} classNames="shrink-page" timeout={500}> */}
							<Route path="/" element={<Home />} />
							{/* </CSSTransition> */}
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

							{/* <Route path="/manage-classes-admin" element={<TeacherManage />} /> */}

							{/* <Route path="/classes" element={<Classes />} />
					<Route path="/contact" element={<Contact />} />
					<Route
						path="/dashboard"
						element={
							<RequireAdmin>
								<Dashboard />
							</RequireAdmin>
						}
					/> */}
						</Routes>
					</div>
				</CSSTransition>
			</TransitionGroup>
			{/* </div> */}
		</ApolloProvider>
	);
}

export default App;
