import bcrypt from 'bcrypt';
import { utils } from '~/backend/utils';
import { getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { MutationResolvers, QueryResolvers } from '~/backend/types/graphql';

interface Resolvers {
  Mutation: MutationResolvers;
  Query: QueryResolvers;
}

export const resolvers: Resolvers = {
  Mutation: {
    signUp: async (parent, { input }, context, info) => {
      const password = bcrypt.hashSync(input.password, bcrypt.genSaltSync(8));
      const user = Object.assign(new UserEntity(), input, { password });
      const { id } = await getRepository(UserEntity).save(user);
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
