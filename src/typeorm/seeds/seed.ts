import { Database } from '../../models/Database';
import { DepartmentEntity } from '../../models/Department.entity';
import { getRepositories } from '../../utils/tools';

async function seed() {
  await Database.getInstance().initialize();

  const [departmentRepository] = getRepositories(DepartmentEntity);

  const departments = [
    { name: 'IT' },
    { name: 'HR' },
    { name: 'Finance' },
    { name: 'Marketing' },
    { name: 'Sales' },
    { name: 'Customer Support' },
    { name: 'Research and Development' },
    { name: 'Operations' },
    { name: 'Logistics' },
    { name: 'Legal' },
    { name: 'Procurement' },
    { name: 'Product Management' },
    { name: 'Engineering' },
    { name: 'Design' },
    { name: 'Quality Assurance' },
    { name: 'Public Relations' },
    { name: 'Administration' },
    { name: 'Business Development' },
    { name: 'Compliance' },
    { name: 'Training and Development' },
  ];

  for (const department of departments) {
    const existingDepartment = await departmentRepository.findOne({
      where: { name: department.name },
    });
    if (!existingDepartment) {
      const newDepartment = departmentRepository.create(department);
      await departmentRepository.save(newDepartment);
      console.log(`Created department: ${department.name}`);
    } else {
      console.log(`Department ${department.name} already exists.`);
    }
  }

  await Database.getInstance().destroy();
  console.log('Seeding finished.');
}

seed().catch(err => {
  console.error('Error seeding departments:', err);
});
