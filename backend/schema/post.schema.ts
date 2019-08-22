import { gql } from 'apollo-server-micro';
import { createModule } from 'apollo-modulizer';
import { PostResolvers, MutationResolvers, QueryResolvers } from '~/backend/types/graphql';

export const typeDef = gql`
  type Post {
    id: ID!
    title: String
    content: String
    author: User
  }

  input PostInput {
    title: String
    content: String
    author: ID
  }

  extend type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
  }

  extend type Query {
    post(id: ID!): Post
    posts: [Post]
  }
`;

interface Resolvers {
  Post: PostResolvers;
  Mutation: MutationResolvers;
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Post: {},
  Mutation: {},
  Query: {}
};

export default createModule({ typeDef, resolvers });
