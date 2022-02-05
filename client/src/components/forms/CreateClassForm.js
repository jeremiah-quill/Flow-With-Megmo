import React, { useState } from "react";
import { zoomCreate } from "../../utils/API";

// TODO: validate so meghan can't send bad data
function CreateClassForm() {
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const classData = {
			topic: "Flow with Megmo",
			type: 2,
			start_time: `${date}T${time}:00`,
			duration: 60,
			settings: {
				approval_type: 0,
				registration_type: 2,
			},
		};

		const classResponse = await zoomCreate(classData)
		console.log(`classResponse: ${classResponse}`)

		setDate("");
		setTime("");
	};

	return (
		<div className="create-class-form">
			<form onSubmit={handleSubmit}>
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
				<input type="submit" value="Create Class" />
			</form>
		</div>
	);
}

export default CreateClassForm;
