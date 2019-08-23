import { gql } from 'apollo-server-micro';
import { createModule } from 'apollo-modulizer';
import { UserResolvers, MutationResolvers, QueryResolvers } from '~/backend/types/graphql';

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

interface Resolvers {
  User: UserResolvers;
  Mutation: MutationResolvers;
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  User: {},
  Mutation: {
    signUp: (parent, args, { dataSources }, info) => {
      return dataSources.user.signUp(args);
    },
    signIn: (parent, args, { dataSources }, info) => {
      return dataSources.user.signIn(args);
    }
  },
  Query: {}
};

export default createModule({ typeDef, resolvers });
