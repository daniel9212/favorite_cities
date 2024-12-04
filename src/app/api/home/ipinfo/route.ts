import { request } from '@/app/api/base';

export async function GET() {
  const {
    data: { city, country, loc },
  } = await request('https://ipinfo.io/json', {
    withBaseURL: false,
  });

  const [latitude, longitude] = loc.split(',');

  return new Response(
    JSON.stringify({
      name: city,
      country,
      latitude,
      longitude,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
