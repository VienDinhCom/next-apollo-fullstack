import { gql } from 'apollo-server-micro';

export const typeDef = gql`
  type Post {
    id: ID!
    title: String
    content: String
    author: User
  }

  input PostInput {
    title: String!
    content: String!
  }

  extend type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: String!, input: PostInput): Post
    deletePost(id: String!): Boolean
  }

  extend type Query {
    post(id: String!): Post
    posts(offset: Int, limit: Int): [Post]
  }
`;
