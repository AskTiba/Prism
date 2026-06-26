import { describe, it, expect, vi, beforeEach } from 'vitest';
import { dataRouter } from './data';

const mockPrisma = {
  transaction: {
    findMany: vi.fn(),
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
