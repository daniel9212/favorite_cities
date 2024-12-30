import type { CityType } from '@/app/types/city';

import { request } from '@/app/api/base';

const LETTERS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const generateSearchTerm = (searchTermLen: number) => {
  let search_term = '';

  for (let index = 0; index < searchTermLen; index++) {
    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    search_term += letter;
  }

  return search_term;
};

const generateCityDistribution = (
  cityLists: CityType[][],
  numberOfCities: number,
) => {
  const nonEmptyCityLists = cityLists.filter(list => list.length !== 0);
  let remainingCities = numberOfCities;
  let remainingListsNr = nonEmptyCityLists.length;

  return nonEmptyCityLists
    .map(list => {
      const citiesPerList = Math.ceil(remainingCities / remainingListsNr);
      remainingCities -= citiesPerList;
      remainingListsNr--;

      return list.slice(0, citiesPerList);
    })
    .flat()
    .map(({ name, country, latitude, longitude, id }) => ({
      name,
      country,
      latitude,
      longitude,
      id,
    }));
};

export const getRandomCities = async (
  numberOfCities: number,
  searchTermLen: number,
) => {
  'use cache';
  const cityLists = await Promise.all(
    new Array(numberOfCities).fill(undefined).map(() => {
      return request('https://geocoding-api.open-meteo.com/v1/search', {
        params: {
          name: generateSearchTerm(searchTermLen),
          count: '5',
          language: 'en',
          format: 'json',
        },
        withBaseURL: false,
      }).then(({ data: { results = [] } }) => results);
    }),
  );

  return generateCityDistribution(cityLists, numberOfCities);
};
