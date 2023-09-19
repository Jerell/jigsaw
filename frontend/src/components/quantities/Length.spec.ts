import { expect, test } from 'bun:test';
import { Length } from './Length';

test('conversion', () => {
  const t = new Length(10, 'm');

  expect(t.as('m')).toBe(10);
  expect(t.as('mm')).toBe(10000);

  expect(t.convert('mm')).toBe('10000|mm');
});
