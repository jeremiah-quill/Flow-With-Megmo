import React, { useState } from "react";

function CreateClassForm({ classDetails }) {
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	// TODO: is this where I should keep this function? It takes form data and sends it to an express server which makes the zoom api call to create a class.
	const createClass = (classDate, classTime) => {
		const classDetails = {
			topic: "Flow with Megmo",
			type: 2,
			start_time: `${classDate}T${classTime}:00`,
			duration: 60,
			settings: {
				approval_type: 0,
				registration_type: 2,
			},
		};
		// Send post request to express server with data from form
		fetch("/api", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(classDetails),
		})
			.then((response) => response.json())
			.then((data) => {
				// TODO: Get back meeting details to add to state/re-render UI.  Should I add it to a central state?
				console.log(data);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createClass(date, time);
		setDate("");
		setTime("");
	};

	return (
		<div className="create-class-form">
			<form onSubmit={handleSubmit}>
				<input
					type="date"
					// if classDetails are passed in as a prop (for editing a class), set the date in this input
					value={classDetails ? classDetails.date : date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<input
					type="time"
					value={classDetails ? classDetails.time : time}
					onChange={(e) => setTime(e.target.value)}
				/>
				<input
					type="submit"
					value={`${classDetails ? "Edit Class" : "Create Class"}`}
				/>
			</form>
		</div>
	);
}

export default CreateClassForm;
