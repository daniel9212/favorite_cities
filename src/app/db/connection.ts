import { type DataSourceOptions, DataSource } from 'typeorm';
import { User } from './entities/User';

export const sqliteConnection: DataSourceOptions = {
  type: 'sqlite',
  database: 'favorite_cities_db',
  synchronize: true,
  logging: true,
  entities: [User],
};

const AppDataSource = new DataSource(sqliteConnection);

export default AppDataSource.initialize();
