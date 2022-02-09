import React, { useState } from "react";
import { zoomEdit } from "../../utils/API";


// TODO: this is broken, need to pull out time from timestamp rather than send time separately
// TODO: validate so meghan can't send bad data
function EditClassForm({ values, id}) {
	const [date, setDate] = useState(values.date);
	const [time, setTime] = useState(values.time);
	const [price, setPrice] = useState(values.price)

	const handleSubmit = async (e) => {
		e.preventDefault();
		const classData = {
			start_time: `${date}T${time}:00`,
			meetingId: id,
		};
		const editResponse = await zoomEdit(classData)
		// TODO: graphQL mutation to edit class in database



		console.log(`classResponse: ${editResponse}`)
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
				{/* <input type="submit" value="Edit Class" /> */}
			</form>
		</div>
	);
}

export default EditClassForm;
