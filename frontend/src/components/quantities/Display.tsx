'use client';

import { label, split } from '@oliasoft-open-source/units';
import { PQ, PhysicalQuantity } from './PhysicalQuantity';
import { useContext } from 'react';
import { UnitContext } from './UnitContextProvider';

export default function Display({
  children,
  unitOverride,
  unitGroupTag,
}: DisplayProps) {
  const unitState = useContext(UnitContext);
  const unitKey = unitGroupTag || (children.constructor as PQ);

  let [value, unit] = unitOverride
    ? [children.as(unitOverride).toString(), unitOverride]
    : [...split(children.valueWithUnit)];

  if (!unitOverride && children && unitState.get(unitKey)) {
    const { unit: u } = unitState.get(unitKey)!;
    unit = u;
    value = children.as(unit).toString();
  }

  return (
    <p>
      {value} {label(unit) || unit}
    </p>
  );
}

type DisplayProps = {
  children: PhysicalQuantity;
  unitOverride?: string;
  unitGroupTag?: string;
};
