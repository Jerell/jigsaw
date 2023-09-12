import { expect, test } from 'bun:test';
import { Temperature } from './Temperature';

test('conversion', () => {
  const t = new Temperature(10, 'C');

  expect(t.as('C')).toBe(10);
  expect(t.as('K')).toBe(283.15);

  const k = t.convert('K');
  expect(k).toBe('283.15|K');
});
