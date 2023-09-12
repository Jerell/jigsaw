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

type unitChoice = RequireAtLeastOne<
  {
    unitOverride?: string;
    unitGroup?: PQ | string;
  },
  'unitOverride' | 'unitGroup'
>;

export default function Input({
  label,
  varKey,
  unitGroup,
  onUpdate,
  placeholder,
  defaultValue,
  unitOverride,
}: {
  label: string;
  varKey: string;
  onUpdate: (t: string) => void;
  placeholder?: string;
  defaultValue?: string;
} & unitChoice) {
  const unitState = useContext(UnitContext);
  const u = unitState.get(unitGroup || '');
  const unit = unitOverride || u?.unit || '';

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue((prev) => withUnit(getValue(prev), unit));
  }, [u?.unit, unit]);

  useEffect(() => {
    onUpdate(value);
  }, [onUpdate, value]);

  return (
    <label className='flex flex-row gap-2'>
      {label}
      <div className='flex flex-row gap-2'>
        <input
          className='w-full'
          autoComplete='off'
          name={varKey}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            console.log(varKey);
            setValue(withUnit(e.currentTarget.value, unit));
          }}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        <p>{unitLabel(unit)}</p>
      </div>
    </label>
  );
}
