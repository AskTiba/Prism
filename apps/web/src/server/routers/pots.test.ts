import { describe, it, expect, vi, beforeEach } from 'vitest';
import { potsRouter } from './pots';

const mockPrisma = {
  pot: {
    findMany: vi.fn(),
    findUniqueOrThrow: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

function createCaller() {
  return potsRouter.createCaller({ prisma: mockPrisma as any, session: null });
}

describe('potsRouter.list', () => {
  it('returns all pots', async () => {
    mockPrisma.pot.findMany.mockResolvedValue([
      { id: '1', name: 'Vacation', target: 2000, total: 500, theme: '#277C78' },
    ]);

    const caller = createCaller();
    const result = await caller.list();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Vacation');
  });
});

describe('potsRouter.create', () => {
  it('creates a pot', async () => {
    const input = { name: 'Emergency Fund', target: 5000, total: 1000, theme: '#277C78' };
    mockPrisma.pot.create.mockResolvedValue({ id: '2', ...input });

    const caller = createCaller();
    const result = await caller.create(input);

    expect(result.name).toBe('Emergency Fund');
  });
});

describe('potsRouter.addMoney', () => {
  it('adds to pot total', async () => {
    mockPrisma.pot.findUniqueOrThrow.mockResolvedValue({ id: '1', total: 500 });
    mockPrisma.pot.update.mockResolvedValue({ id: '1', total: 600 });

    const caller = createCaller();
    const result = await caller.addMoney({ id: '1', amount: 100 });

    expect(result.total).toBe(600);
    expect(mockPrisma.pot.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { total: 600 } }),
    );
  });
});

describe('potsRouter.withdraw', () => {
  it('subtracts from pot total', async () => {
    mockPrisma.pot.findUniqueOrThrow.mockResolvedValue({ id: '1', total: 500 });
    mockPrisma.pot.update.mockResolvedValue({ id: '1', total: 400 });

    const caller = createCaller();
    const result = await caller.withdraw({ id: '1', amount: 100 });

    expect(result.total).toBe(400);
  });
});

describe('potsRouter.remove', () => {
  it('deletes a pot', async () => {
    mockPrisma.pot.delete.mockResolvedValue({ id: '1' });

    const caller = createCaller();
    const result = await caller.remove({ id: '1' });

    expect(result.id).toBe('1');
  });
});
