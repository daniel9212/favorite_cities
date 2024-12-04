import type { NextRequest } from 'next/server';

import { request } from '@/app/api/base';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const { latitude, longitude } = Object.fromEntries(searchParams.entries());

  const {
    data: { features },
  } = await request('https://api.geoapify.com/v1/geocode/reverse', {
    params: {
      lat: latitude,
      lon: longitude,
      apiKey: process.env.GEOAPIFY_API_KEY as string,
    },
    withBaseURL: false,
  });

  const { city, country, lat, lon } = features[0].properties;

  return new Response(
    JSON.stringify({
      name: city,
      country,
      latitude: lat,
      longitude: lon,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
