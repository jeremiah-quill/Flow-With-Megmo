import React from "react";
import LoginForm from "../forms/LoginForm";
import '../../styles/LoginModal.css'

function LoginModal() {
	


	return (
		<div className="login-modal">
			<h1 className="login-header">
				Login
			</h1>
			<div className="modal-content">
				<LoginForm/>
			</div>
		</div>
	);
}

export default LoginModal;
