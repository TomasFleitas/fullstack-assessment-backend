import {
  IsInt,
  IsString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { DepartmentDto } from '../department/Department.dto';
import { Type } from 'class-transformer';

export class EmployeeDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  hireDate: string;

  @ValidateNested()
  @Type(() => DepartmentDto)
  department: DepartmentDto;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}

export const EmployeeSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'Unique identifier for the employee',
      example: 1,
    },
    firstName: {
      type: 'string',
      description: 'First name of the employee',
      example: 'John',
    },
    lastName: {
      type: 'string',
      description: 'Last name of the employee',
      example: 'Doe',
    },
    hireDate: {
      type: 'string',
      format: 'date',
      description: 'Hire date of the employee',
      example: '2022-01-01',
    },
    department: {
      $ref: '#/components/schemas/DepartmentSchema',
      description: 'Department of the employee',
    },
    phone: {
      type: 'string',
      description: 'Phone number of the employee',
      example: '+123456789',
    },
    address: {
      type: 'string',
      description: 'Address of the employee',
      example: '123 Main St',
    },
  },
  required: ['id', 'firstName', 'lastName', 'hireDate'],
};
