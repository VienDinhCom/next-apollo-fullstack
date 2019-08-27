import bcrypt from 'bcrypt';
import { utils } from '~/backend/utils';
import { Resolvers } from '~/backend/types/graphql';

export const resolvers: Resolvers = {
  User: {
    posts: async (parent, args, context) => {
      const { getPostRepository } = context.dataSources.db;
      const pagination = { take: args.take || 10, skip: args.skip || 0 };
      return getPostRepository().find({ authorId: parent.id, ...pagination });
    }
  },
  Mutation: {
    signUpToGetToken: async (parent, args, context) => {
      const { getUserRepository, UserEntity } = context.dataSources.db;
      const password = bcrypt.hashSync(args.input.password, bcrypt.genSaltSync(8));
      const user = Object.assign(new UserEntity(), args.input, { password });
      const { id } = await getUserRepository().save(user);

      return utils.auth.createToken(id);
    },
    signInToGetToken: async (parent, args, context) => {
      const { getUserRepository } = context.dataSources.db;
      const user = await getUserRepository().findOne({ username: args.input.username });
      const valid = bcrypt.compareSync(args.input.password, user.password);
      const token = utils.auth.createToken(user.id);

      return valid ? token : null;
    }
  },
  Query: {
    user: async (parent, args, context) => {
      const { getUserRepository } = context.dataSources.db;
      return getUserRepository().findOne({ id: args.id });
    }
  }
};
