import { gql } from "@apollo/client";

export const NEW_STUDENT = gql`
	mutation newStudent(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
	) {
		newStudent(
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
		) {
			Student
		}
	}
`;

export const CREATE_CLASS = gql`
	mutation createClass($dateStamp: Date!, $link: String!, $zoomId: String!, $price: Float!) {
		createClass(date: $dateStamp, link: $link, zoomId: $zoomId, price: $price) {
			_id
			date
			link
			zoomId
			price
		}
	}
`;

export const ADD_TO_ROSTER = gql`
	mutation addStudentToClass($zoomId: String!, $studentId: ID!) {
		addStudentToClass(
			zoomId: $zoomId
			studentId: $studentId
		) {
			Student {
				email
			}
		}
	}
`;
