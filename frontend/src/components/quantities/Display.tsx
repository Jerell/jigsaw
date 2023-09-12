'use client';

import { label, split } from '@oliasoft-open-source/units';
import { PQ, PhysicalQuantity } from './PhysicalQuantity';
import { RequireAtLeastOne } from '@/lib/requireAtLeastOne';
import { useContext } from 'react';
import { UnitContext } from './UnitContextProvider';

export default function Display({ valueWithUnit, children }: DisplayProps) {
  const unitState = useContext(UnitContext);
  let [value, unit] = split(
    children?.valueWithUnit || (valueWithUnit as string)
  );

  if (children && unitState.get(children.constructor as PQ)) {
    const { unit: u } = unitState.get(children.constructor as PQ)!;
    unit = u;
    value = children.as(unit).toString();
  }

  return (
    <p>
      {value} {label(unit) || unit}
    </p>
  );
}

type DisplayProps = RequireAtLeastOne<
  {
    valueWithUnit: string;
    children?: PhysicalQuantity;
  },
  'valueWithUnit' | 'children'
>;
