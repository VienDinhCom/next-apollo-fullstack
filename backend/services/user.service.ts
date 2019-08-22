import { DataSource } from 'apollo-datasource';
import { getRepository } from 'typeorm';
import { User as UserModel } from '~/backend/models';
import { User, UserInput } from '~/backend/types/graphql';

export class UserService extends DataSource {
  createUser(input: UserInput): Promise<User> {
    const user = new UserModel();
    return getRepository(UserModel).save({ ...user, ...input });
  }

  async updateUser(id: string, input: UserInput): Promise<User> {
    const user = await getRepository(UserModel).findOne(id);
    return getRepository(UserModel).save({ ...user, ...input });
  }

  user(id: string): Promise<User> {
    return getRepository(UserModel).findOne(id);
  }

  users(): Promise<User[]> {
    return getRepository(UserModel).find();
  }
}
