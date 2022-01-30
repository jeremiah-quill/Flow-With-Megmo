import React, { useEffect } from "react";
import dropin from "braintree-web-drop-in";

// TODO: validation
export default function BraintreeDropIn({
	setBraintreeInstance,
	braintreeInstance,
}) {
	// TODO: do I need to put this on the backend?
	const tokenizedKey = "sandbox_9qj522s2_ymtkdnwk4zxckp3y";

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

	return <div className="braintree-container"></div>;
}
