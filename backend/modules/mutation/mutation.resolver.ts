import { MutationResolvers } from '~/backend/types/graphql';

interface Resolvers {
  Mutation: MutationResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    _empty: () => null
  }
};
