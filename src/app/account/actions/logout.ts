'use server';

import { signOut } from '@root/auth';

export const logout = async () => {
  await signOut();
};
