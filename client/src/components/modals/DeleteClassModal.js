import React from "react";

function DeleteClassModal({ yogaClass }) {
	// TODO: where should I put this delete function?  In some kind of central location?
	const deleteClassApiCall = (id) => {
		console.log("deleteClass firing");

		const meetingId = { meetingId: id };

		// Send post request to express server with data from form
		fetch("/api/zoom/delete-class", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(meetingId),
		})
			// TODO: this response doesn't make sense, how can I tell if it's success or error
			.then((response) => response)
			.then((data) => {
				// TODO: Get back meeting details to add to state/re-render UI.  Also update DB.  Should I add it to a central state?
				console.log(data);
			});
	};

	return (
		<div className="modal-card">
			<header className="modal-header">
				{yogaClass.date} @ {yogaClass.time}
			</header>
			<div className="modal-content">
				Please confirm you would like to delete this class. All users who have
				signed up will receive an email notification.
			</div>
			<div className="modal-footer">
				<button onClick={() => deleteClassApiCall(yogaClass.class_id)}>
					Confirm
				</button>
			</div>
		</div>
	);
}

export default DeleteClassModal;
