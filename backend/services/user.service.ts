import { DataSource } from 'apollo-datasource';
import { getRepository } from 'typeorm';
import { User } from '~/backend/models';
import { User as UserType, UserInput } from '~/backend/types/graphql';

export class UserService extends DataSource {
  createUser(input: UserInput): Promise<UserType> {
    const user = new User();
    return getRepository(User).save({ ...user, ...input });
  }

  async updateUser(id: string, input: UserInput): Promise<UserType> {
    const user = await getRepository(User).findOne(id);
    return getRepository(User).save({ ...user, ...input });
  }

  user(id: string): Promise<UserType> {
    return getRepository(User).findOne(id);
  }

  users(): Promise<UserType[]> {
    return getRepository(User).find();
  }
}
