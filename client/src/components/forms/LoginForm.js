import React, { useState } from "react";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

        console.log('successfully logged in!')

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
