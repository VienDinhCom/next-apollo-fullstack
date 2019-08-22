import { gql } from 'apollo-server-micro';
import { createModule } from 'apollo-modulizer';
import { MutationResolvers } from '~/backend/types/graphql';

export const typeDef = gql`
  type Mutation {
    _empty: String
  }
`;

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {}
};

export default createModule({ typeDef, resolvers });
