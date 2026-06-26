import { describe, it, expect, vi, beforeEach } from 'vitest';
import { transactionsRouter } from './transactions';

const mockPrisma = {
  transaction: {
    findMany: vi.fn(),
    count: vi.fn(),
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

function createCaller() {
  const session = { user: { id: 'test-user' }, expires: '2099-01-01T00:00:00.000Z' };
  return transactionsRouter.createCaller({ prisma: mockPrisma as any, session } as any);
}

describe('transactionsRouter.list', () => {
  it('returns paginated transactions with defaults', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([
      {
        id: '1',
        name: 'Coffee',
        amount: -5,
        date: new Date(),
        category: 'Dining Out',
        recurring: false,
        avatar: null,
      },
    ]);
    mockPrisma.transaction.count.mockResolvedValue(1);

    const caller = createCaller();
    const result = await caller.list({});

    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(10);
    expect(result.totalPages).toBe(1);
  });

  it('filters by category', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([]);
    mockPrisma.transaction.count.mockResolvedValue(0);

    const caller = createCaller();
    await caller.list({ category: 'Bills' });

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ category: 'Bills' }),
      }),
    );
  });

  it('applies sort order', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([]);
    mockPrisma.transaction.count.mockResolvedValue(0);

    const caller = createCaller();
    await caller.list({ sort: 'highest' });

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        orderBy: { amount: 'desc' },
      }),
    );
  });

  it('paginates correctly', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([]);
    mockPrisma.transaction.count.mockResolvedValue(25);

    const caller = createCaller();
    const result = await caller.list({ page: 3, pageSize: 10 });

    expect(result.page).toBe(3);
    expect(result.totalPages).toBe(3);
    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 20, take: 10 }),
    );
  });

  it('searches by name', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([]);
    mockPrisma.transaction.count.mockResolvedValue(0);

    const caller = createCaller();
    await caller.list({ search: 'Coffee' });

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ name: { contains: 'Coffee' } }),
      }),
    );
  });

  it('filters by subtype', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([]);
    mockPrisma.transaction.count.mockResolvedValue(0);

    const caller = createCaller();
    await caller.list({ subtype: 'Essentials' });

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ subtype: 'Essentials' }),
      }),
    );
  });

  it('filters by tags search', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([]);
    mockPrisma.transaction.count.mockResolvedValue(0);

    const caller = createCaller();
    await caller.list({ tags: 'urgent' });

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ tags: { has: 'urgent' } }),
      }),
    );
  });

  it('filters by date range', async () => {
    mockPrisma.transaction.findMany.mockResolvedValue([]);
    mockPrisma.transaction.count.mockResolvedValue(0);

    const caller = createCaller();
    await caller.list({ dateFrom: '2024-01-01', dateTo: '2024-12-31' });

    expect(mockPrisma.transaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          date: { gte: expect.any(Date), lte: expect.any(Date) },
        }),
      }),
    );
  });
});
