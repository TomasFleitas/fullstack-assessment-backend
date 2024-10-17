import { Repository } from 'typeorm';
import { Database } from '../models/Database';

export const getRepositories = <T extends Array<new () => any>>(
  ...entities: T
): { [K in keyof T]: Repository<InstanceType<T[K]>> } => {
  return entities.map(entity =>
    Database.getInstance().getRepository(entity),
  ) as any;
};
