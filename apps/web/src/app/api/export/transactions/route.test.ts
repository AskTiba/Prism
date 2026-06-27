import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('@repo/db/src/client', () => ({
  prisma: {
    transaction: {
      findMany: vi.fn(),
    },
  },
}));

import type { Session } from 'next-auth';
import { auth } from '@/auth';
import { GET } from './route';

const mockAuth = auth as unknown as ReturnType<
  typeof vi.fn<() => Promise<Session | null>>
>;

const { prisma } = await import('@repo/db/src/client');
const mockPrisma = prisma as unknown as {
  transaction: {
    findMany: ReturnType<typeof vi.fn>;
  };
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/export/transactions', () => {
  it('returns CSV with Content-Type and Content-Disposition headers', async () => {
    mockAuth.mockResolvedValue({
      user: { id: 'test-user' },
      expires: '2099-01-01T00:00:00Z',
    });
    mockPrisma.transaction.findMany.mockResolvedValue([
      {
        id: '1',
        name: 'Coffee',
        amount: -5,
        date: new Date('2024-08-19'),
        category: 'Dining Out',
        recurring: false,
        tags: ['morning', 'quick'],
        subtype: 'Discretionary',
      },
    ]);

    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('text/csv');
    expect(response.headers.get('Content-Disposition')).toBe(
      'attachment; filename="transactions.csv"',
    );
  });

  it('returns CSV with transaction data', async () => {
    mockAuth.mockResolvedValue({
      user: { id: 'test-user' },
      expires: '2099-01-01T00:00:00Z',
    });
    mockPrisma.transaction.findMany.mockResolvedValue([
      {
        id: '1',
        name: 'Coffee',
        amount: -5,
        date: new Date('2024-08-19'),
        category: 'Dining Out',
        recurring: false,
        tags: ['morning', 'quick'],
        subtype: 'Discretionary',
      },
      {
        id: '2',
        name: 'Salary',
        amount: 3000,
        date: new Date('2024-08-01'),
        category: 'Income',
        recurring: true,
        tags: [],
        subtype: 'Income',
      },
    ]);

    const response = await GET();
    const text = await response.text();
    const lines = text.trim().split('\n');
    expect(lines[0]).toBe('Date,Name,Category,Amount,Recurring,Tags,Subtype');
    expect(lines[1]).toContain('Coffee');
    expect(lines[1]).toContain('-5');
    expect(lines[1]).toContain('morning;quick');
    expect(lines[2]).toContain('Salary');
    expect(lines[2]).toContain('3000');
    expect(lines[2]).toContain('true');
  });

  it('returns 401 when unauthenticated', async () => {
    mockAuth.mockResolvedValue(null);

    const response = await GET();
    expect(response.status).toBe(401);
  });
});
