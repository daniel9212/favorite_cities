import { Center, Card } from '@chakra-ui/react';

import FavoriteCitiesCardBody from '@/app/favorites/favorite-cities-card-body';
import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

export default async function Favorites() {
  const session = await auth();

  if (!session) {
    redirect('/account/login');
  }

  const {
    user: { id: userId },
  } = session;

  return (
    <Center h="full">
      <Card.Root h="50vh" p="6" w="1/2" variant="subtle">
        <Card.Header fontSize="3xl" fontWeight="bold" p="0" pb="6">
          Favorite Cities
        </Card.Header>
        <FavoriteCitiesCardBody userId={userId} />
      </Card.Root>
    </Center>
  );
}
