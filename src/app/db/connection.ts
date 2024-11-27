import { type DataSourceOptions, DataSource } from 'typeorm';
import { User } from './entities/User';
import { City } from './entities/City';

export const sqliteConnection: DataSourceOptions = {
  type: 'sqlite',
  database: 'db/favorite_cities',
  synchronize: true,
  logging: true,
  entities: [User, City],
};

const AppDataSource = new DataSource(sqliteConnection);

export default AppDataSource.initialize();
