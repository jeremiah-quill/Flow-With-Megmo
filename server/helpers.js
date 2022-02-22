const jwt = require("jsonwebtoken");

const getZoomJWT = () => {
	// Get new JWT
	const config = {
		APIKey: process.env.ZOOM_KEY,
		APISecret: process.env.ZOOM_SECRET,
	};
	const payload = {
		iss: config.APIKey,
		exp: new Date().getTime() + 5000,
	};
	return jwt.sign(payload, config.APISecret);
};

const errorFormatter = (e) => {
	let errors = {};

	const allErrors = e.substring(e.indexOf(':') + 1).trim()
	const allErrorsinArrayFormat = allErrors.split(',').map(err => err.trim());
	allErrorsinArrayFormat.forEach(error => {
		const [key, value] = error.split(":").map(err => err.trim())
		errors[key] = value
	})
	return errors
}

module.exports = { getZoomJWT, errorFormatter };
