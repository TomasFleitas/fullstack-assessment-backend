import { Repository } from 'typeorm';
import { Database } from '../models/Database';
import { ValidationError } from 'class-validator';
import { BadRequest } from '../errors';

export const getRepositories = <T extends Array<new () => any>>(
  ...entities: T
): { [K in keyof T]: Repository<InstanceType<T[K]>> } => {
  return entities.map(entity =>
    Database.getInstance().getRepository(entity),
  ) as any;
};

export const flatErrors = (errors: ValidationError[]) => {
  if (errors.length > 0) {
    const errorMessages = errors
      .map(error => (error.constraints ? Object.values(error.constraints) : []))
      .flat();

    throw new BadRequest(errorMessages.join(', '));
  }
};
