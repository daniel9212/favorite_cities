import type { CityType } from '@/app/types/city';
import Link from 'next/link';
import { Card, Text } from '@chakra-ui/react';
import { MdFavorite } from 'react-icons/md';

interface CityCardProps {
  cityProps: Omit<CityType, 'id'>;
  isSaved?: boolean;
}

export default function CityCard({
  cityProps: { name, country, latitude, longitude },
  isSaved = false,
}: CityCardProps) {
  return (
    <Card.Root w="48">
      <Card.Body p="2.5" gap="1.5">
        <Card.Title
          {...(isSaved && {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
          fontSize="md"
        >
          <Text
            w={isSaved ? 'calc(100% - 20px)' : 'full'}
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
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
              {name}
            </Link>
          </Text>
          {isSaved && <MdFavorite fill="#ec4899" />}
        </Card.Title>
        <Card.Description>{country}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
