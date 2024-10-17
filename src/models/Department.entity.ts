import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EmployeeEntity } from './Employee.entity';

@Entity('department')
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => EmployeeEntity, employee => employee.department)
  employees: EmployeeEntity[];
}
