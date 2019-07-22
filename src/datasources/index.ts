import { MongoDataSource } from './mongo.datasource';

export interface DataSources {
  mongo: MongoDataSource;
}

export const dataSources = () => ({
  mongo: new MongoDataSource()
});
