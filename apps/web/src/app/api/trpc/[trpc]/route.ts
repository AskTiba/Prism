import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { prisma } from '@repo/db/src/client';
import { appRouter } from '@/server';
import { getToken } from 'next-auth/jwt';

async function handler(req: Request) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
    salt: 'authjs.session-token',
  });

  const session = token?.email
    ? {
        user: { id: token.sub ?? token.email, email: token.email, name: null },
        expires: '',
      }
    : null;

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({ prisma, session }),
  });
}

export { handler as GET, handler as POST };
