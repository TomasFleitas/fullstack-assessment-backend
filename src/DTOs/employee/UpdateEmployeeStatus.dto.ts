import { IsString, IsIn, IsEnum } from 'class-validator';
import { EmployeeStatusEnum } from '../../enums/employee.enum';

export class UpdateEmployeeStatusDto {
  @IsEnum(EmployeeStatusEnum)
  status: string;
}

export const UpdateEmployeeStatusSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: [EmployeeStatusEnum.ACTIVE, EmployeeStatusEnum.INACTIVE],
      description: `Status of the employee (${EmployeeStatusEnum.ACTIVE} or ${EmployeeStatusEnum.INACTIVE})`,
      example: EmployeeStatusEnum.ACTIVE,
    },
  },
  required: ['status'],
};
