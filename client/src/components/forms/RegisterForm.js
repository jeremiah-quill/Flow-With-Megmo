import React, { useState } from "react";
import { zoomJoin } from "../../utils/API";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import '../../styles/JoinClassForm.css'


// TODO: should this component have less logic?
// TODO: validate form on front end
function RegisterForm({ meetingId, isPaymentSuccess, setFormSubmitted }) {

	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			meetingId: meetingId,
		};
		// add student to class
		const response = await zoomJoin(data);
		// TODO: graphQL mutation to add class member in database


		console.log(response);
		console.log(`join class response: ${response}`)
		// TODO: add student to DB if api call was successful
		// navigate("/classes"); // toast to show success
		console.log('successfully joined class')
	};

	// useEffect(() => {
	// 	if (isPaymentSuccess === true) {
	// 		// TODO: validation on handleJoinClass
	// 		handleJoinClass(firstName, lastName, email);
	// 		setFirstName("");
	// 		setLastName("");
	// 		setEmail("");
	// 	}
	// }, [isPaymentSuccess]);

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	setFormSubmitted(true);
	// };

	return (
        // <>
		// 					<p>
		// 						Register for class as {Auth.getStudent().data.email}: <button onClick={handleSubmit}>Register</button>
		// 					</p>
		// 					<p>
		// 						If you are signing up as a different user, logout{" "}
		// 						<button onClick={() => Auth.logout()}> here</button>.
		// 					</p>
		// 				</>



        
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

export default RegisterForm;
