import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { EmployeeEntity } from './Employee.entity';
import { DepartmentEntity } from './Department.entity';

@Entity('department_history')
export class DepartmentHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmployeeEntity, employee => employee.departmentHistory, {
    onDelete: 'CASCADE',
  })
  employee: EmployeeEntity;

  @ManyToOne(() => DepartmentEntity)
  department: DepartmentEntity;

  @CreateDateColumn()
  changedAt: Date;
}
