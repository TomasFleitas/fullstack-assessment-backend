import { Router } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateEmployeeDto } from '../DTOs/employee/UpdateEmployee.dto';
import { EmployeeService } from '../services/employee.service';
import { BadRequest } from '../errors';
import { CreateEmployeeDto } from '../DTOs/employee/CreateEmployee.dto';
import { DepartmentService } from '../services/department.service';
import { UpdateEmployeeStatusDto } from '../DTOs/employee/UpdateEmployeeStatus.dto';
import { flatErrors } from '../utils/tools';
import { UpdateEmployeeDepartmentDto } from '../DTOs/employee/UpdateEmployeeDepartment.dto';

const EmployeeRoutes = Router();
const employeeService = new EmployeeService();
const departmentService = new DepartmentService();

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployeeSchema'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeSchema'
 *       400:
 *         description: Invalid input
 */
EmployeeRoutes.post('/', async (req, res) => {
  try {
    const employeDto = plainToInstance(CreateEmployeeDto, req.body);

    flatErrors(await validate(employeDto));

    const newEmployee = await employeeService.create(employeDto);

    res.status(201).json(newEmployee);
  } catch (error: any) {
    res.status(error.status || 400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmployeeSchema'
 */
EmployeeRoutes.get('/', async (req, res) => {
  try {
    const employees = await employeeService.getAll();

    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving employees' });
  }
});

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/GetEmployeeByIdSchema'
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeSchema'
 *       404:
 *         description: Employee not found
 */
EmployeeRoutes.get('/:id', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);

    if (isNaN(employeeId)) {
      throw new BadRequest('Invalid employee ID');
    }

    const employee = await employeeService.getById(employeeId);

    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving employee' });
  }
});

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployeeSchema'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid input or error updating employee
 */
EmployeeRoutes.put('/:id', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);

    if (isNaN(employeeId)) {
      throw new BadRequest('Invalid employee ID');
    }

    const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);

    flatErrors(await validate(employeeDto));

    const updatedEmployee = await employeeService.update(
      employeeId,
      employeeDto,
    );

    res.status(200).json(updatedEmployee);
  } catch (error: any) {
    res.status(error.status || 400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/DeleteEmployeeSchema'
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
EmployeeRoutes.delete('/:id', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);

    if (isNaN(employeeId)) {
      throw new BadRequest('Invalid employee ID');
    }

    await employeeService.deleteEmployee(employeeId);

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error: any) {
    res.status(error.status || 400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /employees/{id}/department-history:
 *   get:
 *     summary: Get department change history for an employee
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DepartmentHistorySchema'
 *       400:
 *         description: Error retrieving department history
 */
EmployeeRoutes.get('/:id/department-history', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);

    if (isNaN(employeeId)) {
      throw new BadRequest('Invalid employee ID');
    }

    const history = await departmentService.getHistory(employeeId);

    res.status(200).json(history);
  } catch (error: any) {
    res.status(error.status || 400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /employees/{id}/department:
 *   patch:
 *     summary: Update the department for an employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateEmployeeDepartmentSchema'
 *     responses:
 *       200:
 *         description: Employee's department updated successfully
 *       400:
 *         description: Invalid input or error updating employee
 *       404:
 *         description: Employee or Department not found
 */
EmployeeRoutes.patch('/:id/department', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);

    if (isNaN(employeeId)) {
      throw new BadRequest('Invalid employee ID');
    }

    const departmentDto = plainToInstance(
      UpdateEmployeeDepartmentDto,
      req.body,
    );

    flatErrors(await validate(departmentDto));

    const updatedEmployee = await employeeService.updateDepartment(
      employeeId,
      departmentDto.departmentId,
    );

    res.status(200).json(updatedEmployee);
  } catch (error: any) {
    res.status(error.status || 400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /employees/{id}/status:
 *   patch:
 *     summary: Update an employee's status (active or inactive)
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployeeStatusSchema'
 *     responses:
 *       200:
 *         description: Employee status updated successfully
 *       400:
 *         description: Invalid input or error updating status
 */
EmployeeRoutes.patch('/:id/status', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.id);

    if (isNaN(employeeId)) {
      throw new BadRequest('Invalid employee ID');
    }

    const statusDto = plainToInstance(UpdateEmployeeStatusDto, req.body);

    flatErrors(await validate(statusDto));

    const updatedEmployee = await employeeService.updateStatus(
      employeeId,
      statusDto.status,
    );
    res.status(200).json(updatedEmployee);
  } catch (error: any) {
    res.status(error.status || 400).json({ error: error.message });
  }
});

export default EmployeeRoutes;
