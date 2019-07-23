import { MongoDataSource } from './mongo.datasource';
import { SpaceXDataSource } from './spacex.datasouce';

export interface DataSources {
  mongo: MongoDataSource;
  spacex: SpaceXDataSource;
}

export const dataSources = () => ({
  mongo: new MongoDataSource(),
  spacex: new SpaceXDataSource()
});
