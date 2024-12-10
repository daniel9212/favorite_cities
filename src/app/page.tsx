import { Grid, GridItem, Card } from '@chakra-ui/react';

import { auth } from '@root/auth';
import NavButton from '@/app/navigation/nav-button';
import FavoriteCitiesCardBody from '@/app/favorites/favorite-cities-card-body';
import Suggestions from '@/app/suggestions';

export default async function Home() {
  const session = await auth();

  const { user: { id: userId } = {} } = session ?? {};

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
        {userId && (
          <Card.Root w="full" mb="28" h="23.5rem" p="6" variant="subtle">
            <FavoriteCitiesCardBody
              userId={userId}
              queryOptions={{
                limit: 5,
                orderBy: 'RANDOM()',
              }}
            />
          </Card.Root>
        )}
        <NavButton
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
        <Suggestions />
      </GridItem>
    </Grid>
  );
}
