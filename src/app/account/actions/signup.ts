'use server';

import bcrypt from 'bcryptjs';
import type { SignUpPayloadKeys } from '@/app/account/utils.ts';
import appDataSourceInitialization from '@/app/db/connection';
import { User } from '@/app/db/entities/User';
import { generateUserSchema } from '@/app/account/utils.ts';

export const signup = async (values: Record<SignUpPayloadKeys, string>) => {
  const { success, data } = generateUserSchema('signup').safeParse(values);

  if (!success) {
    return;
  }

  await appDataSourceInitialization;

  const { name, email, password } = data as Record<SignUpPayloadKeys, string>;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User();

  user.name = name;
  user.email = email;
  user.password = hashedPassword;

  await user.save();
};
