'use server';

import type { DataSource, EntityTarget, Repository } from 'typeorm';
import { request } from '@/app/api/base';
import appDataSourceInitialization from '@/app/db/connection';
import { City } from '@/app/db/entities/City';
import { User } from '@/app/db/entities/User';

interface CityCoordonates {
  latitude: string;
  longitude: string;
}

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

export interface ToggleFavoriteCity extends SearchParamsProps {
  name: string;
}

// TODO: Check if TypeORM has a better way of dealing with relations
// TODO: Add indexes on the latitude and longitude columns
export const toggleFavoriteCity = async (
  userId: string,
  cityData: ToggleFavoriteCity,
) => {
  const dataSource = await appDataSourceInitialization;

  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error(`User with ID ${userId} not found!`);
  }

  const cityRepository = dataSource.getRepository(City);
  const city = await findCity(cityRepository, cityData);

  const userCityRelationQuery = createRelationQuery(dataSource, userId, {
    entity: User,
    relationField: 'favoriteCities',
  });

  if (city) {
    const { id: cityId, users } = city;
    const isUserOwningCity = !!users.find(({ id }) => id === userId);
    const hasCityOtherOwners = !!users.filter(({ id }) => id !== userId).length;

    if (isUserOwningCity) {
      if (!hasCityOtherOwners) {
        await cityRepository.remove(city);
      } else {
        const cityUserRelationQuery = createRelationQuery(dataSource, cityId, {
          entity: City,
          relationField: 'users',
        });
        await cityUserRelationQuery.remove(user);
      }
      // TODO: Check if this is needed
      await userCityRelationQuery.remove(city);

      return {
        data: { isFavoriteCity: false },
      };
    } else {
      await userCityRelationQuery.add(city);

      return {
        data: { isFavoriteCity: true },
      };
    }
  }

  const newCity = cityRepository.create(cityData);
  await cityRepository.save(newCity);
  await userCityRelationQuery.add(newCity);

  return {
    data: { isFavoriteCity: true },
  };
};

const findCity = async (
  repository: Repository<City>,
  { latitude, longitude }: CityCoordonates,
) => {
  const city = await repository
    .createQueryBuilder('city')
    .innerJoinAndSelect('city.users', 'user')
    .andWhere('city.latitude = :latitude AND city.longitude = :longitude', {
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
