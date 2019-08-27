import { getRepository } from 'typeorm';
import { Resolvers } from '~/backend/types/graphql';
import { PostEntity, UserEntity } from '~/backend/modules/entities';

export const resolvers: Resolvers = {
  Post: {
    author: async parent => {
      const { authorId }: any = parent;
      return getRepository(UserEntity).findOne({ id: authorId });
    }
  },
  Mutation: {
    createPost: async (parent, args, context) => {
      if (!context.user) throw new Error("You don't have permission to create posts.");

      const post = Object.assign(new PostEntity(), args.input, { author: context.user });
      return getRepository(PostEntity).save(post);
    },
    updatePost: async (parent, args, context) => {
      const post = await getRepository(PostEntity).findOne({ id: args.id });

      if (!context.user || context.user.id !== post.authorId) {
        throw new Error("You don't have permission to update this post.");
      }

      const updatedPost = Object.assign(post, args.input);
      return getRepository(PostEntity).save(updatedPost);
    },
    deletePost: async (parent, args, context) => {
      const post = await getRepository(PostEntity).findOne({ id: args.id });

      if (!context.user || context.user.id !== post.authorId) {
        throw new Error("You don't have permission to delete this post.");
      }

      const { affected } = await getRepository(PostEntity).delete(post.id);

      return affected > 0;
    }
  },
  Query: {
    post: async (parent, args) => {
      return getRepository(PostEntity).findOne({ id: args.id });
    },
    posts: async (parent, args) => {
      const pagination = { take: args.take || 10, skip: args.skip || 0 };

      return getRepository(PostEntity).find({ ...pagination });
    }
  }
};
