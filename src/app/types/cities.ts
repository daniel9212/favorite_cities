export interface CityCoordonates {
  latitude: string;
  longitude: string;
}

export interface City extends CityCoordonates {
  id: string;
  name: string;
  country: string;
}
