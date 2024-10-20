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

export const getRandomAvatar = (gender?: 'female' | 'male') => {
  const femaleCount = 61;
  const maleCount = 63;

  if (gender === 'female') {
    return {
      id: Math.floor(Math.random() * femaleCount) + 1,
      gender: 'female',
    };
  } else if (gender === 'male') {
    return {
      id: Math.floor(Math.random() * maleCount) + 1,
      gender: 'male',
    };
  } else {
    const randomGender = Math.random() < 0.5 ? 'female' : 'male';
    if (randomGender === 'female') {
      return {
        id: Math.floor(Math.random() * femaleCount) + 1,
        gender: 'female',
      };
    } else {
      return {
        id: Math.floor(Math.random() * maleCount) + 1,
        gender: 'male',
      };
    }
  }
};
