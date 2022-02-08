import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


function LoginForm() {
	const [login, { error, data }] = useMutation(LOGIN_USER);

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
			console.error(e);
		  }


		setEmail("");
		setPassword("");
	};

	return (
		<div className="login-form">
			<form onSubmit={handleSubmit}>
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
				<input type="submit" value="Login" />
			</form>
		</div>
	);
}

export default LoginForm;
