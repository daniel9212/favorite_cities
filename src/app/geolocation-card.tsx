'use client';

import type { SetStateAction, Dispatch, MutableRefObject } from 'react';
import { useState, useEffect, useRef } from 'react';

import type { CityType } from '@/app/types/city';
import { request } from '@/app/api/base';
import SuggestionCard from '@/app/suggestion-card';

export default function GeolocationCard() {
  const [locationData, setLocationData] = useState<CityType>(null!);

  const isLocationFetchedRef = useRef(locationData?.id === 'current-location');

  useEffect(() => {
    if ('geolocation' in navigator) {
      const createGeolocationCb = createGeolocationCbFromState(
        isLocationFetchedRef,
        setLocationData,
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

  if (!locationData) {
    return null;
  }

  return <SuggestionCard {...locationData} />;
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
    setLocationData: Dispatch<SetStateAction<CityType>>,
  ) =>
  <T,>(fetchData: (arg: T) => Promise<{ data: CityType }>) =>
  async (arg: Parameters<typeof fetchData>[0]) => {
    if (isLocationFetchedRef.current) {
      return;
    }

    isLocationFetchedRef.current = true;
    try {
      const { data } = await fetchData(arg);

      setLocationData({
        ...data,
        id: 'current-location',
      });
    } catch (error) {
      console.error(error);
    }
  };
