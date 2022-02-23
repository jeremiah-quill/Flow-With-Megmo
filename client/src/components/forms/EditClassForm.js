import React, { useState } from "react";
import { zoomEdit } from "../../utils/API";
import { useMutation } from "@apollo/client";
import { UPDATE_CLASS } from "../../utils/mutations";
import { useToastContext } from "../../utils/contexts/ToastContext";
import { useModalContext } from "../../utils/contexts/ModalContext";
import { sendEmail } from "../../utils/API";
import { updateClassMsg } from "../../utils/emailMessages.js";
import parseDate from "../../utils/helpers/parseDate";

// TODO: validate so meghan can't send bad data
// TODO: success/error handling for zoom update and db update
// TODO: add email notification to everyone on roster
function EditClassForm({ classId, zoomId, currentDateString, refetch }) {
	const { configureToast } = useToastContext();
	const { resetModal } = useModalContext();

	const currentDate = new Date(currentDateString);
	const formattedCurrentDate = currentDate.toLocaleDateString("en-CA");
	const formattedCurrentTime = currentDate
		.toLocaleTimeString("en-US", { hour12: false })
		.split("")
		.slice(0, -3)
		.join("");

	const [date, setDate] = useState(formattedCurrentDate);
	const [time, setTime] = useState(formattedCurrentTime);

	const [updateClass] = useMutation(UPDATE_CLASS);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newDateTime = `${date}T${time}:00`;

		const { dayOfMonth, month, dayOfWeek, hour } = parseDate(currentDateString);
		const oldClassDetails = { dayOfMonth, month, dayOfWeek, hour };
		const updatedClassDetails = parseDate(newDateTime)

		try {
			// Update class in Zoom API
			// const newDateTime = `${date}T${time}:00`;
			const classData = {
				start_time: newDateTime,
				meetingId: zoomId,
			};
			const editResponse = await zoomEdit(classData);

			// Update class in DB
			const { data } = await updateClass({
				variables: { classId, newDateTime },
			});

			data.updateClass.roster.forEach(async (student) => {
				// Send email to user confirming the updated class details
				const emailData = {
					toEmail: student.email,
					subject: `Class time has been updated for ${dayOfWeek}, ${month}/${dayOfMonth} @ ${hour}`,
					message: updateClassMsg(oldClassDetails, updatedClassDetails),
				};

				const emailResponse = await sendEmail(emailData);
			});

			// Configure toast, refetch list of scheduled classes, reset modal, reset form
			configureToast(
				"Your class details have been updated on the schedule.",
				"success",
				3000
			);
			refetch();
			resetModal();
			setDate("");
			setTime("");
		} catch (err) {
			// console.error(err);
			configureToast(
				err.message,
				"failure",
				10000
			);
		}
	};

	return (
			<form className="update-class-form" onSubmit={handleSubmit}>
				<input
					className="update-class-date outline-input"
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<input
					className="update-class-time outline-input"
					type="time"
					value={time}
					onChange={(e) => setTime(e.target.value)}
				/>
				<input className="main-btn modal-btn" type="submit" value="Confirm Update" />
			</form>
	);
}

export default EditClassForm;
