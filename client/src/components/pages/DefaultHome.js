import React, { useState } from "react";
import Modal from "../Modal";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import useToggle from "../../hooks/useToggle";
import { useModalContext } from "../../utils/contexts/ModalContext";
import LoginForm from "../forms/LoginForm";
import "../../styles/DefaultHome.css";

function DefaultHome() {
	const { configureModal } = useModalContext();

	return (
		<div className="default-home view">
			<h2 className="default-home-title">Flow with Megmo</h2>
			<div className="default-home-welcome">
				Welcome! I teach weekly(ish) virtual yoga classes and would love for you
				to join me! Browse the schedule and register for a class or contact me
				to book a private event.
			</div>
			{/* <LoginForm /> */}
			{/* <div className="btn-container-stacked">
				<button
					className="btn btn-round btn-pink"
					onClick={() => configureModal(<LoginModal />)}
				>
					Login
				</button>
				<button
					className="btn btn-round btn-pink"
					onClick={() => configureModal(<SignupModal />)}
				>
					Signup
				</button>
			</div> */}
		</div>
	);
}

export default DefaultHome;
