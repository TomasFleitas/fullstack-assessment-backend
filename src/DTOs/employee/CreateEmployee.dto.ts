import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsPhoneNumber,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  hireDate: string;

  @IsInt()
  @IsNotEmpty()
  departmentId: number;

  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export const CreateEmployeeSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', example: 'John' },
    lastName: { type: 'string', example: 'Doe' },
    hireDate: { type: 'string', format: 'date', example: '2022-01-01' },
    departmentId: { type: 'integer', example: 1 },
    phone: { type: 'string', example: '+123456789' },
    address: { type: 'string', example: '123 Main St' },
  },
  required: ['firstName', 'lastName', 'hireDate', 'department', 'address'],
};
