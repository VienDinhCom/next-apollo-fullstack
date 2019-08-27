import bcrypt from 'bcrypt';
import { utils } from '~/backend/utils';
import { getRepository } from 'typeorm';
import { Resolvers } from '~/backend/types/graphql';
import { UserEntity, PostEntity } from '~/backend/modules/entities';

export const resolvers: Resolvers = {
  User: {
    posts: async (parent, args) => {
      const pagination = { take: args.take || 10, skip: args.skip || 0 };
      return getRepository(PostEntity).find({ authorId: parent.id, ...pagination });
    }
  },
  Mutation: {
    signUpToGetToken: async (parent, args) => {
      const password = bcrypt.hashSync(args.input.password, bcrypt.genSaltSync(8));
      const user = Object.assign(new UserEntity(), args.input, { password });
      const { id } = await getRepository(UserEntity).save(user);

      return utils.auth.createToken(id);
    },
    signInToGetToken: async (parent, args) => {
      const user = await getRepository(UserEntity).findOne({ username: args.input.username });
      const valid = bcrypt.compareSync(args.input.password, user.password);
      const token = utils.auth.createToken(user.id);

      return valid ? token : null;
    }
  },
  Query: {
    user: async (parent, args) => {
      return getRepository(UserEntity).findOne({ id: args.id });
    }
  }
};
