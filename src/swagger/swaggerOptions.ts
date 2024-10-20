import { OAS3Options } from 'swagger-jsdoc';
import { CreateEmployeeSchema } from '../DTOs/employee/CreateEmployee.dto';
import { EmployeeSchema } from '../DTOs/employee/Employee.dto';
import { UpdateEmployeeSchema } from '../DTOs/employee/UpdateEmployee.dto';
import { DepartmentSchema } from '../DTOs/department/Department.dto';
import { PORT } from '../utils/const';
import { DepartmentHistorySchema } from '../DTOs/department/DepartmentHistory.dto';
import { UpdateEmployeeDepartmentSchema } from '../DTOs/employee/UpdateEmployeeDepartment.dto';
import { UpdateEmployeeStatusSchema } from '../DTOs/employee/UpdateEmployeeStatus.dto';

export const swaggerOptions: OAS3Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee API',
      version: '1.0.0',
      description: 'API for managing employees and departments',
    },
    components: {
      schemas: {
        // Employee Schemas
        EmployeeSchema,
        CreateEmployeeSchema,
        UpdateEmployeeStatusSchema,
        UpdateEmployeeDepartmentSchema,
        UpdateEmployeeSchema,
        GetEmployeeByIdSchema: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
          },
          required: ['id'],
        },
        DeleteEmployeeSchema: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
          },
          required: ['id'],
        },
        // Departments schemas
        DepartmentSchema,
        DepartmentHistorySchema,
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/**.routes{.ts,.js}'],
};
