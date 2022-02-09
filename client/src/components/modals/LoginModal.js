import React from "react";
import LoginForm from "../forms/LoginForm";

function LoginModal() {
	return (
		<div className="modal-card">
			<header className="modal-header">
				Login
			</header>
			<div className="modal-content">
				<LoginForm />
			</div>
			{/* <div className="modal-footer">
				<button onClick={() => handleDelete(yogaClass.zoomId, yogaClass._id)}>
					Confirm
				</button>
			</div> */}
		</div>
	);
}

export default LoginModal;
