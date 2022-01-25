const express = require("express");
const fetch = require("node-fetch");
const app = express();
const jwt = require("jsonwebtoken");
const braintree = require("braintree");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const gateway = new braintree.BraintreeGateway({
	environment: braintree.Environment.Sandbox,
	merchantId: "ymtkdnwk4zxckp3y",
	publicKey: "yxrbz56q2p2fdrny",
	privateKey: "226d49d29c0a7bfa800fb1af34e48e8e",
});

app.post("/checkout", (req, res) => {
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
            if(err) {
                console.log(err)
                res.json(err)
            }else {
                console.log(result)
                res.json(result)
            }
		}
	);
});

// Create a new yoga class
app.post("/api", (req, res) => {
	// Get new JWT
	const config = {
		APIKey: process.env.ZOOM_KEY,
		APISecret: process.env.ZOOM_SECRET,
	};
	const payload = {
		iss: config.APIKey,
		exp: new Date().getTime() + 5000,
	};
	const token = jwt.sign(payload, config.APISecret);

	// Create new zoom meeting
	fetch("https://api.zoom.us/v2/users/me/meetings", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(req.body),
	})
		.then((response) => response.json())
		.then((data) => {
			// TODO: Extract necessary meeting details, add to database, and send meeting details to front end to display to admin
			res.json(data);
		});
});

// Add a meeting registrant
app.post("/api/join-class", (req, res) => {
	// Get new JWT
	const config = {
		APIKey: process.env.ZOOM_KEY,
		APISecret: process.env.ZOOM_SECRET,
	};
	const payload = {
		iss: config.APIKey,
		exp: new Date().getTime() + 5000,
	};
	const token = jwt.sign(payload, config.APISecret);

	console.log(req.body)

	// const data = JSON.stringify(req.body)

	const registrantData = {
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		email: req.body.email,
	}

	const meetingId = req.body.meetingId

	// add registrant
	fetch(`https://api.zoom.us/v2/meetings/${meetingId}/registrants`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(registrantData),
	})
		.then((response) => response.json())
		.then((data) => {
			
			// TODO: validate success, confirm success with user
			res.json(data);
		});
});




app.listen(3001, () => {
	console.log("listening on port 3001");
});
