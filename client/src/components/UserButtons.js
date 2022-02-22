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
					<button
						className="nav-item main-btn"
						onClick={() => configureModal(<LoginModal />)}
					>
						Login
					</button>
					<button
						className="nav-item signup-button main-btn"
						onClick={() => configureModal(<SignupModal />)}
					>
						Signup
					</button>
				</>
			) : (
				<>
				{/* <div>Logged in as: {currentUser.username}</div> */}
				<button
					className="nav-item main-btn"
					onClick={() => Auth.logout()}
				>
					Logout
				</button>
				</>
			)}
		</div>
	);
}

export default UserButtons;
