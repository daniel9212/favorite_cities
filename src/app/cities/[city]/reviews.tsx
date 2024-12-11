'use client';

import type { SessionUser } from '@root/types/next-auth';
import { useState } from 'react';
import { Center, Card, Stack, Button, Box } from '@chakra-ui/react';

import type { ClientCityType } from '@/app/types/city';
import {
  type ReviewWithSanitizedUser,
  deleteReview,
} from '@/app/api/cities/[city]/action';
import ReviewDialog from '@/app/cities/[city]/review-dialog';

export interface ReviewsProps {
  user?: SessionUser;
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

  const { id: currentUserId } = user ?? {};

  const createDeleteReviewHandler = (reviewId: string) => async () => {
    try {
      await deleteReview(reviewId);
      setReviews(prevReviews =>
        prevReviews.filter(({ id }) => id !== reviewId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: Fix reviews layout
  return (
    <>
      {user && (
        <Center mb="10">
          <ReviewDialog
            cityData={cityData}
            user={user}
            setReviews={setReviews}
          />
        </Center>
      )}
      <Stack>
        {reviews.map(({ id, content, user: { name, id: userId } }) => {
          const isCurrentUserOwner = currentUserId === userId;
          return (
            <Card.Root key={id} w="full">
              <Card.Body
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
                py="3"
              >
                <Box w="1/2">
                  <Card.Title mb="2">{name}</Card.Title>
                  <Card.Description>{content}</Card.Description>
                </Box>
                {isCurrentUserOwner && (
                  <Button onClick={createDeleteReviewHandler(id)} bg="red">
                    Delete
                  </Button>
                )}
              </Card.Body>
            </Card.Root>
          );
        })}
      </Stack>
    </>
  );
}
