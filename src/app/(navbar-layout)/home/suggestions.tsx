import type { CityType } from '@/app/types/city';
import { Stack } from '@chakra-ui/react';
import { getRandomCities } from '@/app/api/home/action';

import SuggestionCard from '@/app/(navbar-layout)/home/suggestion-card';
import GeolocationCard from '@/app/(navbar-layout)/home/geolocation-card';

export default async function Suggestions() {
  let randomCities = [] as CityType[];

  try {
    randomCities = await getRandomCities(4, 3);
  } catch (error) {
    console.error(error);
  }

  return (
    <Stack w="full">
      <GeolocationCard />
      {randomCities.map(({ id, ...restCityData }) => (
        <SuggestionCard key={id} {...restCityData} />
      ))}
    </Stack>
  );
}
