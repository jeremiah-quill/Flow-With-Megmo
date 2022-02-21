import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";
import { useModalContext } from "../utils/contexts/ModalContext";
import { useUserContext } from "../utils/contexts/UserContext";
import UserButtons from "./UserButtons";

function Navbar() {
	const { currentUser } = useUserContext();
	return (
		<nav className="list-nav">
			<UserButtons />
			<Link className="nav-item main-nav-item" to="/">
				Home
			</Link>
			<Link className="nav-item main-nav-item" to="/my-story">
				My Story
			</Link>
			<Link className="nav-item main-nav-item" to="/my-class">
				My Class
			</Link>
			<Link className="nav-item main-nav-item" to="/how-it-works">
				How It Works
			</Link>
			<Link className="nav-item main-nav-item" to="/book-private">
				Book Private
			</Link>

			{currentUser.isAdmin ? (
				<Link className="nav-item" to="/admin-dashboard">
					Admin Dashboard
				</Link>
			) : (
				""
			)}

			{currentUser.loggedIn ? (
				<Link className="nav-item" to="/manage-classes">
					Manage Classes
				</Link>
			) : (
				""
			)}

			{/* </ul> */}
		</nav>
	);
}

export default Navbar;
