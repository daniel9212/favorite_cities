import { Suspense } from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';

import type { ClientCityType } from '@/app/types/city';
import AddToFavoritesButtonSC from '@/app/(navbar-layout)/cities/[city]/add-to-favorites-button-sc';

interface HeaderProps {
  timezone: string;
  cityData: ClientCityType;
}

export default async function Header({ timezone, cityData }: HeaderProps) {
  const { name, country } = cityData;
  const cityTitle = `${name}, ${country}`;
  return (
    <HStack justifyContent="space-between">
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
      <Suspense fallback={null}>
        <AddToFavoritesButtonSC cityData={cityData} />
      </Suspense>
    </HStack>
  );
}
