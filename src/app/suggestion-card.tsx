import type { CityType } from '@/app/types/city';
import Link from 'next/link';
import { Card } from '@chakra-ui/react';

export default function SuggestionCard({
  name,
  country,
  latitude,
  longitude,
}: Omit<CityType, 'id'>) {
  return (
    <Card.Root>
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
  );
}
