import { Center, Card, Table } from '@chakra-ui/react';

import NavButton from '@/app/navigation/nav-button';
import { getFavoriteCities } from '@/app/api/favorites/action';
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

  const {
    data: { favoriteCities },
  } = await getFavoriteCities(userId);

  const hasFavoriteCities = !!favoriteCities.length;
  return (
    <Center h="full">
      <Card.Root h="50vh" p="6" w="1/2" variant="subtle">
        <Card.Header fontSize="3xl" fontWeight="bold" p="0" pb="6">
          Favorite Cities
        </Card.Header>
        <Card.Body px="0" py="0" overflow="auto">
          {hasFavoriteCities && (
            <Table.Root>
              <Table.Body>
                {favoriteCities.map(
                  ({ id, name, country, latitude, longitude }) => (
                    <Table.Row key={id}>
                      <Table.Cell>{name}</Table.Cell>
                      <Table.Cell>{country}</Table.Cell>
                      <Table.Cell textAlign="end">
                        <NavButton
                          colorPalette="cyan"
                          text="View"
                          href={{
                            pathname: `/cities/${name}`,
                            query: {
                              country,
                              latitude,
                              longitude,
                            },
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ),
                )}
              </Table.Body>
            </Table.Root>
          )}
          {!hasFavoriteCities && (
            <Center h="full">Nothing to see here yet!</Center>
          )}
        </Card.Body>
      </Card.Root>
    </Center>
  );
}
