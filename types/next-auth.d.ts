import { DefaultSession } from 'next-auth';

export interface SessionUser extends DefaultSession['user'] {
  id: string;
  name: string;
}

declare module 'next-auth' {
  interface Session {
    user: SessionUser;
  }
}
