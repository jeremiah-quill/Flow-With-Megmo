import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_STUDENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "../../styles/SignupForm.css";
import emailIcon from "../../images/email.png";
import userIcon from "../../images/user.png";
import lockIcon from "../../images/lock.png";
import { useModalContext } from "../../utils/contexts/ModalContext";

const SignupForm = () => {
	const {resetModal} = useModalContext()

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [createStudent, { error, data }] = useMutation(CREATE_STUDENT);

	const handleSubmit = (e) => {
		e.preventDefault();

		resetModal()

		setTimeout(async () => {

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
		}, 600)

	};

	return (
		// <div className="signup-form">
		<form className="signup-form" onSubmit={handleSubmit}>
			<div className="outline-input-container">
				<img className="input-icon" src={userIcon} />
				<input
					className="outline-input border-pink"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
			</div>
			<div className="outline-input-container">
				<img className="input-icon" src={emailIcon} />
				<input
					className="outline-input border-pink"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
			</div>

			<div className="outline-input-container">
				<img className="input-icon" src={lockIcon} />
				<input
					className="outline-input border-pink"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
			</div>

			<input className="btn btn-pink signup-btn" type="submit" value="Signup" />
		</form>
		// </div>
	);
};

export default SignupForm;
