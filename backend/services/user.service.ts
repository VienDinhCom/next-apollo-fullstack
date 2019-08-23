import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DataSource } from 'apollo-datasource';
import { utils } from '~/backend/utils';
import { getRepository } from 'typeorm';
import { User as UserModel } from '~/backend/models';
import { UserToken, MutationSignUpArgs, MutationSignInArgs } from '~/backend/types/graphql';

export class UserService extends DataSource {
  async signUp({ input }: MutationSignUpArgs): Promise<UserToken> {
    const user = new UserModel();
    const password = bcrypt.hashSync(input.password, bcrypt.genSaltSync(8));

    const { id } = await getRepository(UserModel).save({ ...user, ...input, password });
    const token = jwt.sign({ id }, utils.env.get('JWT_SECRET'), { expiresIn: '30d' });

    return { token };
  }

  async signIn({ input }: MutationSignInArgs): Promise<UserToken> {
    const { id, password } = await getRepository(UserModel).findOne({ email: input.email });

    const valid = bcrypt.compareSync(input.password, password);
    const token = jwt.sign({ id }, utils.env.get('JWT_SECRET'), { expiresIn: '30d' });

    return { token: valid ? token : null };
  }
}
