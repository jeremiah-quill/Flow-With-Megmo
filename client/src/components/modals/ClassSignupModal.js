import React from "react";
import Class from "../Class";
import '../../styles/ClassSignupModal.css'

function ClassSignupModal({id}) {
	return (
		<div>
			<h1 className="class-signup-header">
				Register
			</h1>
			<div className="modal-content">
				<Class id={id}/>
			</div>
		</div>
	);
}

export default ClassSignupModal;
