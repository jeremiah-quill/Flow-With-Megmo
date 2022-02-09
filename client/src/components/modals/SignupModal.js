import React from "react";
import SignupForm from "../forms/SignupForm";

function SignupModal() {
	return (
		<div className="modal-card">
			<header className="modal-header">
				Signup
			</header>
			<div className="modal-content">
				<SignupForm />
			</div>
			{/* <div className="modal-footer">
				<button onClick={() => handleDelete(yogaClass.zoomId, yogaClass._id)}>
					Confirm
				</button>
			</div> */}
		</div>
	);
}

export default SignupModal;
