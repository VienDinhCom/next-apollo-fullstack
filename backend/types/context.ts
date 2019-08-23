import { DataSources } from '../services';

export interface Context {
  dataSources: DataSources;
  auid: string;
}
