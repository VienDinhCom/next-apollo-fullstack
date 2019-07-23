import { DataSource } from 'apollo-datasource';
import { Db } from 'mongodb';
import { utilities } from '../utilities';

export class MongoDataSource extends DataSource {
  db: Db;

  constructor() {
    super();
    this.db = utilities.mongo.getDb();
  }
}
