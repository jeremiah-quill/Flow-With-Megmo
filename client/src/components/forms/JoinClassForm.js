import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
// Import our search method
import {zoom} from "../../utils/API";
import { useNavigate } from "react-router-dom";

// TODO: should this component have less logic?
// TODO: validate form on front end
function JoinClassForm({
	meetingId,
	isPaymentSuccess,
	setFormSubmitted,
}) {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	// Method to join class and set state
	const joinClass = async (firstName, lastName, email) => {
		const data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			meetingId: meetingId,
		};
		const response = await zoom(data);
		console.log(response);
		navigate("/classes");
	};

	useEffect(() => {
		if (isPaymentSuccess === true) {
			// TODO: validation on joinClass
			joinClass(firstName, lastName, email);
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
