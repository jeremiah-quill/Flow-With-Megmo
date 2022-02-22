import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_STUDENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "../../styles/SignupForm.css";
import emailIcon from "../../images/email.png";
import userIcon from "../../images/user.png";
import lockIcon from "../../images/lock.png";
import { useModalContext } from "../../utils/contexts/ModalContext";
import { useToastContext } from "../../utils/contexts/ToastContext";

const SignupForm = () => {
	const { resetModal } = useModalContext();
	const {configureToast} = useToastContext()

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [createStudent, { error, data }] = useMutation(CREATE_STUDENT);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// resetModal()

		// setTimeout(async () => {

		try {
			const { data, error } = await createStudent({
				variables: {
					username: username,
					email: email,
					password: password,
				},
			});

			console.log(error)

			// if(error) {
			// 	console.log(error)
			// }



			Auth.login(data.createStudent.token);

		} catch (e) {
			// console.log(e)
			console.log(e)
			configureToast(e.message, 'failure', 5000)
			// console.log(e.type)
			// configureToast(e, "failure", 5000);

			// if(e.name === 'ValidationError') {
			// 	console.error(Object.values(e.errors).map(val => val.message))
			// }

			// if(err) {
			// 	if (err.name === 'ValidationError') {
			// 	  console.error(Object.values(err.errors).map(val => val.message))
			// 	}
			//   }
		}

		setUsername("");
		setEmail("");
		setPassword("");
		// }, 600)
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

			<input className="main-btn signup-btn" type="submit" value="Signup" />
		</form>
		// </div>
	);
};

export default SignupForm;
