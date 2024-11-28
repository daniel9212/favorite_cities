import appDataSourceInitialization from '@/app/db/connection';
import { City } from '@/app/db/entities/City';

export const getFavoriteCities = async (userId: string) => {
  const dataSource = await appDataSourceInitialization;

  const favoriteCities = await dataSource
    .getRepository(City)
    .createQueryBuilder('city')
    .innerJoin('city.users', 'user')
    .where('user.id = :userId', { userId })
    .getMany();

  return {
    data: { favoriteCities },
  };
};
