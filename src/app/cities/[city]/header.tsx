import { Box, HStack, Text } from '@chakra-ui/react';

import type { ClientCityType } from '@/app/types/city';
import { checkIfFavoriteSelected } from '@/app/api/cities/[city]/action';
import AddToFavoritesButton from '@/app/cities/add-to-favorites-button';

interface HeaderProps {
  userId?: string;
  cityData: ClientCityType;
  timezone: string;
}

export default async function Header({
  userId,
  timezone,
  cityData,
}: HeaderProps) {
  const { name, country, ...coordinates } = cityData;

  let isSelected = false;

  try {
    if (userId) {
      ({
        data: { isSelected },
      } = await checkIfFavoriteSelected({ userId, coordinates }));
    }
  } catch (error) {
    console.error(error);
  }

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
      {userId && (
        <AddToFavoritesButton
          defaultFavoriteSelected={isSelected}
          userId={userId}
          cityData={cityData}
        />
      )}
    </HStack>
  );
}
