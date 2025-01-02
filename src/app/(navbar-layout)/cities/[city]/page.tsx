import { Box } from '@chakra-ui/react';

import { type SearchParamsProps } from '@/app/api/cities/[city]/action';
import ReviewsSC from '@/app/(navbar-layout)/cities/[city]/reviews-sc';
import CityDescription from '@/app/(navbar-layout)/cities/city-description';

export interface CityProps {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<SearchParamsProps>;
}

export default async function City({ params, searchParams }: CityProps) {
  const { city } = await params;

  const cityData = {
    name: decodeURI(city),
    ...(await searchParams),
  };
  return (
    <>
      <CityDescription cityData={cityData} />
      <Box width="10/12" m="auto" mt="10">
        <ReviewsSC cityData={cityData} />
      </Box>
    </>
  );
}
