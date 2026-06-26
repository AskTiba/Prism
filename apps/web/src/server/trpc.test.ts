import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

import type { Session } from 'next-auth';
import { auth } from '@/auth';
import { router, publicProcedure, protectedProcedure } from './trpc';

const mockAuth = auth as unknown as ReturnType<
  typeof vi.fn<() => Promise<Session | null>>
>;

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

describe('createContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates context with no session', async () => {
    mockAuth.mockResolvedValue(null);
    const { createContext } = await import('./trpc');
    const ctx = await createContext();
    expect(ctx.session).toBeNull();
    expect(ctx.prisma).toBeDefined();
  });

  it('creates context with authenticated user', async () => {
    mockAuth.mockResolvedValue({
      user: { id: 'user-1' },
      expires: '2099-01-01T00:00:00Z',
    });
    const { createContext } = await import('./trpc');
    const ctx = await createContext();
    expect(ctx.session).toEqual({
      user: { id: 'user-1' },
      expires: '2099-01-01T00:00:00Z',
    });
  });
});

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
