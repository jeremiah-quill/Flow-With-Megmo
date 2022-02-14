import React, { useState } from "react";
import { zoomEdit } from "../../utils/API";
import { useMutation } from "@apollo/client";
import { UPDATE_CLASS } from "../../utils/mutations";

// TODO: validate so meghan can't send bad data
// TODO: success/error handling for zoom update and db update
// TODO: add email notification to everyone on roster
function EditClassForm({ classId, zoomId, currentDateString }) {
	const currentDate = new Date(currentDateString);
	const formattedCurrentDate = currentDate.toLocaleDateString("en-CA");
	const formattedCurrentTime = currentDate
		.toLocaleTimeString("en-US", { hour12: false })
		.split("")
		.slice(0, -3)
		.join("");

	const [date, setDate] = useState(formattedCurrentDate);
	const [time, setTime] = useState(formattedCurrentTime);

	const [updateClass, { error }] = useMutation(UPDATE_CLASS);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newDateTime = `${date}T${time}:00`

		const classData = {
			start_time: newDateTime,
			meetingId: zoomId,
		};
		const editResponse = await zoomEdit(classData);

		try {
			const { data } = await updateClass({
				variables: { classId, newDateTime },
			});
		} catch (err) {
			console.error(err);
		}

		setDate("");
		setTime("");
	};

	return (
		<div className="create-class-form">
			<form id={classId} onSubmit={handleSubmit}>
				<input
					type="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<input
					type="time"
					value={time}
					onChange={(e) => setTime(e.target.value)}
				/>
				{/* <input type="submit" value="Edit Class" /> */}
			</form>
		</div>
	);
}

export default EditClassForm;
