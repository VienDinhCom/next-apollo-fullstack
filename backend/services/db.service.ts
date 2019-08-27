import { utils } from '~/backend/utils';
import { getRepository } from 'typeorm';
import { DataSource } from 'apollo-datasource';

import { UserEntity } from '~/backend/modules/user/user.entity';
import { PostEntity } from '~/backend/modules/post/post.entity';

utils.db.init([UserEntity, PostEntity]);

export class DatabaseService extends DataSource {
  UserEntity = UserEntity;
  getUserRepository() {
    return getRepository(UserEntity);
  }

  PostEntity = PostEntity;
  getPostRepository() {
    return getRepository(PostEntity);
  }
}
