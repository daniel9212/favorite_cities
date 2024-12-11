import { Box } from '@chakra-ui/react';

import {
  type SearchParamsProps,
  getCityWeather,
} from '@/app/api/cities/[city]/action';
import { auth } from '@root/auth';
import Header from '@/app/cities/[city]/header';
import ReviewsSC from '@/app/cities/[city]/reviews-sc';
import WeatherCard from '@/app/cities/[city]/weather-card';

interface CityProps {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<SearchParamsProps>;
}

export default async function City({ params, searchParams }: CityProps) {
  const session = await auth();

  const { user: { id: userId } = {} } = session ?? {};

  const { city } = await params;
  const cityName = decodeURI(city);

  const { country, ...coordinates } = await searchParams;

  const cityData = {
    name: cityName,
    country,
    ...coordinates,
  };

  const { data } = await getCityWeather(coordinates);

  const { timezone, ...weatherData } = data;

  return (
    <>
      <Box width="9/12" m="auto" py="10">
        <Header userId={userId} timezone={timezone} cityData={cityData} />
      </Box>
      <WeatherCard weatherData={weatherData} />
      <Box width="9/12" m="auto" mt="10">
        <ReviewsSC user={session?.user} cityData={cityData} />
      </Box>
    </>
  );
}
