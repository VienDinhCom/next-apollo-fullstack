import { gql } from 'apollo-server-micro';
import { createModule } from 'apollo-modulizer';
import { QueryResolvers } from '~/backend/types/graphql';

export const typeDef = gql`
  type Query {
    _empty: String
  }
`;

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {}
};

export default createModule({ typeDef, resolvers });
