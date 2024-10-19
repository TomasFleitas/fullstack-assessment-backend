import { IsInt } from 'class-validator';

export class UpdateEmployeeDepartmentDto {
  @IsInt()
  departmentId: number;
}

export const UpdateEmployeeDepartmentSchema = {
  type: 'object',
  properties: {
    departmentId: {
      type: 'integer',
      description: 'The ID of the new department',
      example: 2,
    },
  },
  required: ['departmentId'],
};
