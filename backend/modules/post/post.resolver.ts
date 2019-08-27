import { Resolvers } from '~/backend/types/graphql';

export const resolvers: Resolvers = {
  Post: {
    author: async (parent, args, context) => {
      const { getUserRepository } = context.dataSources.db;
      const { authorId }: any = parent;
      return getUserRepository().findOne({ id: authorId });
    }
  },
  Mutation: {
    createPost: async (parent, args, context) => {
      const { getPostRepository, PostEntity } = context.dataSources.db;

      if (!context.user) throw new Error("You don't have permission to create posts.");

      const post = Object.assign(new PostEntity(), args.input, { author: context.user });
      return getPostRepository().save(post);
    },

    updatePost: async (parent, args, context) => {
      const { getPostRepository } = context.dataSources.db;
      const post = await getPostRepository().findOne({ id: args.id });

      if (!context.user || context.user.id !== post.authorId) {
        throw new Error("You don't have permission to update this post.");
      }

      const updatedPost = Object.assign(post, args.input);
      return getPostRepository().save(updatedPost);
    },

    deletePost: async (parent, args, context) => {
      const { getPostRepository } = context.dataSources.db;
      const post = await getPostRepository().findOne({ id: args.id });

      if (!context.user || context.user.id !== post.authorId) {
        throw new Error("You don't have permission to delete this post.");
      }

      const { affected } = await getPostRepository().delete(post.id);

      return affected > 0;
    }
  },
  Query: {
    post: async (parent, args, context) => {
      const { getPostRepository } = context.dataSources.db;
      return getPostRepository().findOne({ id: args.id });
    },

    posts: async (parent, args, context) => {
      const { getPostRepository } = context.dataSources.db;
      const pagination = { take: args.take || 10, skip: args.skip || 0 };

      return getPostRepository().find({ ...pagination });
    }
  }
};
