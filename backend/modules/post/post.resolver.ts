import { getRepository } from 'typeorm';
import { PostEntity, UserEntity } from '~/backend/modules/entities';
import { PostResolvers, MutationResolvers, QueryResolvers } from '~/backend/types/graphql';

interface Resolvers {
  Post: PostResolvers;
  Mutation: MutationResolvers;
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Post: {},
  Mutation: {
    createPost: async (parent, { input }, { auid }, info) => {
      const post = new PostEntity();

      const author = await getRepository(UserEntity).findOne({ id: auid });

      return getRepository(PostEntity).save({ ...post, ...input, author });
    }
  },
  Query: {}
};
