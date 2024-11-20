import { request } from '@/app/api/base';
import { getErrorMessage } from '@/app/utils/error';

export interface SearchParamsProps {
  latitude: string;
  longitude: string;
}

interface CityWeatherResponse {
  data:
    | {
        current: Record<string, string | number>;
        current_units: Record<string, string>;
      }
    | Record<string, never>;
  error: string | null;
}

export const getCityWeather = async (searchParams: SearchParamsProps) => {
  const response: CityWeatherResponse = {
    data: {},
    error: null,
  };

  try {
    const { data } = await request('https://api.open-meteo.com/v1/forecast', {
      params: {
        ...searchParams,
        current:
          'temperature_2m,wind_speed_10m,precipitation_probability,apparent_temperature,is_day',
      },
      withBaseURL: false,
    });

    response.data = data;
  } catch (error) {
    response.error = getErrorMessage(error);
  }

  return response;
};
