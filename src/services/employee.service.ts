import { getRepositories } from '../utils/tools';
import { EmployeeEntity } from '../models/Employee.entity';
import { DepartmentEntity } from '../models/Department.entity';
import { DepartmentHistoryEntity } from '../models/DepartmentHistory.entity';
import { CreateEmployeeDto } from '../DTOs/employee/CreateEmployee.dto';
import { BadRequest, NotFound } from '../errors';
import { UpdateEmployeeDto } from '../DTOs/employee/UpdateEmployee.dto';

export class EmployeeService {
  async create(employeeData: CreateEmployeeDto) {
    const [
      employeeRepository,
      departmentRepository,
      departmentHistoryRepository,
    ] = getRepositories(
      EmployeeEntity,
      DepartmentEntity,
      DepartmentHistoryEntity,
    );

    const departmentId = employeeData.departmentId;

    let department;

    if (departmentId) {
      department = await departmentRepository.findOne({
        where: { id: departmentId },
      });
      if (!department) {
        throw new BadRequest('Not Found Department');
      }
    }

    const newEmployee = employeeRepository.create(employeeData);

    await employeeRepository.save({ ...newEmployee, department });

    if (department) {
      const departmentHistory = departmentHistoryRepository.create({
        employee: newEmployee,
        department: department,
      });
      await departmentHistoryRepository.save(departmentHistory);
    }

    return newEmployee;
  }

  async getAll() {
    const [employeeRepository] = getRepositories(EmployeeEntity);
    return await employeeRepository.find({
      relations: { department: true },
    });
  }

  async getById(id: number) {
    const [employeeRepository] = getRepositories(EmployeeEntity);

    const employee = await employeeRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!employee) {
      throw new NotFound('Employee not found');
    }

    return employee;
  }

  async update(id: number, updateEmployee: UpdateEmployeeDto) {
    const [
      employeeRepository,
      departmentRepository,
      departmentHistoryRepository,
    ] = getRepositories(
      EmployeeEntity,
      DepartmentEntity,
      DepartmentHistoryEntity,
    );

    const employee = await employeeRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!employee) {
      throw new NotFound('Employee not found');
    }

    let newDepartment;
    if (updateEmployee.departmentId) {
      newDepartment = await departmentRepository.findOne({
        where: { id: updateEmployee.departmentId },
      });

      if (!newDepartment) {
        throw new NotFound('Department not found');
      }
    }

    const updatedEmployee = employeeRepository.merge(employee, {
      ...updateEmployee,
      department: newDepartment || employee.department,
    });

    if (employee.department?.id !== newDepartment?.id) {
      const departmentHistoryRecord = departmentHistoryRepository.create({
        employee: updatedEmployee,
        department: newDepartment,
      });
      await departmentHistoryRepository.save(departmentHistoryRecord);
    }

    await employeeRepository.save(updatedEmployee);

    return updatedEmployee;
  }

  async deleteEmployee(id: number) {
    const [employeeRepository] = getRepositories(EmployeeEntity);

    const employee = await employeeRepository.findOne({ where: { id } });

    if (!employee) {
      throw new Error('Employee not found');
    }

    await employeeRepository.delete(id);
  }
}
