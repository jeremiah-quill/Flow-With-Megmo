import React from "react";
import { zoomDelete } from "../../utils/API";

function DeleteClassModal({ yogaClass }) {

	// TODO: error handling
	const handleDelete = async (id) => {
		const meetingId = {meetingId: id}
		const deleteResponse = await zoomDelete(meetingId)
		// TODO: graphQL mutation to delete class in database




		console.log(deleteResponse)
	}


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
				<button onClick={() => handleDelete(yogaClass.class_id)}>
					Confirm
				</button>
			</div>
		</div>
	);
}

export default DeleteClassModal;
