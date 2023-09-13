'use client';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { PQ } from './PhysicalQuantity';
import { UnitContext } from './UnitContextProvider';
import {
  getValue,
  split,
  label as unitLabel,
  withUnit,
} from '@oliasoft-open-source/units';
import { RequireAtLeastOne } from '@/lib/requireAtLeastOne';

export type unitChoice = RequireAtLeastOne<
  {
    unitOverride?: string;
    unitGroup?: PQ | string;
  },
  'unitOverride' | 'unitGroup'
>;

export default function Input({
  label,
  variableKey,
  unitGroup,
  onUpdate,
  placeholder,
  defaultValue = '',
  unitOverride,
}: {
  label: string;
  variableKey: string;
  onUpdate: (t: string) => void;
  placeholder?: string;
  defaultValue?: string;
} & unitChoice) {
  const unitState = useContext(UnitContext);
  const u = unitState.get(unitGroup || '');
  const unit = unitOverride || u?.unit || '';

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue((prev) => withUnit(getValue(prev), unit));
  }, [u?.unit, unit]);

  useEffect(() => {
    onUpdate(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <label className='flex flex-row gap-2'>
      {label}
      <div className='flex flex-row gap-2'>
        <input
          className='w-full'
          autoComplete='off'
          name={variableKey}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            setValue(withUnit(e.currentTarget.value, unit))
          }
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        <p className='w-16'>{unitLabel(unit) || unit}</p>
      </div>
    </label>
  );
}
