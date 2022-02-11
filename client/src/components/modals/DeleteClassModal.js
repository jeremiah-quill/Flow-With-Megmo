import React from "react";
import { zoomDelete } from "../../utils/API";
import { useMutation } from "@apollo/client";
import { DELETE_CLASS } from "../../utils/mutations";

function DeleteClassModal({ yogaClass }) {
	const [deleteClass, { error }] = useMutation(DELETE_CLASS);

	const handleDelete = async (zoomId, classId) => {
		// TODO: query all students in this class and get their eamils.  send them each an email telling them class is cancelled
		// 
		// 
		// 

		// Cancel zoom meeting
		// TODO: error handling
		try {
			const meetingId = { meetingId: zoomId };
			const deleteResponse = await zoomDelete(meetingId);
			console.log(deleteResponse);
		} catch (err) {
			console.error(err);
		}

		// Cancel class in db
		// TODO: error handling
		try {
			const { data } = await deleteClass({
				variables: { classId },
			});
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

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
				<button onClick={() => handleDelete(yogaClass.zoomId, yogaClass._id)}>
					Confirm
				</button>
			</div>
		{/* </div> */}
		</div>
	);
}

export default DeleteClassModal;
