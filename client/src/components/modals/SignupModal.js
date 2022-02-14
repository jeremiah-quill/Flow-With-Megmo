import React from "react";
import SignupForm from "../forms/SignupForm";
import "../../styles/SignupModal.css";

function SignupModal() {
	return (
		<div className="signup-modal">
		{/* <div className="modal-card"> */}
			<h1 className="signup-header">
				Signup
			</h1>
			<div className="modal-content">
				<SignupForm />
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

export default SignupModal;
