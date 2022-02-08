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
