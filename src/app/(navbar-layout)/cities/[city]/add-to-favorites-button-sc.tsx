import type { ClientCityType } from '@/app/types/city';

import { auth } from '@root/auth';
import AddToFavoritesButton from '@/app/(navbar-layout)/cities/[city]/add-to-favorites-button';
import { checkIfFavoriteSelected } from '@/app/api/cities/[city]/action';

export default async function AddToFavoritesButtonSC({
  cityData,
}: {
  cityData: ClientCityType;
}) {
  const session = await auth();

  const { user: { id: userId } = {} } = session ?? {};
  if (!userId) {
    return null;
  }

  let isSelected = false;
  try {
    const { latitude, longitude } = cityData;
    ({
      data: { isSelected },
    } = await checkIfFavoriteSelected({
      userId,
      coordinates: { latitude, longitude },
    }));
  } catch (error) {
    console.error(error);
  }

  return (
    <AddToFavoritesButton
      defaultFavoriteSelected={isSelected}
      cityData={cityData}
      userId={userId}
    />
  );
}
