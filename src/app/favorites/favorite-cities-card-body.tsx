import { Center, Card, Table } from '@chakra-ui/react';

import NavButton from '@/app/navigation/nav-button';
import { getFavoriteCities } from '@/app/api/favorites/action';

interface FavoriteCitiesCardBodyProps {
  userId: string;
  queryOptions?: {
    limit: number;
    orderBy: string;
  };
}

export default async function FavoriteCitiesCardBody({
  userId,
  queryOptions,
}: FavoriteCitiesCardBodyProps) {
  const {
    data: { favoriteCities },
  } = await getFavoriteCities(userId, queryOptions);

  const hasFavoriteCities = !!favoriteCities.length;
  return (
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
      {!hasFavoriteCities && <Center h="full">Nothing to see here yet!</Center>}
    </Card.Body>
  );
}
