import { describe, it, expect } from 'vitest';

describe('auth module', () => {
  it('exports the expected API', async () => {
    const mod = await import('@/auth');
    expect(mod).toHaveProperty('handlers');
    expect(mod).toHaveProperty('auth');
    expect(mod).toHaveProperty('signIn');
    expect(mod).toHaveProperty('signOut');
    expect(typeof mod.handlers.GET).toBe('function');
    expect(typeof mod.handlers.POST).toBe('function');
    expect(typeof mod.auth).toBe('function');
  });
});
