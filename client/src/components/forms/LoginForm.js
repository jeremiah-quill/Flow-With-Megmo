import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import lock from "../../images/lock.png";
import emailIcon from "../../images/email.png";
import { useToastContext } from "../../utils/contexts/ToastContext";
import "../../styles/LoginForm.css";

function LoginForm() {
	const { configureToast } = useToastContext();

	const [login] = useMutation(LOGIN_USER);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await login({
				variables: { email: email, password: password },
			});

			Auth.login(data.login.token);
		} catch (e) {
			configureToast(e.message, "failure", 5000);
		}
		setEmail("");
		setPassword("");
	};

	return (
		<form className="login-form" onSubmit={handleSubmit}>
			<div className="outline-input-container">
				<img className="input-icon" src={emailIcon} />
				<input
					className="outline-input border-pink icon-input"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
			</div>
			<div className="outline-input-container">
				<img className="input-icon" src={lock} />
				<input
					className="outline-input border-pink icon-input"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
			</div>
			<input className="login-btn main-btn" type="submit" value="Login" />
		</form>
	);
}

export default LoginForm;
