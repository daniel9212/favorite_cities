import type { LogInPayloadKeys } from '@/app/account/utils';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { CredentialsSignin } from 'next-auth';

import { User } from '@/app/db/entities/user';

class InvalidLoginError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async ({ email, password }) => {
        const invalidCredentialsError = new InvalidLoginError(
          'Invalid Email or Password.',
        );
        const user = await User.findOneBy({ email } as Record<
          LogInPayloadKeys,
          string
        >);

        if (!user) {
          throw invalidCredentialsError;
        }

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password,
        );

        if (!passwordsMatch) {
          throw invalidCredentialsError;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async redirect() {
      return '/';
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
