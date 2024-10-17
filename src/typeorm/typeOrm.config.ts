import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import 'reflect-metadata';
import {
  DATABASE_HOST,
  DATABASE_LOG,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_SYNC,
  DATABASE_USERNAME,
} from '../utils/const';

export const SQLConnectionOptions = (): DataSourceOptions => {
  config();
  return {
    type: 'mysql',
    synchronize: DATABASE_SYNC,
    entities: [join(__dirname, '/../../**/**.entity{.ts,.js}')],
    migrations: [join(__dirname, '/../../**/**-db{.ts,.js}')],
    logging: DATABASE_LOG,
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  };
};

export default (() => new DataSource(SQLConnectionOptions()))();
