'use server';

import type { BaseEntity, DataSource, EntityTarget, Repository } from 'typeorm';
import type { CityCoordonates, ClientCityType } from '@/app/types/city';
import type { ReviewType } from '@/app/types/review';
import { request } from '@/app/api/base';
import appDataSourceInitialization from '@/app/db/connection';
import { City } from '@/app/db/entities/city';
import { User } from '@/app/db/entities/user';
import { Review } from '@/app/db/entities/review';

export interface SearchParamsProps extends CityCoordonates {
  country: string;
}

export const getCityWeather = async (searchParams: CityCoordonates) => {
  const { data } = await request('https://api.open-meteo.com/v1/forecast', {
    params: {
      ...searchParams,
      current:
        'temperature_2m,wind_speed_10m,precipitation_probability,apparent_temperature,is_day',
      timezone: 'auto',
    },
    withBaseURL: false,
  });

  return { data };
};

// TODO: Check if TypeORM has a better way of dealing with relations
// TODO: Add indexes on the latitude and longitude columns

export const addCityToFavorites = async (
  userId: string,
  cityData: ClientCityType,
) => {
  const dataSource = await appDataSourceInitialization;

  const cityRepository = dataSource.getRepository(City);
  const city = await findCityByCoords(cityData, cityRepository);

  const userCityRelationQuery = createRelationQuery(dataSource, userId, {
    entity: User,
    relationField: 'favoriteCities',
  });

  if (city) {
    const { users } = city;
    const isUserOwningCity = !!users.find(({ id }) => id === userId);

    if (isUserOwningCity) {
      throw new Error('City is already added to Favorites!');
    }

    await userCityRelationQuery.add(city);
  } else {
    const newCity = cityRepository.create(cityData);
    await cityRepository.save(newCity);
    await userCityRelationQuery.add(newCity);
  }

  return {
    data: { isFavoriteCity: true },
  };
};

export const removeCityFromFavorites = async (
  userId: string,
  cityData: ClientCityType,
) => {
  const dataSource = await appDataSourceInitialization;
  const user = await findUserById(userId, dataSource);

  const cityRepository = dataSource.getRepository(City);
  const city = await findCityByCoords(cityData, cityRepository);

  if (!city) {
    throw new Error('City not found!');
  }

  const { id: cityId, users } = city;
  const isUserOwningCity = !!users.find(({ id }) => id === userId);

  if (!isUserOwningCity) {
    throw new Error('City not found for specific user!');
  }

  const cityUserRelationQuery = createRelationQuery(dataSource, cityId, {
    entity: City,
    relationField: 'users',
  });
  await cityUserRelationQuery.remove(user);

  return {
    data: { isFavoriteCity: false },
  };
};

const findUserById = async (id: string, dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new Error(`User not found!`);
  }

  return user;
};

const findCityByCoords = async (
  { latitude, longitude }: CityCoordonates,
  repository: Repository<City>,
) => {
  const city = await repository
    .createQueryBuilder('city')
    .innerJoinAndSelect('city.users', 'user')
    .where('city.latitude = :latitude AND city.longitude = :longitude', {
      latitude,
      longitude,
    })
    .getOne();

  return city;
};

const createRelationQuery = (
  dataSource: DataSource,
  id: string,
  {
    entity,
    relationField,
  }: {
    entity: EntityTarget<User | City>;
    relationField: string;
  },
) => dataSource.createQueryBuilder().relation(entity, relationField).of(id);

export const checkIfFavoriteSelected = async ({
  userId,
  coordinates,
}: {
  userId: string;
  coordinates: CityCoordonates;
}) => {
  const dataSource = await appDataSourceInitialization;

  const userRepository = dataSource.getRepository(User);
  const userWithFavoriteCities = await userRepository.findOne({
    where: { id: userId },
    relations: ['favoriteCities'],
  });

  if (!userWithFavoriteCities) {
    throw new Error(`User with ID ${userId} not found!`);
  }

  const { latitude, longitude } = coordinates;
  const city = userWithFavoriteCities.favoriteCities.find(
    ({ latitude: currentLatitude, longitude: currentLongitude }) =>
      latitude === currentLatitude && longitude === currentLongitude,
  );

  if (city) {
    return {
      data: { isSelected: true },
    };
  }

  return {
    data: { isSelected: false },
  };
};

export const createReview = async (
  userId: string,
  cityData: ClientCityType,
  reviewData: ReviewType,
) => {
  const dataSource = await appDataSourceInitialization;
  const user = await findUserById(userId, dataSource);

  const { latitude, longitude } = cityData;
  const cityRepository = dataSource.getRepository(City);
  let city = await cityRepository.findOneBy({ latitude, longitude });

  if (!city) {
    city = cityRepository.create(cityData);
    await cityRepository.save(city);
  }

  const reviewRepository = dataSource.getRepository(Review);
  const newReview = reviewRepository.create({
    ...reviewData,
    user: user as User,
    city: city as City,
  });

  const {
    id,
    createdAt,
    content,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: { password, ...restUser },
  } = await reviewRepository.save(newReview);

  return {
    data: { id, createdAt, content, user: restUser },
  };
};

interface ReviewDataWithUser extends ReviewType {
  user: Omit<User, keyof BaseEntity>;
}

export interface ReviewWithSanitizedUser extends ReviewType {
  user: Omit<User, keyof BaseEntity | 'password'>;
}

export const fetchReviews = async (
  cityData: ClientCityType,
): Promise<ReviewWithSanitizedUser[]> => {
  const dataSource = await appDataSourceInitialization;

  const { latitude, longitude } = cityData;
  const reviews = (await dataSource.manager.find('Review', {
    relations: ['user'],
    where: { city: { latitude, longitude } },
  })) as unknown as ReviewDataWithUser[];

  // TODO: Find a better way to exclude password from response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return reviews.map(({ user: { password, ...restUser }, ...restReview }) => ({
    user: restUser,
    ...restReview,
  }));
};

export const deleteReview = async (reviewId: string) => {
  const dataSource = await appDataSourceInitialization;
  const reviewRepository = dataSource.getRepository(Review);
  const review = await reviewRepository.findOneBy({ id: reviewId });

  if (!review) {
    throw new Error('Review cannot be deleted!');
  }

  await reviewRepository.remove(review);
  return {
    data: {
      message: 'Review deleted successfully!',
    },
  };
};
