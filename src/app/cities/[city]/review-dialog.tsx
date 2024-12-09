'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Button, Textarea, Text } from '@chakra-ui/react';
import type { SessionUser } from '@root/types/next-auth';
import type { ClientCityType } from '@/app/types/city';
import type { ReviewType } from '@/app/types/review';
import type { ReviewWithSanitizedUser } from '@/app/api/cities/[city]/action';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/dialog';

import { createReview } from '@/app/api/cities/[city]/action';

interface ReviewDialogProps {
  cityData: ClientCityType;
  user: SessionUser;
  setReviews: Dispatch<SetStateAction<ReviewWithSanitizedUser[]>>;
}

export default function ReviewDialog({
  cityData,
  user,
  setReviews,
}: ReviewDialogProps) {
  const [open, setOpen] = useState(false);

  const { name: cityName, country } = cityData;
  const cityTitle = `${cityName}, ${country}`;

  const { id: userId, name } = user;
  const createReviewAction = async (formData: FormData) => {
    const reviewData = Object.fromEntries(formData) as unknown as ReviewType;

    // TODO: Validate reviewData and display errors
    try {
      const { data: review } = await createReview(userId, cityData, reviewData);
      setReviews(prevReviews => [...prevReviews, review]);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={e => setOpen(e.open)}
      placement="center"
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add a review</Button>
      </DialogTrigger>

      <DialogContent>
        <form action={createReviewAction}>
          <DialogHeader>
            <DialogTitle textAlign="center">{cityTitle}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text textStyle="xl" fontWeight="bolder" ml="3" mb="3">
              {name}
            </Text>
            <Textarea name="content" placeholder="Write a review..." />
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button type="submit">Post</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
