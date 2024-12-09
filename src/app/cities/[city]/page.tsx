import { Box, Card, HStack, Text } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

import {
  type SearchParamsProps,
  type ReviewWithSanitizedUser,
  getCityWeather,
  checkIfFavoriteSelected,
  fetchReviews,
} from '@/app/api/cities/[city]/action';
import weatherDayBg from '@/public/images/weather_day.jpg';
import weatherNightBg from '@/public/images/weather_night.jpg';
import { auth } from '@root/auth';
import AddToFavoritesButton from '@/app/cities/add-to-favorites-button';
import Reviews from '@/app/cities/[city]/reviews';

interface CityProps {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<SearchParamsProps>;
}

export default async function City({ params, searchParams }: CityProps) {
  const session = await auth();

  if (!session) {
    redirect('/account/login');
  }

  const {
    user: { id: userId },
  } = session;

  const { city } = await params;
  const cityName = decodeURI(city);

  const { country, ...coordinates } = await searchParams;

  const cityData = {
    name: cityName,
    country,
    ...coordinates,
  };

  let isSelected = false;
  try {
    ({
      data: { isSelected },
    } = await checkIfFavoriteSelected({ userId, coordinates }));
  } catch (error) {
    console.error(error);
  }

  let reviews = [] as ReviewWithSanitizedUser[];
  try {
    reviews = await fetchReviews(cityData);
  } catch (error) {
    console.error(error);
  }

  const { data } = await getCityWeather(coordinates);

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
    timezone,
  } = data;

  const cityTitle = `${cityName}, ${country}`;
  return (
    <>
      <HStack width="9/12" m="auto" py="10" justifyContent="space-between">
        <Box>
          <Text as="h1" fontWeight="bold" fontSize="4xl">
            {cityTitle}
          </Text>
          <Text>
            {new Date().toLocaleString([], {
              timeZone: timezone,
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </Box>
        <AddToFavoritesButton
          defaultFavoriteSelected={isSelected}
          userId={userId}
          cityData={cityData}
        />
      </HStack>
      <Box
        bgImage={`url(${(is_day ? weatherDayBg : weatherNightBg).src})`}
        bgSize="cover"
      >
        <Card.Root
          width="9/12"
          variant="subtle"
          bg="transparent"
          m="auto"
          color="white"
        >
          <Card.Header textAlign="center" fontWeight="bold" fontSize="3xl">
            Weather Now
          </Card.Header>
          <Card.Body textAlign="center">
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
      <Box width="9/12" m="auto" mt="10">
        <Reviews
          user={session.user}
          defaultReviews={reviews}
          cityData={cityData}
        />
      </Box>
    </>
  );
}
