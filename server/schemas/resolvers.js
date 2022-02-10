const { Teacher, Class, Student } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		teachers: async () => {
			return Teacher.find();
		},
		classes: async () => {
			const classes = Class.find().populate("roster");
			return classes;
		},
		students: async () => {
			return Student.find();
		},
		getStudentById: async (_, { studentId }) => {
			return Student.findOne({ _id: studentId }).populate("registeredClasses");
		},
		getClassById: async (_, { classId }) => {
			return Class.findOne({ _id: classId }).populate("roster");
		},
	},

	Mutation: {
		createStudent: async (_, { username, email, password }) => {
			const student = await Student.create({
				username: username,
				email: email,
				password: password,
			});
			const token = signToken(student);

			return { token, student };
		},
		login: async (_, { email, password }) => {
			const student = await Student.findOne({ email });

			if (!student) {
				throw new AuthenticationError("No student with this email found!");
			}

			const correctPw = await student.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect password!");
			}

			const token = signToken(student);
			return { token, student };
		},

		createClass: async (_, { date, price, zoomId, link }) => {
			return Class.create({
				date: date,
				price: price,
				zoomId: zoomId,
				link: link,
			});
		},
		deleteClass: async (_, { classId }) => {
			return Class.deleteOne({ _id: classId });
		},
		// TODO: test
		addStudentToClass: async (_, { classId, studentId }) => {
			return Class.findOneAndUpdate(
				{ _id: classId },
				{
					$addToSet: {
						roster: studentId,
					},
				}
			);
		},
		addClassToStudent: async (_, { studentId, classId }) => {
			return Student.findOneAndUpdate(
				{ _id: studentId },
				{
					$addToSet: {
						registeredClasses: classId,
					},
				}
			);
		},
	},
};

module.exports = resolvers;
