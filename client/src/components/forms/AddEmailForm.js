import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EMAIL } from "../../utils/mutations";
import { useToastContext } from "../../utils/contexts/ToastContext";
import closeIcon from "../../images/close.png";

function AddEmailForm({ isOpen, closeForm }) {
	const { configureToast } = useToastContext();

	const [email, setEmail] = useState("");

	const [addEmail, { error }] = useMutation(ADD_EMAIL);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await addEmail({
				variables: { email },
			});

			configureToast(
				"You have been added to our mailing list!",
				"success",
				3000
			);
			closeForm();
			setEmail("");
		} catch (err) {
			console.log(err);
			configureToast("This email is already included in our mailing list.", "failure", 5000);
		}
	};
	if (!isOpen) {
		return "";
	} else {
		return (
			<div className="add-email-container">
				<button className="reset-modal-btn" onClick={closeForm}>
					<img src={closeIcon} alt="close-modal-icon" />
				</button>
				<p className="email-instructions">
					Enter your email below to be notified when I post a new class to the
					schedule!
				</p>
				<form onSubmit={handleSubmit} className="add-email-form">
					<input
						className="outline-input create-class-date"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="login-btn main-btn"
						type="submit"
						value="Join Mailing List"
					/>
				</form>
			</div>
		);
	}
}

export default AddEmailForm;
