import { getRepository } from 'typeorm';
import { AuthenticationError } from 'apollo-server-micro';
import { PostEntity } from '~/backend/modules/entities';
import { PostResolvers, MutationResolvers, QueryResolvers } from '~/backend/types/graphql';

interface Resolvers {
  Post: PostResolvers;
  Mutation: MutationResolvers;
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Post: {},
  Mutation: {
    createPost: async (parent, { input }, { user }, info) => {
      if (!user) throw new AuthenticationError("You don't have permission to create posts.");

      const post = Object.assign(new PostEntity(), input, { author: user });
      return getRepository(PostEntity).save(post);
    }
  },
  Query: {}
};
