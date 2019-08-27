import { DatabaseService } from './db.service';

export interface DataSources {
  db: DatabaseService;
}

export const dataSources = () => ({
  db: new DatabaseService()
});
