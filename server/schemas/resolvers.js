const { Teacher, Class, Student } = require("../models");

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
	},

	Mutation: {
		createClass: async (_, { date, price, zoomId, link }) => {
			return Class.create({
				date: date,
				price: price,
				zoomId: zoomId,
				link: link,
			});
		},
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
