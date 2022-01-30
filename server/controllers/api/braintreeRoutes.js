const braintreeRoutes = require("express").Router();
const braintree = require("braintree");
const gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: "ymtkdnwk4zxckp3y",
	publicKey: "yxrbz56q2p2fdrny",
	privateKey: "226d49d29c0a7bfa800fb1af34e48e8e",
});


braintreeRoutes.post("/checkout", (req, res) => {
	// below is per braintree docs
	const nonceFromTheClient = req.body.payment_method_nonce;
	gateway.transaction.sale(
		{
			amount: "10.00",
			paymentMethodNonce: nonceFromTheClient,
			// TODO: what does this do?
			// deviceData: deviceDataFromTheClient,
			options: {
				submitForSettlement: true,
			},
		},
		(err, result) => {
			if (err) {
				console.log(err);
				res.json(err);
			} else {
				console.log(result);
				res.json(result);
			}
		}
	);
});






module.exports = braintreeRoutes;