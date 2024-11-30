import Link from 'next/link';
import { Grid, GridItem, Stack, Card } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

import { auth } from '@root/auth';
import NavButton from '@/app/navigation/nav-button';
import FavoriteCitiesCardBody from '@/app/favorites/favorite-cities-card-body';
import { getRandomCities } from '@/app/api/home/action';
import { getFavoriteCities } from '@/app/api/favorites/action';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/account/login');
  }

  const randomCities = await getRandomCities(5, 3);

  const {
    user: { id: userId },
  } = session;

  const {
    data: { favoriteCities },
  } = await getFavoriteCities(userId, {
    limit: 5,
    orderBy: 'RANDOM()',
  });

  return (
    <Grid h="full" templateColumns="repeat(4, 1fr)" gap="6">
      <GridItem colSpan={1} />
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        colSpan={2}
      >
        <Card.Root w="full" h="23.5rem" p="6" variant="subtle">
          <FavoriteCitiesCardBody favoriteCities={favoriteCities} />
        </Card.Root>
        <NavButton
          mt="28"
          fontSize="lg"
          fontWeight="bold"
          p="6"
          bgColor="red.700"
          text="Explore Cities"
          href="/search"
        />
      </GridItem>
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="center"
        colSpan={1}
      >
        <Stack w="full">
          {randomCities.map(({ id, name, country, latitude, longitude }) => (
            <Card.Root key={id}>
              <Link
                href={{
                  pathname: `/cities/${name}`,
                  query: {
                    country,
                    latitude,
                    longitude,
                  },
                }}
              >
                <Card.Body p="4" gap="2">
                  <Card.Title>{name}</Card.Title>
                  <Card.Description>{country}</Card.Description>
                </Card.Body>
              </Link>
            </Card.Root>
          ))}
        </Stack>
      </GridItem>
    </Grid>
  );
}
