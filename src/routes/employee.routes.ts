import { Router } from 'express';
import { EmployeeEntity } from '../models/Employee.entity';
import { getRepositories } from '../utils/tools';
import { CreateEmployeeDto } from '../DTOs/employee/CreateEmployee.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateEmployeeDto } from '../DTOs/employee/UpdateEmployee.dto';

const EmployeeRoutes = Router();

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
    const errors = await validate(plainToInstance(CreateEmployeeDto, req.body));

    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }

    const [employeeRepository] = getRepositories(EmployeeEntity);

    const newEmployee = employeeRepository.create(req.body);
    await employeeRepository.save(newEmployee);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: 'Error creating employee' });
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
    const [employeeRepository] = getRepositories(EmployeeEntity);
    const employees = await employeeRepository.find({
      relations: { department: true },
    });
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
    const [employeeRepository] = getRepositories(EmployeeEntity);

    const employee = await employeeRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['department'],
    });

    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

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
    const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);

    const errors = await validate(employeeDto);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }

    const [employeeRepository] = getRepositories(EmployeeEntity);

    const employee = await employeeRepository.findOne({
      where: { id: parseInt(req.params.id) },
    });

    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    employeeRepository.merge(employee, req.body);
    const updatedEmployee = await employeeRepository.save(employee);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: 'Error updating employee' });
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
    const [employeeRepository] = getRepositories(EmployeeEntity);

    const result = await employeeRepository.delete(req.params.id);

    if (result.affected === 0) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting employee' });
  }
});

export default EmployeeRoutes;
