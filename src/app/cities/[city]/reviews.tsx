'use client';

import type { SessionUser } from '@root/types/next-auth';
import { useState } from 'react';
import { Center, Card, Stack } from '@chakra-ui/react';

import type { ClientCityType } from '@/app/types/city';
import { type ReviewWithSanitizedUser } from '@/app/api/cities/[city]/action';
import ReviewDialog from '@/app/cities/[city]/review-dialog';

interface ReviewsProps {
  user: SessionUser;
  defaultReviews: ReviewWithSanitizedUser[];
  cityData: ClientCityType;
}

export default function Reviews({
  defaultReviews,
  user,
  cityData,
}: ReviewsProps) {
  const [reviews, setReviews] =
    useState<ReviewWithSanitizedUser[]>(defaultReviews);

  // TODO: Fix reviews layout
  return (
    <>
      <Center mb="10">
        <ReviewDialog cityData={cityData} user={user} setReviews={setReviews} />
      </Center>
      <Stack>
        {reviews.map(({ id, content, user: { name } }) => {
          return (
            <Card.Root key={id} w="full">
              <Card.Body py="3">
                <Card.Title mb="2">{name}</Card.Title>
                <Card.Description>{content}</Card.Description>
              </Card.Body>
            </Card.Root>
          );
        })}
      </Stack>
    </>
  );
}
