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
	}

	type Mutation {
		newStudent(
			firstName: String!
			lastName: String!
			email: String!
			password: String!
		): Student
		createClass(date: Date!, link: String!, zoomId: String!, price: Float!): Class
		addStudentToClass(zoomId: String!, studentId: ID!): Student
	}
`;

module.exports = typeDefs;
