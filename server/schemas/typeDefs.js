const { gql } = require("apollo-server-express");

const typeDefs = gql`
	scalar Date

	type Teacher {
		_id: ID
		username: String!
		password: String!
	}

	type Student {
		isAdmin: Boolean
		_id: ID
		username: String!
		email: String!
		password: String!
		registeredClasses: [Class]
		isSendNotifications: Boolean
	}

	type Email {
		_id: ID!
		email: String!
	}

	type Auth {
		token: ID!
		student: Student
	}

	type Class {
		_id: ID
		date: Date!
		link: String!
		price: Float!
		playlistId: String
		zoomId: String!
		roster: [Student]
	}

	type Query {
		teachers: [Teacher]!
		classes: [Class]!
		students: [Student]!
		getStudentById(studentId: ID!): Student
		getClassById(classId: ID!): Class
		getUpcomingStudentClasses(studentId: ID!): [Class]
		getCompletedStudentClasses(studentId: ID!): [Class]
		getUpcomingClasses: [Class]
		getCompletedClasses: [Class]
		getAllEmails: [Email]
	}

	type Mutation {

		toggleEmail(studentId: ID!, email: String!): Student

		createStudent(
			username: String!
			email: String!
			password: String!
		): Auth

		login(email: String!, password: String!): Auth

		createClass(
			date: Date!
			link: String!
			zoomId: String!
			price: Float!
		): Class

		addEmail(email: String!): Email

		deleteClass(classId: ID!): [Student]

		updateClass(classId: ID!, newDateTime: Date!): Class

		
		addStudentToClass(classId: ID!, studentId: ID!): Class

		addClassToStudent(studentId: ID!, classId: ID!): Student

		removeFromRoster(classId: ID!, studentId: ID!): Class

		removeClassFromStudent(studentId: ID!, classId: ID!): Student

		addPlaylist(classId: ID!, playlistId: String!): Class

	}
`;

module.exports = typeDefs;


