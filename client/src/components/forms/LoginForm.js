import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "../../styles/LoginForm.css";
import { useModalContext } from "../../utils/contexts/ModalContext";

function LoginForm() {
	const {resetModal} = useModalContext()

	const [login, { error, data }] = useMutation(LOGIN_USER);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		resetModal()


		setTimeout(async () => {
			try {
				const { data } = await login({
					variables: { email: email, password: password },
				});
	
				Auth.login(data.login.token);
			} catch (e) {
				console.error(e);
			}
	
	
			setEmail("");
			setPassword("");
		},600)


	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<div className="outline-input-container">
				<img className="icon-input" />
				<input
					className="outline-input border-pink"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
			</div>
			<div className="outline-input-container">
				<img className="input-icon" />
				<input
					className="outline-input border-pink"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
			</div>
			<input className="login-btn btn btn-pink" type="submit" value="Login" />
		</form>
	);
}

export default LoginForm;
