import express from 'express';
import { isProdEnv, PORT } from './utils/const';
import { Database } from './models/Database';
import EmployeeRoutes from './routes/employee.routes';
import DepartmentRoutes from './routes/department.routes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swagger/swaggerOptions';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
if (!isProdEnv) {
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// Routes
app.use('/employees', EmployeeRoutes);
app.use('/departments', DepartmentRoutes);

// Default endpoint
app.get('/', (req, res) => {
  res.send('Fullstack-assessment-backend');
});

(async () => {
  try {
    await Database.getInstance().initialize();
    console.log('Database initialized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      !isProdEnv && console.log(`Swagger in: http://localhost:${PORT}/swagger`);
    });
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1);
  }
})();
