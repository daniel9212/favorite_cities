import { Suspense } from 'react';
import { Grid, Flex, GridItem } from '@chakra-ui/react';

import Suggestions from '@/app/(navbar-layout)/home/suggestions';
import FavoriteCities from '@/app/(navbar-layout)/home/favorite-cities';

export default async function Home() {
  return (
    <Flex h="full" align="center">
      <Grid width="10/12" templateColumns="1fr auto 1fr" gap="6" m="auto">
        <Suggestions />
        <Suspense fallback={<GridItem key="fallback" />}>
          <FavoriteCities />
        </Suspense>
      </Grid>
    </Flex>
  );
}
