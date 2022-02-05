import React, { useState, useEffect } from "react";
import { zoomJoin } from "../../utils/API";
import { useNavigate } from "react-router-dom";

// TODO: should this component have less logic?
// TODO: validate form on front end
function JoinClassForm({ meetingId, isPaymentSuccess, setFormSubmitted }) {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const handleJoinClass = async (firstName, lastName, email) => {
		const data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			meetingId: meetingId,
		};
		// add student to class
		const response = await zoomJoin(data);
		console.log(response);
		console.log(`join class response: ${response}`)
		// TODO: add student to DB if api call was successful
		navigate("/classes"); // toast to show success
	};

	useEffect(() => {
		if (isPaymentSuccess === true) {
			// TODO: validation on handleJoinClass
			handleJoinClass(firstName, lastName, email);
			setFirstName("");
			setLastName("");
			setEmail("");
		}
	}, [isPaymentSuccess]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormSubmitted(true);
	};

	return (
		<form
			className="registrant-form"
			onSubmit={handleSubmit}
			autoComplete="off"
			id={meetingId}
		>
			<input autoComplete="false" type="hidden" />
			<input
				type="text"
				placeholder="First Name"
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Last Name"
				onChange={(e) => setLastName(e.target.value)}
			/>
			<input
				type="email"
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div id={"braintree-drop-in-div"} />
			<input
				className={"braintreePayButton"}
				type="submit"
				value="Book Class"
			/>
		</form>
	);
}

export default JoinClassForm;
