import { GridItem } from '@chakra-ui/react';

import { auth } from '@root/auth';
import { getFavoriteCities } from '@/app/api/favorites/action';
import CityCard from '@/app/(navbar-layout)/home/city-card';

export default async function FavoriteCities() {
  const session = await auth();

  const { user: { id: userId } = {} } = session ?? {};

  if (!userId) {
    return null;
  }

  let favoriteCityIndex = 0;
  const {
    data: { favoriteCities },
  } = await getFavoriteCities(userId, {
    limit: 5,
    orderBy: 'RANDOM()',
  });

  return favoriteCitiesTemplate.map(({ type, key, props = {} }) => {
    switch (type) {
      case 'empty':
        return <GridItem key={key} />;
      case 'favorite': {
        const cityProps = favoriteCities[favoriteCityIndex];
        favoriteCityIndex++;

        if (cityProps) {
          return (
            <GridItem key={key} {...props}>
              <CityCard cityProps={cityProps} isSaved />
            </GridItem>
          );
        }

        return <GridItem key={key} />;
      }
      default:
        return null;
    }
  });
}

const favoriteCitiesTemplate = [
  {
    type: 'favorite',
    key: '3-0',
    props: {
      ml: 'auto',
    },
  },
  {
    type: 'favorite',
    key: '3-2',
    props: {},
  },
  {
    type: 'favorite',
    key: '4-0',
    props: {
      m: 'auto',
    },
  },
  {
    type: 'favorite',
    key: '4-2',
    props: {
      m: 'auto',
    },
  },
  {
    type: 'empty',
    key: '5-0',
  },
  {
    type: 'favorite',
    key: '5-1',
    props: {
      m: 'auto',
    },
  },
  {
    type: 'empty',
    key: '5-2',
  },
];
