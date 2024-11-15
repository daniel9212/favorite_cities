'use server';

import type { LogInPayloadKeys } from '@/app/account/utils.ts';
import { signIn } from '@root/auth';
import { generateUserSchema } from '@/app/account/utils.ts';

export const logIn = async (values: Record<LogInPayloadKeys, string>) => {
  const { success } = generateUserSchema('login').safeParse(values);

  if (success) {
    await signIn('credentials', values);
  }
};
