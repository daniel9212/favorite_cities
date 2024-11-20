import { Box, Card, HStack, Text } from '@chakra-ui/react';

import {
  type SearchParamsProps,
  getCityWeather,
} from '@/app/api/cities/[city]/action';
import weatherDayBg from '@/public/images/weather_day.jpg';
import weatherNightBg from '@/public/images/weather_night.jpg';

interface CityProps {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<SearchParamsProps>;
}

export default async function City({ params, searchParams }: CityProps) {
  const { city } = await params;

  const { data, error } = await getCityWeather(await searchParams);

  if (error) {
    return null;
  }

  const {
    current: {
      temperature_2m,
      wind_speed_10m,
      apparent_temperature,
      precipitation_probability,
      is_day,
    },
    current_units: {
      temperature_2m: temperatureUnit,
      precipitation_probability: precipitationUnit,
      wind_speed_10m: windSpeedUnit,
    },
  } = data;

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card.Root
        minW="6/12"
        variant="elevated"
        bgImage={`url(${(is_day ? weatherDayBg : weatherNightBg).src})`}
        bgSize="cover"
      >
        <Card.Header>
          <Text as="h1" fontWeight="bold" fontSize="4xl">
            {decodeURI(city).replace('_', ', ')}
          </Text>
          <Text>{new Date().toDateString()}</Text>
        </Card.Header>
        <Card.Body textAlign="center">
          <Card.Title fontSize="3xl" pt="4" pb="10">
            Weather Now
          </Card.Title>
          <HStack>
            <Text w="full" fontSize="3xl" fontWeight="bold">
              {`${Math.round(temperature_2m as number)} ${temperatureUnit}`}
            </Text>
            <Box fontWeight="bold" w="full">
              <Text>
                {`Wind speed: ${Math.round(wind_speed_10m as number)} ${windSpeedUnit}`}
              </Text>
              <Text>
                {`Precipitation: ${Math.round(precipitation_probability as number)} ${precipitationUnit}`}
              </Text>
            </Box>
          </HStack>
        </Card.Body>
        <Card.Footer fontWeight="bold" textAlign="center">
          <Text w="full">
            {`Apparent Temperature: ${Math.round(apparent_temperature as number)} ${temperatureUnit}`}
          </Text>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}
