import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_HOST = process.env.DATABASE_HOST || '127.0.0.1';
export const DATABASE_PORT = process.env.DATABASE_PORT || 3306;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'root';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
export const DATABASE_NAME = process.env.DATABASE_NAME || '';
export const DATABASE_SYNC = process.env.DATABASE_SYNC === 'true' || false;
export const DATABASE_LOG = process.env.DATABASE_LOG === 'true' || false;
export const isLocalEnv = process.env.ENV === 'local';
export const isDevEnv = process.env.ENV === 'dev';
export const isProdEnv = process.env.ENV === 'prod';
