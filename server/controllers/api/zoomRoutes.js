const zoomRoutes = require("express").Router();
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");



// get all gifts for testing
zoomRoutes.get("/", (req, res) => {
    console.log('hi')
  res.json('in zoomRoutes root')
});

// Create a new yoga class
zoomRoutes.post("/create-class", (req, res) => {
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
zoomRoutes.patch("/edit-class", (req, res) => {
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
zoomRoutes.delete("/delete-class", (req, res) => {
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
zoomRoutes.post("/join-class", (req, res) => {
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


module.exports = zoomRoutes;