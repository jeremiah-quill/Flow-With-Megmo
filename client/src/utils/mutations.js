import { gql } from "@apollo/client";


export const CREATE_STUDENT = gql`
  mutation createStudent($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createStudent(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      student {
        _id
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      student {
        _id
        email
      }
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
