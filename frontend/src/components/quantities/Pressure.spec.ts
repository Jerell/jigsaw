import { expect, test } from 'bun:test';
import { Pressure } from './Pressure';

test('conversion', () => {
  const t = new Pressure(1, 'bar');

  expect(t.as('bar')).toBe(1);
  expect(t.as('Pa')).toBe(100000);

  expect(t.convert('Pa')).toBe('100000|Pa');
});
