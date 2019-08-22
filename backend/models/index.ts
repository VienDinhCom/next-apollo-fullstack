import 'reflect-metadata';
import { createConnection, getConnection, ConnectionOptions } from 'typeorm';
import { User } from './user.model';
import { utils } from '~/backend/utils';

export { User };

const entities = [User];

const options: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: utils.env.get('DB_HOST'),
  port: parseInt(utils.env.get('DB_PORT')),
  username: utils.env.get('DB_USERNAME'),
  password: utils.env.get('DB_PASSWORD'),
  database: utils.env.get('DB_DATABASE'),
  entities,
  synchronize: true,
  logging: false
};

(async () => {
  try {
    const connection = await getConnection(options.name);
    await connection.close();

    await createConnection(options);
  } catch (error) {
    await createConnection(options);
  }

  console.log('Connected the database successfully!');
})();
