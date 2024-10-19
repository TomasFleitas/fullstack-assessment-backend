import { DataSource } from 'typeorm';
import { SQLConnectionOptions } from '../typeorm/typeOrm.config';

export class Database {
  private static instance: Database;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource(SQLConnectionOptions());
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initialize(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      console.log('Data Source has been initialized');
    }
  }

  public getRepository<T>(entity: { new (): T }) {
    return this.dataSource.getRepository(entity);
  }

  public getDataSource() {
    return this.dataSource;
  }

  public async destroy() {
    await this.dataSource.destroy();
  }
}
