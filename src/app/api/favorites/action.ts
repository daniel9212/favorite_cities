import appDataSourceInitialization from '@/app/db/connection';
import { City } from '@/app/db/entities/City';

export const getFavoriteCities = async (
  userId: string,
  {
    limit,
    orderBy,
  }: {
    limit?: number;
    orderBy?: string;
  } = {},
) => {
  const dataSource = await appDataSourceInitialization;

  let favoriteCitiesQuery = dataSource
    .getRepository(City)
    .createQueryBuilder('city')
    .innerJoin('city.users', 'user')
    .where('user.id = :userId', { userId });

  if (orderBy) {
    favoriteCitiesQuery = favoriteCitiesQuery.orderBy(orderBy);
  }

  if (limit) {
    favoriteCitiesQuery = favoriteCitiesQuery.limit(limit);
  }

  const favoriteCities = await favoriteCitiesQuery.getMany();

  return {
    data: { favoriteCities },
  };
};
