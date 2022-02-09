import { gql } from '@apollo/client';

export const QUERY_TEACHERS = gql`
  query allTeachers {
    teachers {
      username
      password
    }
  }
`;

export const QUERY_CLASSES = gql`
  query allClasses {
    classes {
      _id
      date
      price
      playlistId
      zoomId
      roster {
        firstName
        lastName
        email
      }
    }
  }
`;

export const QUERY_SINGLE_CLASS = gql`
  query getClassById ($classId: ID!){
    getClassById (classId: $classId){
      _id
      date
      price
      playlistId
      zoomId
      roster {
        firstName
        lastName
        email
      }
    }
  }
`;

export const QUERY_SINGLE_STUDENT = gql`
  query getStudentById ($studentId: ID!){
    getStudentById (studentId: $studentId){
      _id
      firstName
      registeredClasses {
        _id
        date
        playlistId
      }
    }
  }
`;
