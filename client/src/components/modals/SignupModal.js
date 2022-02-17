import React from "react";
import SignupForm from "../forms/SignupForm";
import "../../styles/SignupModal.css";

function SignupModal() {
	return (
		<div className="signup-modal">
			<h1 className="signup-header">
				Signup
			</h1>
			<div className="modal-content">
				<SignupForm />
			</div>
		</div>
	);
}

export default SignupModal;
