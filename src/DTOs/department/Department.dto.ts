import { IsInt, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { EmployeeDto } from '../employee/Employee.dto';

export class DepartmentDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmployeeDto)
  employees: EmployeeDto[];
}

export const DepartmentSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'Unique identifier for the department',
      example: 1,
    },
    name: {
      type: 'string',
      description: 'Name of the department',
      example: 'Human Resources',
    },
    employees: {
      type: 'array',
      description: 'List of employees in the department',
      items: { $ref: '#/components/schemas/EmployeeSchema' },
    },
  },
  required: ['id', 'name'],
};
