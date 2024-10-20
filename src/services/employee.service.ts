import { getRandomAvatar, getRepositories } from '../utils/tools';
import { EmployeeEntity } from '../models/Employee.entity';
import { DepartmentEntity } from '../models/Department.entity';
import { DepartmentHistoryEntity } from '../models/DepartmentHistory.entity';
import { CreateEmployeeDto } from '../DTOs/employee/CreateEmployee.dto';
import { BadRequest, NotFound } from '../errors';
import { UpdateEmployeeDto } from '../DTOs/employee/UpdateEmployee.dto';
import { Database } from '../models/Database';

export class EmployeeService {
  async create(employeeData: CreateEmployeeDto) {
    const dataSource = Database.getInstance().getDataSource();

    return await dataSource.transaction(async transaction => {
      const employeeRepository = transaction.getRepository(EmployeeEntity);
      const departmentRepository = transaction.getRepository(DepartmentEntity);
      const departmentHistoryRepository = transaction.getRepository(
        DepartmentHistoryEntity,
      );

      const departmentId = employeeData.departmentId;

      let department;

      if (departmentId) {
        department = await departmentRepository.findOne({
          where: { id: departmentId },
        });

        if (!department) {
          throw new BadRequest('Department not found');
        }
      }

      const newEmployee = employeeRepository.create(employeeData);

      if (department) {
        newEmployee.department = department;
      }

      const { id, gender } = getRandomAvatar();
      newEmployee.photoUrl = `https://getrandomavatar-krlj4alcwa-uc.a.run.app/getRandomAvatar?gender=${gender}&id=${id}`;

      await employeeRepository.save(newEmployee);

      if (department) {
        const departmentHistory = departmentHistoryRepository.create({
          employee: newEmployee,
          department,
        });
        await departmentHistoryRepository.save(departmentHistory);
      }

      return newEmployee;
    });
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
      relations: { department: true },
    });

    if (!employee) {
      throw new NotFound('Employee not found');
    }

    return employee;
  }

  async update(id: number, updateEmployee: UpdateEmployeeDto) {
    const dataSource = Database.getInstance().getDataSource();

    return await dataSource.transaction(async transaction => {
      const employeeRepository = transaction.getRepository(EmployeeEntity);
      const departmentRepository = transaction.getRepository(DepartmentEntity);
      const departmentHistoryRepository = transaction.getRepository(
        DepartmentHistoryEntity,
      );

      const employee = await this.getById(id);

      let newDepartment;
      if (
        updateEmployee.departmentId &&
        employee.department?.id !== updateEmployee?.departmentId
      ) {
        newDepartment = await departmentRepository.findOne({
          where: { id: updateEmployee.departmentId },
        });

        if (!newDepartment) {
          throw new NotFound('Department not found');
        }

        const departmentHistoryRecord = departmentHistoryRepository.create({
          employee: employee,
          department: newDepartment,
        });
        await departmentHistoryRepository.save(departmentHistoryRecord);
      }

      const updatedEmployee = employeeRepository.merge(employee, {
        ...updateEmployee,
        department: newDepartment || employee.department,
      });

      await employeeRepository.save(updatedEmployee);
      return updatedEmployee;
    });
  }

  async deleteEmployee(id: number) {
    const [employeeRepository] = getRepositories(EmployeeEntity);

    const employee = await employeeRepository.findOne({ where: { id } });

    if (!employee) {
      throw new Error('Employee not found');
    }

    await employeeRepository.delete(id);
  }

  async updateDepartment(employeeId: number, departmentId: number) {
    const dataSource = Database.getInstance().getDataSource();

    return await dataSource.transaction(async transaction => {
      const employeeRepository = transaction.getRepository(EmployeeEntity);
      const departmentRepository = transaction.getRepository(DepartmentEntity);
      const departmentHistoryRepository = transaction.getRepository(
        DepartmentHistoryEntity,
      );

      const employee = await this.getById(employeeId);

      const newDepartment = await departmentRepository.findOne({
        where: { id: departmentId },
      });

      if (!newDepartment) {
        throw new NotFound('Department not found');
      }

      if (employee.department?.id !== newDepartment.id) {
        employee.department = newDepartment;

        const departmentHistory = departmentHistoryRepository.create({
          employee: employee,
          department: newDepartment,
        });
        await departmentHistoryRepository.save(departmentHistory);
      }

      await employeeRepository.save(employee);

      return employee;
    });
  }

  async updateStatus(id: number, status: string) {
    const [employeeRepository] = getRepositories(EmployeeEntity);

    const employee = await this.getById(id);

    employee.status = status;
    await employeeRepository.save(employee);

    return employee;
  }
}
