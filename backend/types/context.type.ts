import { DataSources } from '~/backend/services';
import { UserEntity } from '~/backend/modules/user/user.entity';

export interface Context {
  user: UserEntity;
  dataSources: DataSources;
}
