import type { ReviewsProps } from '@/app/(navbar-layout)/cities/[city]/reviews';

import {
  type ReviewWithSanitizedUser,
  fetchReviews,
} from '@/app/api/cities/[city]/action';
import Reviews from '@/app/(navbar-layout)/cities/[city]/reviews';

export default async function ReviewsSC({
  cityData,
  user,
}: Omit<ReviewsProps, 'defaultReviews'>) {
  let reviews = [] as ReviewWithSanitizedUser[];

  try {
    reviews = await fetchReviews(cityData);
  } catch (error) {
    console.error(error);
  }

  return <Reviews user={user} defaultReviews={reviews} cityData={cityData} />;
}
