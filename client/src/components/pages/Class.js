import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BraintreeDropIn from "../BraintreeDropIn";
import Button from "../Button";
import JoinClassForm from "../forms/JoinClassForm";
import Toast from "../Toast";

function Class() {
	let { id } = useParams();

	const [braintreeInstance, setBraintreeInstance] = useState(undefined);
	const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const pay = () => {
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
						setIsPaymentSuccess(true);
					});
			}
		});
	};

	useEffect(() => {
		if (formSubmitted) {
			pay();
		}
	}, [formSubmitted]);

		return (
			<div className="class page">
				<div className="page-content">
				{/* <Toast
					show={joinClassSuccess}
					message={"Successfully signed up for class!"}
				/> */}
				<Button path={"/classes"} />
				<JoinClassForm
					setFormSubmitted={setFormSubmitted}
					isPaymentSuccess={isPaymentSuccess}
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
			</div>
		);
}

export default Class;
