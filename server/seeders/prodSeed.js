const db = require("../config/connection");
const { Student } = require("../models");
const adminSeed = require("./adminSeed.json");



db.once("open", async () => {
	try {
		await Student.deleteMany({});
		await Student.create(adminSeed);

		console.log("all done!");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});
