import React, { useState } from "react";

function CreateClassForm({ classDetails }) {
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [editableDate, setEditableDate] = useState(
		classDetails ? classDetails.date : ""
	);
	const [editableTime, setEditableTime] = useState(
		classDetails ? classDetails.time : ""
	);

	// TODO: is this where I should keep this function? It takes form data and sends it to an express server which makes the zoom api call to create a class.
	const createClass = (classDate, classTime) => {
		const classData = {
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
			body: JSON.stringify(classData),
		})
			.then((response) => response.json())
			.then((data) => {
				// TODO: Get back meeting details to add to state/re-render UI.  Should I add it to a central state?
				console.log(data);
			});
	};
	

	// TODO: is this where I should keep this function? It takes form data and sends it to an express server which makes the zoom api call to create a class.
	const editClass = (meetingId, classDate, classTime) => {
		console.log("editClass firing");

		const classData = {
			start_time: `${classDate}T${classTime}:00`,
			meetingId: meetingId,
		};

		// Send post request to express server with data from form
		fetch("/api/edit-class", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(classData),
		})
		// TODO: this response doesn't make sense, how can I tell if it's success or error
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

	const handleEditSubmit = (e) => {
		console.log("handleEditSubmit working");
		e.preventDefault();
		editClass(classDetails.class_id, date, time);
		setEditableDate("");
		setEditableTime("");
	};

	return (
		<div className="create-class-form">
			<form onSubmit={classDetails ? handleEditSubmit : handleSubmit}>
				<input
					type="date"
					// if classDetails are passed in as a prop (for editing a class), set the date in this input
					value={classDetails ? editableDate : date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<input
					type="time"
					value={classDetails ? editableTime : time}
					onChange={(e)=> setTime(e.target.value)}
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
