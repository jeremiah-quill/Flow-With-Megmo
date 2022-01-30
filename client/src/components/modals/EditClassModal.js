import React from "react";
import EditClassForm from "../forms/EditClassForm";

function EditClassModal({ yogaClass }) {
	// TODO: move this api call method (that will be called on form submit) somewhere central, but where?

	const editClassApiCall = (updatedDate, updatedTime, meetingId) => {
		console.log("editClass firing");

		const classData = {
			start_time: `${updatedDate}T${updatedTime}:00`,
			meetingId: meetingId,
		};

		// Send post request to express server with data from form
		fetch("/api/zoom/edit-class", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(classData),
		})
			// TODO: this response doesn't make sense, how can I tell if it's success or error
			.then((response) => response.json())
			.then((data) => {
				// TODO: add to state which will re-render to show edited class, also add to DB
				console.log(data);
			});
	};

	return (
		<div className="modal-card">
			<header className="modal-header">
				{yogaClass.date} @ {yogaClass.time}
			</header>
			<div className="modal-content">
				<EditClassForm
					values={{ date: yogaClass.date, time: yogaClass.time }}
					id={yogaClass.class_id}
					onSubmit={editClassApiCall}
				/>
			</div>
			<div className="modal-footer">
				<button form={yogaClass.class_id}>Confirm Class Update</button>
			</div>
		</div>
	);
}

export default EditClassModal;
