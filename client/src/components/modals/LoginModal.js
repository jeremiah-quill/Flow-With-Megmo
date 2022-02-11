import React from "react";
import LoginForm from "../forms/LoginForm";
import '../../styles/LoginModal.css'

function LoginModal() {
	return (
		<div>
		{/* <div className="modal-card"> */}
			<h1 className="login-header">
				Login
			</h1>
			<div className="modal-content">
				<LoginForm />
			</div>
			{/* <div className="modal-footer">
				<button onClick={() => handleDelete(yogaClass.zoomId, yogaClass._id)}>
					Confirm
				</button>
			</div> */}
		{/* </div> */}
		</div>
	);
}

export default LoginModal;
