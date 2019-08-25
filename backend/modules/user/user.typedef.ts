import { gql } from 'apollo-server-micro';

export const typeDef = gql`
  type User {
    id: ID!
    email: String
    posts(take: Int, skip: Int): [Post]
  }

  input UserInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    signUp(input: UserInput): String
    signIn(input: UserInput): String
  }

  extend type Query {
    user(id: ID!): User
  }
`;
