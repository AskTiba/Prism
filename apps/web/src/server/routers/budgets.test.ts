import { describe, it, expect, vi, beforeEach } from 'vitest';
import { budgetsRouter } from './budgets';

const mockPrisma = {
  budget: {
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  transaction: {
    aggregate: vi.fn(),
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

function createCaller() {
  const session = { user: { id: 'test-user' }, expires: '2099-01-01T00:00:00.000Z' };
  return budgetsRouter.createCaller({ prisma: mockPrisma as any, session } as any);
}

describe('budgetsRouter.list', () => {
  it('returns budgets with spent amount', async () => {
    mockPrisma.budget.findMany.mockResolvedValue([
      { id: '1', category: 'Bills', maximum: 400, theme: '#82C9D7' },
    ]);
    mockPrisma.transaction.aggregate.mockResolvedValue({ _sum: { amount: -235 } });

    const caller = createCaller();
    const result = await caller.list();

    expect(result).toHaveLength(1);
    expect(result[0].spent).toBe(235);
  });
});

describe('budgetsRouter.create', () => {
  it('creates a budget', async () => {
    const input = { category: 'Groceries', maximum: 500, theme: '#F2CDAC' };
    mockPrisma.budget.create.mockResolvedValue({ id: '2', ...input });

    const caller = createCaller();
    const result = await caller.create(input);

    expect(result.category).toBe('Groceries');
    expect(mockPrisma.budget.create).toHaveBeenCalledWith({
      data: { ...input, userId: 'test-user' },
    });
  });
});

describe('budgetsRouter.update', () => {
  it('updates a budget', async () => {
    const input = { id: '1', data: { maximum: 600 } };
    mockPrisma.budget.update.mockResolvedValue({ id: '1', maximum: 600 });

    const caller = createCaller();
    const result = await caller.update(input);

    expect(result.maximum).toBe(600);
  });
});

describe('budgetsRouter.remove', () => {
  it('deletes a budget', async () => {
    mockPrisma.budget.delete.mockResolvedValue({ id: '1' });

    const caller = createCaller();
    const result = await caller.remove({ id: '1' });

    expect(result.id).toBe('1');
  });
});
