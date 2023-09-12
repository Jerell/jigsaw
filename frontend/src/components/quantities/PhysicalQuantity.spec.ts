import { expect, test } from 'bun:test';
import { ArbitraryQuantity } from './PhysicalQuantity';

test('has unit', () => {
  const a = new ArbitraryQuantity(1, 'm');
  expect(a.valueWithUnit).toBe('1|m');
});
