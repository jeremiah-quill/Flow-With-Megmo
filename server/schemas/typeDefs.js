const { gql } = require("apollo-server-express");

const typeDefs = gql`
	scalar Date

	type Teacher {
		_id: ID
		username: String!
		password: String!
	}

	type Student {
		_id: ID
		firstName: String!
		lastName: String!
		email: String!
		password: String!
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
		student(studentId: ID!): Student
	}

	type Mutation {

		createStudent(
			firstName: String!
			lastName: String!
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
		
		addStudentToClass(zoomId: String!, studentId: ID!): Student
	}
`;

module.exports = typeDefs;
