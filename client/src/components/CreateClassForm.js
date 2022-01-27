import React, { useState } from "react";

function CreateClassForm({ onSubmit }) {
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(date, time);
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
