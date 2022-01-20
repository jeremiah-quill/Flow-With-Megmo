import React, { useEffect, useState } from "react";
// import "./index.css";
import dropin from "braintree-web-drop-in";
// import venmo from 'braintree-web-drop-in';
// import { Button } from "reactstrap";

export default function BraintreeDropIn(props) {
	const tokenizedKey = "sandbox_9qj522s2_ymtkdnwk4zxckp3y";
	const { show, onPaymentCompleted } = props;

	const [braintreeInstance, setBraintreeInstance] = useState(undefined);

	const handleSubmit = (e) => {
		e.preventDefault();
		//
		pay();
	};

	const pay = () => {
		// once braintree instance is set, we get the payment method (from where?) and send it to the back end to complete the transaction
		if (braintreeInstance) {
			braintreeInstance.requestPaymentMethod((error, payload) => {
				if (error) {
					console.error(error);
				} else {
					const payment_method_nonce = payload.nonce;
					// use payment method nonce to send to backend to complete transaction
					fetch("/checkout", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ payment_method_nonce }),
					})
						.then((response) => response.json())
						.then((data) => {
							console.log(data);
						});

					console.log("payment complete! TODO: add form data to database");
					onPaymentCompleted();
				}
			});
		}
	};

	useEffect(() => {
		// TODO: on page load?
		// if show prop is passed in as is true, initialize braintree which calls a create function on the dropin object we import from braintree SDK
		if (show) {
			const initializeBraintree = () =>
				dropin.create(
					{
						// can use tozenized key, or request a key from server using api/secret (gaining some flexibility, unnecessary for our purposes)
						authorization: tokenizedKey,
						// sets order of options
						paymentOptionPriority: ["venmo", "card"],
						container: "#braintree-drop-in-div",
						// by default it shows credit card option.  to add venmo we configure it below.  Requires allowDesktop to be set to true so it shows QR code rather than sending you to venmo.com
						venmo: {
							allowDesktop: true,
						},
					},
					// TODO: what is this doing?
					function (error, instance) {
						if (error) console.error(error);
						else setBraintreeInstance(instance);
					}
				);
			// TODO: what is this doing?
			if (braintreeInstance) {
				braintreeInstance.teardown().then(() => {
					initializeBraintree();
				});
			} else {
				initializeBraintree();
			}
		}
		// TODO: why is this set to [show]?
	}, [show]);

	return (
		<div
			className="braintree-container"
			style={{ display: `${show ? "block" : "none"}` }}
		>
			<form onSubmit={handleSubmit}>
				{/* add onchange listeners to the below inputs to map to state and complete handleSubmit function */}
				<input placeholder="First Name" type="text" />
				<input placeholder="Last Name" type="text" />
				<input placeholder="Email" type="email" />
				<div id={"braintree-drop-in-div"} />

				<input
					className={"braintreePayButton"}
					type="submit"
					disabled={!braintreeInstance}
					// onClick={pay}
					value="Book Class"
				/>
			</form>
		</div>
	);
}
