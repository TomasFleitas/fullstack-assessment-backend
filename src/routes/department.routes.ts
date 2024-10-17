import { Router } from 'express';
import { getRepositories } from '../utils/tools';
import { DepartmentEntity } from '../models/Department.entity';

const DepartmentRoutes = Router();

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Retrieve a list of departments
 *     tags:
 *       - Departments
 *     responses:
 *       200:
 *         description: A list of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DepartmentSchema'
 *       400:
 *         description: Error retrieving departments
 */
DepartmentRoutes.get('/', async (req, res) => {
  try {
    const [departmentRepository] = getRepositories(DepartmentEntity);

    const departments = await departmentRepository.find();

    res.status(200).json(departments);
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving departments' });
  }
});

export default DepartmentRoutes;
