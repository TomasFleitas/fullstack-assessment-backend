1. Clone the repository

2. Navigate to the project folder and install dependencies:
   ```bash
   npm i
   ```

3. Create a `.env` file in the root folder and add the following:
   ```env
   PORT=3000
   DATABASE_USERNAME=root
   DATABASE_PASSWORD=123
   DATABASE_NAME=number8
   ENV=local
   ```

4. Start the database using Docker Compose:
   ```bash
   docker-compose up -d
   ```

5. Run the database migrations:
   ```bash
   npm run migrate:run
   ```

6. Seed the database with sample departments:
   ```bash
   npm run seed
   ```

7. Start the development server:
   ```bash
   npm run dev
   ```

8. You can access the API documentation via Swagger at: [http://localhost:3000/swagger](http://localhost:3000/swagger).
