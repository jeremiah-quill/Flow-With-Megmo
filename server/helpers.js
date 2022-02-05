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

module.exports = { getZoomJWT };
