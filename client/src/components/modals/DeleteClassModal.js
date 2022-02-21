import React from "react";
import { zoomDelete } from "../../utils/API";
import { useMutation } from "@apollo/client";
import { DELETE_CLASS } from "../../utils/mutations";
import { useToastContext } from "../../utils/contexts/ToastContext";
import { useModalContext } from "../../utils/contexts/ModalContext";
import { sendEmail } from "../../utils/API";
import { cancelClassMsg } from "../../utils/emailMessages.js";
import parseDate from "../../utils/helpers/parseDate";

function DeleteClassModal({ scheduledClass, refetch }) {
	const { dayOfMonth, month, dayOfWeek, hour } = parseDate(scheduledClass.date);

	const classDetails = { dayOfMonth, month, dayOfWeek, hour };

	const { configureToast } = useToastContext();
	const { resetModal } = useModalContext();

	const [deleteClass] = useMutation(DELETE_CLASS);

	const handleDelete = async (zoomId, classId, classDetails) => {
		try {
			// Delete in Zoom API
			const meetingId = { meetingId: zoomId };
			const deleteResponse = await zoomDelete(meetingId);
			console.log(deleteResponse);

			// Delete in DB
			const { data } = await deleteClass({
				variables: { classId },
			});

			data.deleteClass.forEach(async (student) => {
				// Send email to user confirming their cancellation
				const emailData = {
					toEmail: student.email,
					subject: `Class cancelled on ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}`,
					message: cancelClassMsg(classDetails),
				};

				const emailResponse = await sendEmail(emailData);
			});

			// TODO: send email to students
			// TODO: allow teacher to customize this cancellation message
			// console.log(`Send email to everyone in this list ${data.deleteClass} with message from teacher`);

			// Configure toast, refetch scheduled classes, and close modal
			configureToast(
				"Your class has been deleted from the schedule and you have been sent an email with registered student details",
				"success",
				3000
			);
			refetch();
			resetModal();
		} catch (err) {
			console.error(err);
			configureToast(
				"Something went wrong and your class was not deleted from the schedule, please submit a bug report.",
				"failure",
				5000
			);
		}
	};

	return (
		<div>
			{/* <div className="modal-card"> */}
			<header className="modal-header">
				{scheduledClass.date} @ {scheduledClass.time}
			</header>
			<div className="modal-content">
				Please confirm you would like to delete this class. All users who have
				signed up will receive an email notification.
			</div>
			<div className="modal-footer">
				<button
					onClick={() =>
						handleDelete(scheduledClass.zoomId, scheduledClass._id, classDetails)
					}
				>
					Confirm
				</button>
			</div>
			{/* </div> */}
		</div>
	);
}

export default DeleteClassModal;
