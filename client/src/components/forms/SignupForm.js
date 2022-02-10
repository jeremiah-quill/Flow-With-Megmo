import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_STUDENT } from "../../utils/mutations";
import Auth from "../../utils/auth";

const SignupForm =() => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [createStudent, { error, data }] = useMutation(CREATE_STUDENT);

	const handleSubmit = async (e) => {
		e.preventDefault();


		try {
			const { data } = await createStudent({
				variables: {
					username: username,
					email: email,
					password: password,
				},
			});

			Auth.login(data.createStudent.token);
		} catch (e) {
			console.error(e);
		}

		setUsername("");
		setEmail("");
		setPassword("");
	};



	return (
		<div className="signup-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
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
