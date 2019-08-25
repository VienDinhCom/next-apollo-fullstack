import { getRepository } from 'typeorm';
import { AuthenticationError } from 'apollo-server-micro';
import { PostEntity } from '~/backend/modules/entities';
import { MutationResolvers, QueryResolvers } from '~/backend/types/graphql';

interface Resolvers {
  Mutation: MutationResolvers;
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    createPost: async (parent, { input }, { user }, info) => {
      if (!user) throw new Error("You don't have permission to create posts.");

      const post = Object.assign(new PostEntity(), input, { author: user });
      return getRepository(PostEntity).save(post);
    },
    updatePost: async (parent, { id, input }, { user }, info) => {
      const post = await getRepository(PostEntity).findOne({ id }, { relations: ['author'] });

      if (!user || user.id !== post.authorId) throw new Error("You don't have permission to update this post.");

      const updatedPost = Object.assign(post, input);
      return getRepository(PostEntity).save(updatedPost);
    },
    deletePost: async (parent, { id }, { user }, info) => {
      const post = await getRepository(PostEntity).findOne({ id }, { relations: ['author'] });

      if (!user || user.id !== post.authorId) throw new Error("You don't have permission to delete this post.");

      const { affected } = await getRepository(PostEntity).delete(post.id);

      return affected > 0;
    }
  },
  Query: {
    post: async (parent, { id }, context, info) => {
      return getRepository(PostEntity).findOne({ where: { id }, relations: ['author'] });
    },
    posts: async (parent, { take, skip }, context, info) => {
      const pagination = { take: take || 10, skip: skip || 0 };

      return getRepository(PostEntity).find({ relations: ['author'], ...pagination });
    }
  }
};
