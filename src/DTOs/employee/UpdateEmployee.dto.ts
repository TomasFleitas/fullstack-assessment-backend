import {
  IsString,
  IsOptional,
  IsDateString,
  IsPhoneNumber,
  IsInt,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  hireDate?: string;

  @IsInt()
  @IsOptional()
  departmentId?: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export const UpdateEmployeeSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', example: 'John' },
    lastName: { type: 'string', example: 'Doe' },
    hireDate: { type: 'string', format: 'date', example: '2022-01-01' },
    departmentId: { type: 'integer', example: 1 },
    phone: { type: 'string', example: '+123456789' },
    address: { type: 'string', example: '123 Main St' },
  },
};
