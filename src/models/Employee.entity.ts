import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DepartmentEntity } from './Department.entity';
import { DepartmentHistoryEntity } from './DepartmentHistory.entity';
import { EmployeeStatusEnum } from '../enums/employee.enum';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'date' })
  hireDate: Date;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({
    type: 'enum',
    enum: EmployeeStatusEnum,
    default: EmployeeStatusEnum.ACTIVE,
  })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @ManyToOne(() => DepartmentEntity, department => department.employees)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @OneToMany(
    () => DepartmentHistoryEntity,
    departmentHistory => departmentHistory.employee,
  )
  departmentHistory: DepartmentHistoryEntity[];
}
