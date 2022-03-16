const { Teacher, Class, Student, Email } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		getAllEmails: async () => {
			return await Email.find();
		},

		teachers: async () => {
			return await Teacher.find();
		},
		classes: async () => {
			return await Class.find().populate("roster");
		},
		students: async () => {
			return await Student.find();
		},
		getStudentById: async (_, { studentId }) => {
			return await Student.findOne({ _id: studentId }).populate(
				"registeredClasses"
			);
		},
		getClassById: async (_, { classId }) => {
			return await Class.findOne({ _id: classId }).populate("roster");
		},
		getUpcomingStudentClasses: async (_, { studentId }) => {
			let student = await Student.findOne({ _id: studentId }).populate(
				"registeredClasses"
			);
			// console.log(student)
			let registeredClasses = student.registeredClasses.map(
				(registeredClass) => registeredClass
			);

			let currDate = new Date();
			let filteredClasses = registeredClasses.filter(
				(registeredClass) =>
					new Date(registeredClass.date).getTime() - currDate.getTime() > 0
			);
			return filteredClasses;
		},

		getCompletedStudentClasses: async (_, { studentId }) => {
			let student = await Student.findOne({ _id: studentId }).populate(
				"registeredClasses"
			);
			// console.log(student)
			let registeredClasses = student.registeredClasses.map(
				(registeredClass) => registeredClass
			);

			let currDate = new Date();
			let filteredClasses = registeredClasses.filter(
				(registeredClass) =>
					new Date(registeredClass.date).getTime() - currDate.getTime() < 0
			);
			return filteredClasses;
		},

		getUpcomingClasses: async () => {
			let now = new Date();
			return await Class.find({ date: { $gt: now } }).populate("roster");
		},
		getCompletedClasses: async () => {
			let now = new Date();
			return await Class.find({ date: { $lt: now } }).populate("roster");
		},
	},

	Mutation: {
		toggleEmail: async (_, {studentId, email}) => {
			let emailObjects = await Email.find()

			let emails = emailObjects.map(emailObject => emailObject.email)

			if(emails.indexOf(email) === -1) {
				let newEmail = await Email.create({
					email: email
				})
			} else {
				let removedEmail = await Email.deleteOne({email: email})
			}

			return await Student.findOneAndUpdate({_id: studentId}, [
				{ $set: { isSendNotifications: { $not: "$isSendNotifications" } } }
			  ])
		},


		addEmail: async (_, { email }) => {
			return await Email.create({
				email: email,
			});
		},

		// removeNotifyEmail: async() => {

		// },

		createStudent: async (_, { username, email, password }) => {
			const student = await Student.create({
				username: username,
				email: email,
				password: password,
			});

			const emails = await Email.find();

			if (emails.indexOf(email) === -1) {
				const newEmail = await Email.create({
					email: email,
				});
			}

			const token = signToken(student);

			return { token, student };
		},
		login: async (_, { email, password }) => {
			const student = await Student.findOne({ email });

			if (!student) {
				throw new AuthenticationError("Cannot find email.");
			}

			const correctPw = await student.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect password.");
			}

			const token = signToken(student);
			return { token, student };
		},

		createClass: async (_, { date, price, zoomId, link }) => {
			return await Class.create({
				date: date,
				price: price,
				zoomId: zoomId,
				link: link,
			});
		},
		deleteClass: async (_, { classId }) => {
			let classToDelete = await Class.findOne({ _id: classId }).populate(
				"roster"
			);
			let deleted = await Class.deleteOne({ _id: classId }).populate("roster");
			return classToDelete.roster;
		},

		updateClass: async (_, { classId, newDateTime }) => {
			return await Class.findOneAndUpdate(
				{ _id: classId },
				{
					$set: {
						date: newDateTime,
					},
				}
			).populate("roster");
		},

		addStudentToClass: async (_, { classId, studentId }) => {
			return await Class.findOneAndUpdate(
				{ _id: classId },
				{
					$addToSet: {
						roster: studentId,
					},
				}
			);
		},
		addClassToStudent: async (_, { studentId, classId }) => {
			return await Student.findOneAndUpdate(
				{ _id: studentId },
				{
					$addToSet: {
						registeredClasses: classId,
					},
				}
			).populate("registeredClasses");
		},

		removeFromRoster: async (_, { classId, studentId }) => {
			return await Class.findOneAndUpdate(
				{ _id: classId },
				{
					$pull: {
						roster: studentId,
					},
				}
			);
		},

		removeClassFromStudent: async (_, { studentId, classId }) => {
			return await Student.findOneAndUpdate(
				{ _id: studentId },
				{ $pull: { registeredClasses: classId } }
			).populate("registeredClasses");
		},

		addPlaylist: async (_, { classId, playlistId }) => {
			return await Class.findOneAndUpdate(
				{ _id: classId },
				{
					$set: {
						playlistId: playlistId,
					},
				}
			);
		},
	},
};

module.exports = resolvers;
