import { gql } from 'apollo-server-micro';
import { createModule } from 'apollo-modulizer';
import { UserResolvers, MutationResolvers, QueryResolvers } from '~/backend/types/graphql';

export const typeDef = gql`
  type User {
    id: ID!
    name: String
    posts: [Post]
  }

  input UserInput {
    name: String
  }

  extend type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
  }

  extend type Query {
    user(id: ID!): User
    users: [User]
  }
`;

interface Resolvers {
  User: UserResolvers;
  Mutation: MutationResolvers;
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  User: {
    posts: (parent, args, context, info) => {
      return [{ id: '1', title: 'Test User Posts' }];
    }
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      return context.dataSources.user.createUser(args.input);
    },
    updateUser: (parent, args, context, info) => {
      return context.dataSources.user.updateUser(args.id, args.input);
    }
  },
  Query: {
    user: (parent, args, context, info) => {
      return context.dataSources.user.user(args.id);
    },
    users: (parent, args, context, info) => {
      return context.dataSources.user.users();
    }
  }
};

export default createModule({ typeDef, resolvers });
