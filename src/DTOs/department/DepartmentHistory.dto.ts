export const DepartmentHistorySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'Unique identifier for the department history record',
      example: 1,
    },
    employee: {
      $ref: '#/components/schemas/EmployeeSchema',
      description: 'The employee associated with the department history record',
    },
    department: {
      $ref: '#/components/schemas/DepartmentSchema',
      description:
        'The department the employee was in at the time of the change',
    },
    changedAt: {
      type: 'string',
      format: 'date-time',
      description: 'The timestamp when the department change occurred',
      example: '2022-10-16T12:34:56Z',
    },
  },
  required: ['id', 'department', 'changedAt'],
};
