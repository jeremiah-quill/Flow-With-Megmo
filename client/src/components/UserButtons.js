import React from "react";
import { useModalContext } from "../utils/contexts/ModalContext";
import { useUserContext } from "../utils/contexts/UserContext";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import Auth from "../utils/auth";
import { Link, useLocation } from "react-router-dom";

function UserButtons() {
	let location = useLocation();
	const { currentUser } = useUserContext();
	const { configureModal } = useModalContext();

	return (
		<div className="user-btns">
			{currentUser.loggedIn === false ? (
				<>
					<button
						className="user-btn"
						onClick={() => configureModal(<LoginModal />)}
					>
						Login
					</button>
					<button
						className="user-btn signup-button"
						onClick={() => configureModal(<SignupModal />)}
					>
						Sign Up
					</button>
				</>
			) : (
				<>
					{/* <div>Logged in as: {currentUser.username}</div> */}
					<div className="large-screen-nav-btn-container">
						{location.pathname === "/" ? (
							<button className="nav-item main-btn large-screen-nav-btn">
								<Link to={"/dashboard"}>My Account</Link>
							</button>
						) : (
							<button className="nav-item main-btn large-screen-nav-btn" >
								<Link to={"/"}>Home</Link>
							</button>
						)}
					</div>
					<button className="user-btn" onClick={() => Auth.logout()}>
						Logout
					</button>
				</>
			)}
		</div>
	);
}

export default UserButtons;
