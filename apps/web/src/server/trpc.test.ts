import { describe, it, expect } from 'vitest';
import { router, publicProcedure, protectedProcedure } from './trpc';

type MockSession = { user: { id: string }; expires: string };

function setupRouter(session: MockSession | null) {
  return {
    router: router({
      publicPing: publicProcedure.query(() => 'pong'),
      protectedPing: protectedProcedure.query(() => 'secret'),
    }),
    session,
  };
}

describe('publicProcedure', () => {
  it('works without session', async () => {
    const { router: r, session } = setupRouter(null);
    const caller = r.createCaller({ session, prisma: {} as any });
    const result = await caller.publicPing();
    expect(result).toBe('pong');
  });
});

describe('protectedProcedure', () => {
  it('rejects unauthenticated requests', async () => {
    const { router: r, session } = setupRouter(null);
    const caller = r.createCaller({ session, prisma: {} as any });
    await expect(caller.protectedPing()).rejects.toThrow('UNAUTHORIZED');
  });

  it('allows authenticated requests', async () => {
    const { router: r, session } = setupRouter({
      user: { id: 'user-1' },
      expires: '2099-01-01T00:00:00Z',
    });
    const caller = r.createCaller({ session, prisma: {} as any });
    const result = await caller.protectedPing();
    expect(result).toBe('secret');
  });
});
