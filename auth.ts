import type { LogInPayloadKeys } from '@/app/account/utils.ts';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { User } from '@/app/db/entities/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async ({ email, password }) => {
        const user = await User.findOneBy({ email } as Record<
          LogInPayloadKeys,
          string
        >);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error('Invalid credentials.');
        }

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password,
        );
        if (passwordsMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async redirect() {
      return '/';
    },
  },
});
