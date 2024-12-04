'use client';

import type { City } from '@/app/types/cities';
import type { SetStateAction, Dispatch, MutableRefObject } from 'react';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Stack, Card } from '@chakra-ui/react';

import { request } from '@/app/api/base';

interface SuggestionsProps {
  randomCities: City[];
}

export default function Suggestions({ randomCities }: SuggestionsProps) {
  const [suggestions, setSuggestions] = useState<City[]>(randomCities);

  const isLocationFetchedRef = useRef(
    !!suggestions.find(({ id }) => id === 'current-location'),
  );

  useEffect(() => {
    if ('geolocation' in navigator) {
      const createGeolocationCb = createGeolocationCbFromState(
        isLocationFetchedRef,
        setSuggestions,
      );
      const successPositionCb =
        createGeolocationCb<GeolocationPosition>(fetchGeoapifyData);
      const errorPositionCb =
        createGeolocationCb<GeolocationPositionError>(fetchIpinfoData);

      navigator.geolocation.getCurrentPosition(
        successPositionCb,
        errorPositionCb,
      );
    } else {
      console.error('Geolocation is not available!');
    }
  }, []);

  return (
    <Stack w="full">
      {suggestions.map(({ id, name, country, latitude, longitude }) => (
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
  );
}

const fetchGeoapifyData = (coords: GeolocationPosition) => {
  const {
    coords: { latitude, longitude },
  } = coords;

  return request('/api/home/geoapify', {
    params: {
      latitude: `${latitude}`,
      longitude: `${longitude}`,
    },
  });
};

const fetchIpinfoData = () => request('/api/home/ipinfo');

const createGeolocationCbFromState =
  (
    isLocationFetchedRef: MutableRefObject<boolean>,
    setSuggestions: Dispatch<SetStateAction<City[]>>,
  ) =>
  <T,>(fetchData: (arg: T) => Promise<{ data: City }>) =>
  async (arg: Parameters<typeof fetchData>[0]) => {
    if (isLocationFetchedRef.current) {
      return;
    }

    isLocationFetchedRef.current = true;
    try {
      const { data } = await fetchData(arg);

      setSuggestions(prevSuggestions => [
        { ...data, id: 'current-location' },
        ...prevSuggestions,
      ]);
    } catch (error) {
      console.error(error);
    }
  };
