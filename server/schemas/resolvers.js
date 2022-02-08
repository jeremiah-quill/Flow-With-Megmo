const { Teacher, Class, Student } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		teachers: async () => {
			return Teacher.find();
		},
		classes: async () => {
			return Class.find().populate("roster");
		},
		students: async () => {
			return Student.find();
		},
		student: async (_, { studentId }) => {
			return Student.findOne({ _id: studentId });
		  },
	},

	Mutation: {
		createStudent: async (_, { firstName, lastName, email, password }) => {
			const student = await Student.create({ firstName: firstName, lastName: lastName, email: email, password: password });
			const token = signToken(student);
	  
			return { token, student };
		  },
		  login: async (_, { email, password }) => {
			const student = await Student.findOne({ email });
	  
			if (!student) {
			  throw new AuthenticationError('No student with this email found!');
			}
	  
			const correctPw = await student.isCorrectPassword(password);
	  
			if (!correctPw) {
			  throw new AuthenticationError('Incorrect password!');
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
		// TODO: test
		addStudentToClass: async (_, { zoomId, studentId }) => {
			return Class.findOneAndUpdate(
				{ zoomId: zoomId },
				{
					$addToSet: {
						roster: studentId
					},
				}
			);
		},
	},
};

module.exports = resolvers;
