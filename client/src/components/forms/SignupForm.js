import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_STUDENT } from "../../utils/mutations";
import { useToastContext } from "../../utils/contexts/ToastContext";
import Auth from "../../utils/auth";
import emailIcon from "../../images/email.png";
import userIcon from "../../images/user.png";
import lockIcon from "../../images/lock.png";

const SignupForm = () => {
	// global state
	const { configureToast } = useToastContext();

	// local state
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// mutation
	const [createStudent] = useMutation(CREATE_STUDENT);

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
			// console.log(data)
			Auth.login(data.createStudent.token);
		} catch (e) {
			console.log(e);
			configureToast(e.message, "failure", 5000);
		}
		setUsername("");
		setEmail("");
		setPassword("");
	};

	return (
		<form className="signup-form" onSubmit={handleSubmit}>
			<div className="outline-input-container">
				<img className="input-icon" src={userIcon} alt="user-icon"/>
				<input
					className="outline-input border-pink icon-input"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
			</div>
			<div className="outline-input-container">
				<img className="input-icon" src={emailIcon} alt="email-icon"/>
				<input
					className="outline-input border-pink icon-input"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
			</div>
			<div className="outline-input-container">
				<img className="input-icon" src={lockIcon} alt="lock-icon"/>
				<input
					className="outline-input border-pink icon-input"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
			</div>
			<input className="main-btn signup-btn" type="submit" value="Signup" />
		</form>
	);
};

export default SignupForm;
