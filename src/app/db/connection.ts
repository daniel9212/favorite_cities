import { type DataSourceOptions, DataSource } from 'typeorm';
import { User } from '@/app/db/entities/user';
import { City } from '@/app/db/entities/city';
import { Review } from '@/app/db/entities/review';

export const sqliteConnection: DataSourceOptions = {
  type: 'sqlite',
  database: 'db/favorite_cities',
  synchronize: true,
  logging: false,
  entities: [User, City, Review],
};

const AppDataSource = new DataSource(sqliteConnection);

export default AppDataSource.initialize();
