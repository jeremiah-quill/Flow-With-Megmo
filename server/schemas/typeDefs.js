const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Teacher {
    _id: ID
    name: String
    password: String
  }

  type Query {
    teachers: [Teacher]!
  }

`;

module.exports = typeDefs;
