import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dropin from "braintree-web-drop-in";
import TextField from "@mui/material/TextField";

// TODO: separate form and have it be a parent component to braintree
export default function BraintreeDropIn() {

	let navigate = useNavigate();

	// Form data
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	// meetingId used for testing
	const meetingId = "86339621811";

	// TODO: do I need to put this on the backend?
	const tokenizedKey = "sandbox_9qj522s2_ymtkdnwk4zxckp3y";

	const [braintreeInstance, setBraintreeInstance] = useState(undefined);

	const handleSubmit = (e) => {
		e.preventDefault();
		pay();
		joinClass(firstName, lastName, email, meetingId);
		setFirstName("");
		setLastName("");
		setEmail("");
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
					navigate("/classes");
					// onPaymentCompleted();
				}
			});
		}
	};

	useEffect(() => {
		// TODO: on page load?
		// if show prop is passed in as is true, initialize braintree which calls a create function on the dropin object we import from braintree SDK
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
	}, []);

	const joinClass = (firstName, lastName, email, meetingId) => {
		const registrantDetails = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			meetingId: meetingId,
		};

		// Send post request to express server with data from form
		fetch("/api/join-class", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registrantDetails),
		})
			.then((response) => response.json())
			.then((data) => {
				// TODO: Get back meeting details to add to state/re-render UI
				console.log(data);
			});
	};
	// *** Use this to redirect back to classes page after signed up?
	// if (navigate) {
	// 	return <Navigate to="/classes" />;
	// }
	return (
		<div className="braintree-container">
			<form
				className="registrant-form"
				onSubmit={handleSubmit}
				autoComplete="off"
			>
				<input autoComplete="false" type="hidden" />
				<TextField
					style={{
						color: "white",
					}}
					sx={{ input: { color: "white" } }}
					size="small"
					id="outlined-basic"
					label="First Name"
					variant="outlined"
					onChange={(e) => setFirstName(e.target.value)}
					margin="dense"
				/>
				<TextField
					size="small"
					id="outlined-basic"
					label="Last Name"
					variant="outlined"
					onChange={(e) => setLastName(e.target.value)}
					margin="dense"
				/>
				<TextField
					size="small"
					id="outlined-basic"
					label="Email"
					variant="outlined"
					onChange={(e) => setEmail(e.target.value)}
					margin="dense"
				/>
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
