import { gql } from 'apollo-server-micro';

export const typeDef = gql`
  type User {
    id: ID!
    email: String
    password: String
  }

  type UserToken {
    token: String
  }

  input UserInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    signUp(input: UserInput): UserToken
    signIn(input: UserInput): UserToken
  }
`;
