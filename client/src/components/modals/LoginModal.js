import React from "react";
import LoginForm from "../forms/LoginForm";

function LoginModal() {
	


	return (
		<div className="login-modal">
			<h1 className="login-header modal-title">
				Login
			</h1>
			<div className="modal-content">
				<LoginForm/>
			</div>
		</div>
	);
}

export default LoginModal;
