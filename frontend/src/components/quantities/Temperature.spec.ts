import { expect, test } from 'bun:test';
import { Temperature } from './Temperature';

test('conversion', () => {
  const t = new Temperature(10, 'C');

  expect(t.as('C')).toBe(10);
  expect(t.as('K')).toBe(283.15);

  expect(t.convert('K')).toBe('283.15|K');
});
