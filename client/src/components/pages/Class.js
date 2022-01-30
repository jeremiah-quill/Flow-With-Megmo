import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BraintreeDropIn from "../BraintreeDropIn";
import Button from "../Button";
import JoinClassForm from "../forms/JoinClassForm";
import Toast from "../Toast";

function Class() {
	let navigate = useNavigate();

	const [braintreeInstance, setBraintreeInstance] = useState(undefined);
	const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [joinClassSuccess, setJoinClassSuccess] = useState(false);
	// TODO: add a zoom meeting registrant to zoom meeting with this id
	let { id } = useParams();

	const pay = () => {
		// once braintree instance is set, we get the payment method (from where?) and send it to the back end to complete the transaction
		// if (braintreeInstance) {
		braintreeInstance.requestPaymentMethod((error, payload) => {
			if (error) {
				console.error(error);
			} else {
				const payment_method_nonce = payload.nonce;
				// use payment method nonce to send to backend to complete transaction
				fetch("/api/braintree/checkout", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ payment_method_nonce }),
				})
					.then((response) => response.json())
					.then((data) => {
						// TODO: validate before setting this to true
						console.log(data);
						// setFormSubmitted(false)
						setIsPaymentSuccess(true);
					});
			}
		});
		// }
	};

	useEffect(() => {
		if (formSubmitted) {
			pay();
		}
	}, [formSubmitted]);

	return (
		<div className="class absolute">
			<Toast show={joinClassSuccess} message={"Successfully signed up for class!"}/>
			<Button path={"/classes"} />
			<JoinClassForm
				setFormSubmitted={setFormSubmitted}
				isPaymentSuccess={isPaymentSuccess}
				setJoinClassSuccess={setJoinClassSuccess}
				meetingId={id}
			/>
			<BraintreeDropIn
				setFormSubmitted={setFormSubmitted}
				formSubmitted={formSubmitted}
				setIsPaymentSuccess={setIsPaymentSuccess}
				setBraintreeInstance={setBraintreeInstance}
				braintreeInstance={braintreeInstance}
			/>
		</div>
	);
}

export default Class;
