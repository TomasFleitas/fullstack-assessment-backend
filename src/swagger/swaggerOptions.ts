import { OAS3Options } from 'swagger-jsdoc';
import { CreateEmployeeSchema } from '../DTOs/employee/CreateEmployee.dto';
import { EmployeeSchema } from '../DTOs/employee/Employee.dto';
import { UpdateEmployeeSchema } from '../DTOs/employee/UpdateEmployee.dto';
import { DepartmentSchema } from '../DTOs/department/Department.dto';
import { PORT } from '../utils/const';

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
