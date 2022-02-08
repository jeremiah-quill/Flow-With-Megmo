import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_STUDENT } from "../../utils/mutations";
import Auth from "../../utils/auth";

const SignupForm =() => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [createStudent, { error, data }] = useMutation(CREATE_STUDENT);

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log("successfully signed up!");

		try {
			const { data } = await createStudent({
				variables: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				},
			});

			Auth.login(data.createStudent.token);
		} catch (e) {
			console.error(e);
		}

		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
	};



	return (
		<div className="signup-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					placeholder="First name"
				/>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					placeholder="Last name"
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<input type="submit" value="Signup" />
			</form>
		</div>
	);
}

export default SignupForm;
