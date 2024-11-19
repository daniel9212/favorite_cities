'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import type { SignUpPayloadKeys } from '@/app/account/utils.ts';
import appDataSourceInitialization from '@/app/db/connection';
import { User } from '@/app/db/entities/User';
import { generateUserSchema } from '@/app/account/utils.ts';

export const signUp = async (values: Record<SignUpPayloadKeys, string>) => {
  generateUserSchema('signup').parse(values);

  await appDataSourceInitialization;

  const { name, email, password } = values;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User();

  user.name = name;
  user.email = email;
  user.password = hashedPassword;

  await user.save();

  return redirect('/account/login');
};
