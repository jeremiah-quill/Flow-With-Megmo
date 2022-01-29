import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BraintreeDropIn from "../BraintreeDropIn";

import TextField from "@mui/material/TextField";

function JoinClassForm({ meetingId, isPaymentSuccess, setIsPaymentSuccess, formSubmitted, setFormSubmitted, setJoinClassSuccess }) {
    let navigate = useNavigate();

	// const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
	// const [formSubmitted, setFormSubmitted] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const joinClass = (firstName, lastName, email, meetingId) => {
		const registrantDetails = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			meetingId: meetingId,
		};

		// Send post request to express server with data from form
		fetch("/api/join-class", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registrantDetails),
		})
			.then((response) => response.json())
			.then((data) => {
				// TODO: Get back meeting details to add to state/re-render UI
				// TODO: validate if api call was successful, if it was setIsJoinSuccess to true, otherwise false
				console.log(data)
				// navigate("/classes");
				setJoinClassSuccess(true)
			});
	};

	useEffect(() => {
		if (isPaymentSuccess === true) {
			// TODO: validation on joinClass
			joinClass(firstName, lastName, email, meetingId);
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
			<TextField
				style={{
					color: "white",
				}}
				sx={{ input: { color: "white" } }}
				size="small"
				id="outlined-basic"
				label="First Name"
				variant="outlined"
				onChange={(e) => setFirstName(e.target.value)}
				margin="dense"
			/>
			<TextField
				size="small"
				id="outlined-basic"
				label="Last Name"
				variant="outlined"
				onChange={(e) => setLastName(e.target.value)}
				margin="dense"
			/>
			<TextField
				size="small"
				id="outlined-basic"
				label="Email"
				variant="outlined"
				onChange={(e) => setEmail(e.target.value)}
				margin="dense"
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
