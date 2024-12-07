'use client';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import {
  type ToggleFavoriteCity,
  addCityToFavorites,
  removeCityFromFavorites,
} from '@/app/api/cities/[city]/action';

interface AddToFavoritesButtonProps {
  defaultFavoriteSelected: boolean;
  userId: string;
  cityData: ToggleFavoriteCity;
}

export default function AddToFavoritesButton({
  defaultFavoriteSelected,
  userId,
  cityData,
}: AddToFavoritesButtonProps) {
  const [isSelected, setSelected] = useState(defaultFavoriteSelected);

  const toggleFavoriteCityAction = async () => {
    const toggleFavoriteCity = isSelected
      ? removeCityFromFavorites
      : addCityToFavorites;
    try {
      const {
        data: { isFavoriteCity },
      } = await toggleFavoriteCity(userId, cityData);
      setSelected(isFavoriteCity);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={toggleFavoriteCityAction}>
      <Button
        {...(isSelected && { bg: 'pink.500', color: 'white' })}
        type="submit"
        variant="subtle"
      >
        {isSelected ? 'Added To Favorites' : 'Add To Favorites'}
      </Button>
    </form>
  );
}
