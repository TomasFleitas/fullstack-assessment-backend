import express from 'express';
import { PORT } from './utils/const';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Fullstack-assessment-backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
