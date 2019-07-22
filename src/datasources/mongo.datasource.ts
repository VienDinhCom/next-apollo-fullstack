import { DataSource } from 'apollo-datasource';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new MongoClient(url, { useNewUrlParser: true });

let db: Db;

client
  .connect()
  .then(() => {
    db = client.db(DB_NAME);
  })
  .catch(error => {
    throw error;
  });

export class MongoDataSource extends DataSource {
  db: Db;

  constructor() {
    super();
    this.db = db;
  }
}
