const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookcount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String!]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
      token: ID!
      user: User
  }

  type Query {
      me: User
      user(username: String!): User
  }

  input createBookInput {
        bookId: String! 
        authors: [String!]
        description: String
        title: String
        image: String
        link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeBook(bookId: String!): User
    saveBook(savedBooks: createBookInput): User
  }
`;

module.exports = typeDefs;
