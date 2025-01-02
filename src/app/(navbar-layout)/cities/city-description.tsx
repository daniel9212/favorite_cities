import type { ClientCityType } from '@/app/types/city';

import { Box } from '@chakra-ui/react';

import { getCityWeather } from '@/app/api/cities/[city]/action';
import Header from '@/app/(navbar-layout)/cities/[city]/header';
import WeatherCard from '@/app/(navbar-layout)/cities/[city]/weather-card';

export default async function CityDescription({
  cityData,
}: {
  cityData: ClientCityType;
}) {
  const { latitude, longitude } = cityData;

  const { data } = await getCityWeather({ latitude, longitude });
  const { timezone, ...weatherData } = data;
  return (
    <>
      <Box width="10/12" m="auto" py="10">
        <Header timezone={timezone} cityData={cityData} />
      </Box>
      <WeatherCard weatherData={weatherData} />
    </>
  );
}
