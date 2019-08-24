import bcrypt from 'bcrypt';
import { utils } from '~/backend/utils';
import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserResolvers, MutationResolvers, QueryResolvers } from '~/backend/types/graphql';

interface Resolvers {
  User: UserResolvers;
  Mutation: MutationResolvers;
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  User: {},
  Mutation: {
    signUp: async (parent, { input }, context, info) => {
      const user = new UserEntity();
      const password = bcrypt.hashSync(input.password, bcrypt.genSaltSync(8));
      const { id } = await getRepository(UserEntity).save({ ...user, ...input, password });
      const token = utils.auth.createToken(id);

      return { token };
    },
    signIn: async (parent, { input }, context, info) => {
      const { id, password } = await getRepository(UserEntity).findOne({ email: input.email });
      const valid = bcrypt.compareSync(input.password, password);
      const token = utils.auth.createToken(id);

      return { token: valid ? token : null };
    }
  },
  Query: {}
};
