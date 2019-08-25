import bcrypt from 'bcrypt';
import { utils } from '~/backend/utils';
import { getRepository } from 'typeorm';
import { UserEntity, PostEntity } from '~/backend/modules/entities';
import { UserResolvers, MutationResolvers, QueryResolvers } from '~/backend/types/graphql';

interface Resolvers {
  User: UserResolvers;
  Mutation: MutationResolvers;
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  User: {
    posts: async ({ id }, { take, skip }, context, info) => {
      const pagination = { take: take || 10, skip: skip || 0 };
      return getRepository(PostEntity).find({ authorId: id, ...pagination });
    }
  },
  Mutation: {
    signUp: async (parent, { input }, context, info) => {
      const password = bcrypt.hashSync(input.password, bcrypt.genSaltSync(8));
      const user = Object.assign(new UserEntity(), input, { password });
      const { id } = await getRepository(UserEntity).save(user);
      const token = utils.auth.createToken(id);

      return { ...user, id, token };
    },
    signIn: async (parent, { input }, context, info) => {
      const user = await getRepository(UserEntity).findOne({ email: input.email });
      const valid = bcrypt.compareSync(input.password, user.password);
      const token = utils.auth.createToken(user.id);

      return { ...user, token: valid ? token : null };
    }
  },
  Query: {
    user: async (parent, { id }, context, info) => {
      return getRepository(UserEntity).findOne({ id });
    }
  }
};
