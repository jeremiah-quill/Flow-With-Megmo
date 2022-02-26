import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../utils/contexts/UserContext";
import UserButtons from "./UserButtons";
import CustomLink from "./CustomLink";

function Navbar() {
	const { currentUser } = useUserContext();
	return (
		<nav className="list-nav sidebar-nav">
			<UserButtons />
			{/* {currentUser.loggedIn ? (
				<Link className="nav-item main-nav-item" to="/">
					Home
				</Link>
			) : (
				""
			)} */}

			{/* <CustomLink className="nav-item main-nav-item" to="/my-story">
				About
			</CustomLink>
			<CustomLink className="nav-item main-nav-item" to="/my-class">
				Yoga Sculpt
			</CustomLink>
			<CustomLink className="nav-item main-nav-item" to="/how-it-works">
				How This Works
			</CustomLink>
			<CustomLink className="nav-item main-nav-item" to="/book-private">
				Book Private
			</CustomLink> */}

			{currentUser.isAdmin ? (
				<Link className="nav-item main-nav-item" to="/admin-dashboard">
					Admin Dashboard
				</Link>
			) : (
				""
			)}

			{/* {currentUser.loggedIn ? (
				<Link className="nav-item main-nav-item" to="/dashboard">
					Dashboard
				</Link>
			) : (
				""
			)} */}

			{/* </ul> */}
		</nav>
	);
}

export default Navbar;
