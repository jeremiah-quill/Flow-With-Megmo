const zoomRoutes = require("express").Router();
const fetch = require("node-fetch");
const { getZoomJWT } = require("../../helpers.js");

// Create a new yoga class
zoomRoutes.post("/create-class", async (req, res) => {
	const token = await getZoomJWT();

	// Create new zoom meeting
	fetch("https://api.zoom.us/v2/users/me/meetings", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(req.body),
	})
	// TODO: check status here?
		.then((response) => response.json())
		.then((data) => {
			// TODO: Extract necessary meeting details, add to database, and send meeting details to front end to display to admin
			res.json(data);
		}).catch(e => {
			console.log(e)
			res.json(e)
		})
});

// Edit an existing yoga class
zoomRoutes.post("/edit-class", (req, res) => {
	const token = getZoomJWT();

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
zoomRoutes.post("/delete-class", (req, res) => {
	const token = getZoomJWT();

	const meetingId = req.body.meetingId;

	// Delete a zoom meeting
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
	const token = getZoomJWT();

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
