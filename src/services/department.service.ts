import { DepartmentEntity } from '../models/Department.entity';
import { DepartmentHistoryEntity } from '../models/DepartmentHistory.entity';
import { getRepositories } from '../utils/tools';

export class DepartmentService {
  async getAll() {
    const [departmentRepository] = getRepositories(DepartmentEntity);

    const departments = await departmentRepository.find();

    return departments;
  }

  async getHistory(employeeId: number) {
    const [departmentHistoryRepository] = getRepositories(
      DepartmentHistoryEntity,
    );

    const history = await departmentHistoryRepository.find({
      where: { employee: { id: employeeId } },
      relations: ['department'],
      order: { changedAt: 'DESC' },
    });

    return history;
  }
}
