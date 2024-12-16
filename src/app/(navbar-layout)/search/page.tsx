'use client';

import type { CityType } from '@/app/types/city';

import { getCities } from '@/app/(navbar-layout)/search/action';
import { type FormEvent, FormEventHandler, useState } from 'react';
import { HStack, Input, Icon, Button, Table, Stack } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';
import NavButton from '@/app/navigation/nav-button';

export default function Search() {
  const [selectedCities, setSelectedCities] = useState<CityType[]>([]);

  const onCitiesSearch = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { 'city-search': citySearch } = Object.fromEntries(
      new FormData(ev.currentTarget),
    ) as Record<'city-search', string>;

    const { error, data } = await getCities(citySearch);

    if (!error) {
      setSelectedCities(
        data.map(({ name, country, latitude, longitude, id }) => ({
          name,
          country,
          latitude,
          longitude,
          id,
        })),
      );
    }
  };

  return (
    <Stack
      height="100%"
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
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
}
