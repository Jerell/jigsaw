import { expect, test } from 'bun:test';
import { MassFlowrate } from './MassFlowrate';

test('conversion', () => {
  const t = new MassFlowrate(10, 'kg/s');

  expect(t.as('kg/s')).toBe(10);
  expect(t.as('lbm/s')).toBe(22.0462262);

  expect(t.convert('lbm/s')).toBe('22.0462262|lbm/s');
});
