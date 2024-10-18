import { Router } from 'express';
import { DepartmentService } from '../services/department.service';

const DepartmentRoutes = Router();

const departmentService = new DepartmentService();

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
    const departments = await departmentService.getAll();

    res.status(200).json(departments);
  } catch (error: any) {
    res.status(error.status || 400).json({ error: error.message });
  }
});

export default DepartmentRoutes;
