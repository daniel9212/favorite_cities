'use client';

import { type FormEvent, FormEventHandler, useState } from 'react';
import { HStack, Input, Icon, Button, Table, Stack } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';
import { request } from '@/app/api/base';
import NavButton from '@/app/navigation/nav-button';

interface City {
  id: number;
  name: string;
  country: string;
  latitude: string;
  longitude: string;
}

interface CityResults {
  data: {
    results: City[];
  };
}

const CITIES_PER_SEARCH = 10;

export default function Search() {
  const [selectedCities, setSelectedCities] = useState<City[]>([]);

  const onCitiesSearch = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { 'city-search': citySearch } = Object.fromEntries(
      new FormData(ev.currentTarget),
    ) as Record<'city-search', string>;

    if (citySearch) {
      try {
        const {
          data: { results = [] },
        } = (await request('https://geocoding-api.open-meteo.com/v1/search', {
          params: {
            name: citySearch,
            count: `${CITIES_PER_SEARCH}`,
            language: 'en',
            format: 'json',
          },
          withBaseURL: false,
        })) as CityResults;

        setSelectedCities(
          results.map(({ name, country, latitude, longitude, id }) => ({
            name,
            country,
            latitude,
            longitude,
            id,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Stack
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <HStack as="form" onSubmit={onCitiesSearch as FormEventHandler} w="2/5">
        <Input name="city-search" px="4" />
        <Button type="submit">
          <Icon>
            <IoSearch />
          </Icon>
        </Button>
      </HStack>
      <Table.Root w="3/4" mt="10">
        <Table.Body>
          {selectedCities.map(({ name, country, latitude, longitude, id }) => (
            <Table.Row key={id}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{country}</Table.Cell>
              <Table.Cell textAlign="end">
                <NavButton
                  colorPalette="cyan"
                  text="View"
                  href={{
                    pathname: `/cities/${name}_${country}`,
                    query: { latitude, longitude },
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
}
