import React, { useState } from "react";
import { zoomCreate } from "../../utils/API";
import { useMutation } from "@apollo/client";
import { CREATE_CLASS } from "../../utils/mutations";
import { useToastContext } from "../../utils/contexts/ToastContext";

// TODO: validate so meghan can't choose a date that is in the past
function CreateClassForm({refetch}) {
	const { configureToast } = useToastContext();

	const [createClass, { error }] = useMutation(CREATE_CLASS);

	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [price, setPrice] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const classData = {
			topic: "Flow with Megmo",
			type: 2,
			start_time: `${date}T${time}:00`,
			duration: 60,
			// settings: {
			// 	approval_type: 0,
			// 	registration_type: 2,
			// },
		};

		try {
			const classResponse = await zoomCreate(classData);
			const newClassDetails = JSON.parse(classResponse);

			// TODO: error handling on response from zoom api
			// console.log(newClassDetails);

			const zoomId = JSON.stringify(newClassDetails.id);
			const link = newClassDetails.join_url;
			const dateStamp = newClassDetails.start_time;
			const parsedPrice = parseInt(price);

			const { data } = await createClass({
				variables: { zoomId, link, dateStamp, parsedPrice },
			});

			// console.log(data);

			configureToast("Your class has been added to the schedule.", 'success', 3000)
			refetch()

			setDate("");
			setTime("");
			setPrice("");

		} catch (err) {
			// console.error(err);
			configureToast("Something went wrong and your class was not added to the schedule, please submit a bug report and we will look into it.", "failure", 5000)

		}


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
				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<input
					type="submit"
					value="Create Class"
					disabled={date === "" || time === "" || price === ""}
				/>
			</form>
		</div>
	);
}

export default CreateClassForm;
