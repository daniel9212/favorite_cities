import type { CityType } from '@/app/types/city';

import { request } from '@/app/api/base';
import { getErrorMessage } from '@/app/utils/error';

interface CityResponse {
  data: CityType[];
  error: string | null;
}

interface CityResults {
  data: {
    results: CityType[];
  };
}

const CITIES_PER_SEARCH = 10;

export const getCities = async (citySearch: string) => {
  const response: CityResponse = {
    data: [],
    error: null,
  };

  if (!citySearch) {
    return response;
  }

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

    response.data = results;
  } catch (error) {
    response.error = getErrorMessage(error);
  }

  return response;
};
