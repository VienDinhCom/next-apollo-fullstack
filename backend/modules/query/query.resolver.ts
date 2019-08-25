import { QueryResolvers } from '~/backend/types/graphql';

interface Resolvers {
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Query: {
    _empty: null
  }
};
