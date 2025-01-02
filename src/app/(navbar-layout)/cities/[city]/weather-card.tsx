import { Box, Card, HStack, Text } from '@chakra-ui/react';

import weatherDayBg from '@/public/images/weather_day.jpg';
import weatherNightBg from '@/public/images/weather_night.jpg';

interface WeatherCardProps {
  weatherData: {
    current: Record<string, number>;
    current_units: Record<string, string>;
  };
}

export default function WeatherCard({
  weatherData: {
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
  },
}: WeatherCardProps) {
  return (
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
  );
}
