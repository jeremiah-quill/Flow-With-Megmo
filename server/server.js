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

// Edit an existing yoga class
app.patch("/api/edit-class", (req, res) => {
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

	const updatedClassData = {
		start_time: req.body.start_time,
	};

	const meetingId = req.body.meetingId;

	// Edit a zoom meeting
	fetch(`https://api.zoom.us/v2/meetings/${meetingId}?start_time`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(updatedClassData),
	}).then((response) => {
		// TODO: what is this response, why can't I access the "Symbol(Rsponse internals) where the status code is?"  It prints "Symbol(Response internals)" which ontains status in this server console.log, but not the console.log clientside
		console.log(response);

		// TODO: if status is 204, it was successful...kind of, there is NO validation for the date and time, it just sends it through.  need to validate everything on front end)
		let status = response[Object.getOwnPropertySymbols(response)[1]].status;
		console.log(status);

		res.json(response);
	});
});

// Delete a class
app.delete("/api/delete-class", (req, res) => {
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

	const meetingId = req.body.meetingId;

	// Edit a zoom meeting
	fetch(
		`https://api.zoom.us/v2/meetings/${meetingId}?cancel_meeting_reminder=true`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		}
	).then((response) => {
		// TODO: what is this response, why can't I access the "Symbol(Rsponse internals) where the status code is?"  It prints "Symbol(Response internals)" which ontains status in this server console.log, but not the console.log clientside
		console.log(response);

		// TODO: if status is 204, it was successful...kind of, there is NO validation for the date and time, it just sends it through.  need to validate everything on front end)
		let status = response[Object.getOwnPropertySymbols(response)[1]].status;
		console.log(status);

		res.json(status);
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

	console.log(req.body);

	// const data = JSON.stringify(req.body)

	const registrantData = {
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		email: req.body.email,
	};

	const meetingId = req.body.meetingId;

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
			console.log(data);
			// TODO: validate success, confirm success with user
			res.json(data);
		});
});

app.listen(3001, () => {
	console.log("listening on port 3001");
});
