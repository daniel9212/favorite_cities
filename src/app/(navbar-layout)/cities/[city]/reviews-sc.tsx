import type { ClientCityType } from '@/app/types/city';
import { auth } from '@root/auth';
import {
  type ReviewWithSanitizedUser,
  fetchReviews,
} from '@/app/api/cities/[city]/action';
import Reviews from '@/app/(navbar-layout)/cities/[city]/reviews';

export default async function ReviewsSC({
  cityData,
}: {
  cityData: ClientCityType;
}) {
  let reviews = [] as ReviewWithSanitizedUser[];
  try {
    reviews = await fetchReviews(cityData);
  } catch (error) {
    console.error(error);
  }

  const session = await auth();
  const { user } = session ?? {};

  return <Reviews user={user} defaultReviews={reviews} cityData={cityData} />;
}
