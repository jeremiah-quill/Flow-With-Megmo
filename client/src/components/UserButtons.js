import React from "react";
import { useModalContext } from "../utils/contexts/ModalContext";
import { useUserContext } from "../utils/contexts/UserContext";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import Auth from "../utils/auth";

function UserButtons() {
	const { currentUser } = useUserContext();
	const { configureModal } = useModalContext();

	return (
		<div className="user-btns">
			{currentUser.loggedIn === false ? (
				<>
					<a href="#"
						className="nav-item"
						onClick={() => configureModal(<LoginModal />)}
					>
						Login
					</a>
					<a href="#"
						className="nav-item signup-button"
						onClick={() => configureModal(<SignupModal />)}
					>
						Signup
					</a>
				</>
			) : (
				<>
				{/* <div>Logged in as: {currentUser.username}</div> */}
				<a href="#"
					className="nav-item"
					onClick={() => Auth.logout()}
				>
					Logout
				</a>
				</>
			)}
		</div>
	);
}

export default UserButtons;
