import React from "react";

function CancelRegistrationModal({ yogaClass, action }) {
	console.log(yogaClass)

	return (
		<div>
		{/* <div className="modal-card"> */}
			<header className="modal-header">
				{yogaClass.date} @ {yogaClass.time}
			</header>
			<div className="modal-content">
				Please confirm you would like to delete this class. All users who have
				signed up will receive an email notification.
			</div>
			<div className="modal-footer">
				<button onClick={() => action(yogaClass._id)}>
					Confirm
				</button>
			</div>
		{/* </div> */}
		</div>
	);
}

export default CancelRegistrationModal;
