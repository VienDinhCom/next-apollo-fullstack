import 'reflect-metadata';
import * as env from './env.util';
import { createConnection, getConnection, ConnectionOptions } from 'typeorm';
import { entities } from '~/backend/modules/entities';

const options: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: env.get('DB_HOST'),
  port: parseInt(env.get('DB_PORT')),
  username: env.get('DB_USERNAME'),
  password: env.get('DB_PASSWORD'),
  database: env.get('DB_DATABASE'),
  entities: entities,
  synchronize: true,
  logging: false
};

export async function init() {
  try {
    const connection = await getConnection(options.name);
    await connection.close();

    await createConnection(options);
  } catch (error) {
    try {
      await createConnection(options);
    } catch (error) {
      console.log(`TypeORM Error: ${error.message}`);
    }
  }
}
