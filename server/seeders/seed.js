const db = require("../config/connection");
const { Teacher, Class, Student } = require("../models");
const teacherSeeds = require("./teacherSeeds.json");
const classSeeds = require("./classSeeds.json");
const studentSeeds = require("./studentSeeds.json");



db.once("open", async () => {
	try {
		await Teacher.deleteMany({});
		await Teacher.create(teacherSeeds);

    	await Class.deleteMany({});
		await Class.create(classSeeds);

		await Student.deleteMany({});
		await Student.create(studentSeeds);

		console.log("all done!");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});
