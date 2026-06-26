import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

import type { Session } from 'next-auth';
import { auth } from '@/auth';
import { GET } from './route';

const mockAuth = auth as unknown as ReturnType<
  typeof vi.fn<() => Promise<Session | null>>
>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/export/transactions', () => {
  it('returns CSV with Content-Type and Content-Disposition headers', async () => {
    mockAuth.mockResolvedValue({
      user: { id: 'test-user' },
      expires: '2099-01-01T00:00:00Z',
    });

    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('text/csv');
    expect(response.headers.get('Content-Disposition')).toBe(
      'attachment; filename="transactions.csv"',
    );
  });

  it('returns 401 when unauthenticated', async () => {
    mockAuth.mockResolvedValue(null);

    const response = await GET();
    expect(response.status).toBe(401);
  });
});
