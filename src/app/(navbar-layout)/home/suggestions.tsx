import type { CityType } from '@/app/types/city';
import { GridItem } from '@chakra-ui/react';
import { getRandomCities } from '@/app/api/home/action';

import NavButton from '@/app/navigation/nav-button';
import CityCard from '@/app/(navbar-layout)/home/city-card';
import GeolocationCard from '@/app/(navbar-layout)/home/geolocation-card';

export default async function Suggestions() {
  let randomCities = [] as CityType[];
  let randomCityIndex = 0;

  try {
    randomCities = await getRandomCities(4, 3);
  } catch (error) {
    console.error(error);
  }

  return suggestionsTemplate.map(({ type, key, props = {} }) => {
    switch (type) {
      case 'empty':
        return <GridItem key={key} />;
      case 'geolocation':
        return (
          <GridItem key={key}>
            <GeolocationCard />
          </GridItem>
        );
      case 'random': {
        const cityProps = randomCities[randomCityIndex];
        randomCityIndex++;

        if (cityProps) {
          return (
            <GridItem key={key} {...props}>
              <CityCard cityProps={cityProps} />
            </GridItem>
          );
        }

        return <GridItem key={key} />;
      }
      case 'explore':
        return (
          <GridItem key={key} {...props}>
            <NavButton
              fontSize="lg"
              fontWeight="bold"
              p="6"
              bgColor="red.700"
              text="Explore"
              href="/search"
            />
          </GridItem>
        );
      default:
        return null;
    }
  });
}

const suggestionsTemplate = [
  {
    type: 'empty',
    key: '0-0',
  },
  {
    type: 'geolocation',
    key: '0-1',
    props: {
      m: 'auto',
    },
  },
  {
    type: 'empty',
    key: '0-2',
  },
  {
    type: 'random',
    key: '1-0',
    props: {},
  },
  {
    type: 'explore',
    key: '1-1->1-4',
    props: {
      m: 'auto',
      rowSpan: 4,
    },
  },
  {
    type: 'random',
    key: '1-2',
    props: {
      ml: 'auto',
    },
  },
  {
    type: 'random',
    key: '2-0',
    props: {
      m: 'auto',
    },
  },
  {
    type: 'random',
    key: '2-2',
    props: {
      m: 'auto',
    },
  },
];
