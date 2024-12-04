'use server';

import type { LogInPayloadKeys } from '@/app/account/utils';
import { signIn } from '@root/auth';
import { generateUserSchema } from '@/app/account/utils';
import appDataSourceInitialization from '@/app/db/connection';

export const logIn = async (values: Record<LogInPayloadKeys, string>) => {
  generateUserSchema('login').parse(values);

  await appDataSourceInitialization;
  await signIn('credentials', values);
};
