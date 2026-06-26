import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TRPCError } from '@trpc/server';
import { dataRouter } from './data';

const mockPrisma = {
  transaction: {
    findMany: vi.fn(),
    deleteMany: vi.fn(),
  },
  budget: {
    deleteMany: vi.fn(),
  },
  pot: {
    deleteMany: vi.fn(),
  },
  session: {
    deleteMany: vi.fn(),
  },
  account: {
    deleteMany: vi.fn(),
  },
  authenticator: {
    deleteMany: vi.fn(),
  },
  user: {
    delete: vi.fn(),
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

function createCaller() {
  const session = { user: { id: 'test-user' }, expires: '2099-01-01T00:00:00.000Z' };
  return dataRouter.createCaller({ prisma: mockPrisma as any, session } as any);
}

describe('dataRouter.exportCsv', () => {
  it('returns CSV with headers and transaction rows', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([
      {
        id: '1',
        name: 'Coffee',
        amount: -5,
        date: new Date('2024-08-19'),
        category: 'Dining Out',
        recurring: false,
        avatar: null,
      },
      {
        id: '2',
        name: 'Salary',
        amount: 3000,
        date: new Date('2024-08-01'),
        category: 'Income',
        recurring: true,
        avatar: null,
      },
    ]);

    const caller = createCaller();
    const csv = await caller.exportCsv();

    const lines = csv.trim().split('\n');
    expect(lines[0]).toBe('Date,Name,Category,Amount,Recurring');
    expect(lines[1]).toContain('Coffee');
    expect(lines[1]).toContain('-5');
    expect(lines[2]).toContain('Salary');
    expect(lines[2]).toContain('3000');
    expect(lines[2]).toContain('true');
  });

  it('returns only headers when no transactions exist', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([]);

    const caller = createCaller();
    const csv = await caller.exportCsv();

    expect(csv.trim()).toBe('Date,Name,Category,Amount,Recurring');
  });

  it('only returns transactions for the current user', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([]);

    const caller = createCaller();
    await caller.exportCsv();

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: 'test-user' } }),
    );
  });
});

describe('dataRouter.deleteAccount', () => {
  it('deletes all user data and the user account', async () => {
    mockPrisma.transaction.deleteMany.mockResolvedValue({ count: 5 });
    mockPrisma.budget.deleteMany.mockResolvedValue({ count: 2 });
    mockPrisma.pot.deleteMany.mockResolvedValue({ count: 1 });
    mockPrisma.session.deleteMany.mockResolvedValue({ count: 0 });
    mockPrisma.account.deleteMany.mockResolvedValue({ count: 0 });
    mockPrisma.authenticator.deleteMany.mockResolvedValue({ count: 0 });
    mockPrisma.user.delete.mockResolvedValue({ id: 'test-user' });

    const caller = createCaller();
    const result = await caller.deleteAccount();

    expect(mockPrisma.transaction.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'test-user' },
    });
    expect(mockPrisma.budget.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'test-user' },
    });
    expect(mockPrisma.pot.deleteMany).toHaveBeenCalledWith({
      where: { userId: 'test-user' },
    });
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: { id: 'test-user' },
    });
    expect(result).toEqual({ success: true });
  });

  it('rejects unauthenticated requests', async () => {
    const caller = dataRouter.createCaller({
      prisma: mockPrisma as any,
      session: null,
    } as any);

    await expect(caller.deleteAccount()).rejects.toThrow(TRPCError);
  });
});
