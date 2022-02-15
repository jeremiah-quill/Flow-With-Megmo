import React from "react";

function CancelRegistrationModal({ yogaClass, action }) {
	// console.log(yogaClass)

	// TODO: abstract this into a function to be able to use on student page, class schedule, and dashboard
	const classDateStamp = new Date(yogaClass.date);
	const dayOfMonth = classDateStamp.toLocaleString("en-US", { day: "2-digit" });
	const month = classDateStamp.toLocaleString("en-US", { month: "2-digit" });
	const dayOfWeek = classDateStamp.toLocaleString("en-US", { weekday: "long" });
	const hour = classDateStamp.toLocaleTimeString("en-US", {
		timeStyle: "short",
	});

	return (
		<div className="modal-center">
			<h1>Confirm Cancellation</h1>
			<div className="modal-content">
				Please confirm you would like to cancel your registration for class on{" "}
				{dayOfWeek}, {month}/{dayOfMonth} @ {hour}. If you don't see a
				reimbursement within 48 hours please email me at
				flowwithmegmo@gmail.com. Thanks!
			</div>
			<button className="btn btn-pink" onClick={() => action(yogaClass._id)}>
				Confirm
			</button>
		</div>
	);
}

export default CancelRegistrationModal;
