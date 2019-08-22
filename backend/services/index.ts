import { UserService } from './user.service';

export interface DataSources {
  user: UserService;
}

export const dataSources = () => ({
  user: new UserService()
});
