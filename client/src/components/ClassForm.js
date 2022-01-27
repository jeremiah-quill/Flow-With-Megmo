import React, { useState } from "react";

// TODO: Should this be 1 function re-used for both creating and editing the same form? I think take out the abstraction here, and just make 2 separate forms, 1 for each CRUD action
function ClassForm({ action, values, id }) {
	// figure out a way to make these dynamic so I can use either date or values.date
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		action(date, time, id);
		setDate("");
		setTime("");
	};

	// const handleEditSubmit = (e) => {
	// 	console.log("handleEditSubmit working");
	// 	e.preventDefault();
	// 	editClass(classDetails.class_id, date, time);
	// 	setEditableDate("");
	// 	setEditableTime("");
	// };

	return (
		<div className="create-class-form">
			<form onSubmit={handleSubmit}>
				{/* <form onSubmit={()=>formAction(id)}> */}

				<input
					type="date"
					// if classDetails are passed in as a prop (for editing a class), set the date in this input
					value={values ? values.date : date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<input
					type="time"
					value={values ? values.time : time}
					onChange={(e) => setTime(e.target.value)}
				/>
				<input
					type="submit"
					value={`${values ? "Edit Class" : "Create Class"}`}
				/>
			</form>
		</div>
	);
}

export default ClassForm;
