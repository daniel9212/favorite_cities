export interface CityCoordonates {
  latitude: string;
  longitude: string;
}

export interface CityType extends CityCoordonates {
  id: string;
  name: string;
  country: string;
}

export type ClientCityType = Omit<CityType, 'id'>;
