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

  // const getValueAndUnit = (u?: string) => unitOverride
  // ? [children.as(unitOverride).toString(), unitOverride]
  // : [...split(children.valueWithUnit)];

  let [value, unit] = unitOverride
    ? [children.as(unitOverride).toString(), unitOverride]
    : [...split(children.valueWithUnit)];

  if (!unitOverride && children && unitState.get(unitKey)) {
    const { unit: u } = unitState.get(unitKey)!;
    unit = u;
    // console.log(u, unitKey);
    value = children.as(unit).toString();
    // return 1;
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
