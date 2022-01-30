import React, { useState } from "react";

// TODO: validate so meghan can't send bad data
function EditClassForm({ values, id, onSubmit }) {
	const [date, setDate] = useState(values.date);
	const [time, setTime] = useState(values.time);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(date, time, id);
		setDate("");
		setTime("");
	};

	return (
		<div className="create-class-form">
			<form id={id} onSubmit={handleSubmit}>
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
				<input type="submit" value="Edit Class" />
			</form>
		</div>
	);
}

export default EditClassForm;
