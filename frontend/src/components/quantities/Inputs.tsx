'use client';

import { useCallback, useEffect, useState } from 'react';
import Input, { unitChoice } from './Input';
import replaceStateProperty from '@/lib/replaceStateProperty';
import { RequireAtLeastOne } from '@/lib/requireAtLeastOne';
import Button from '../buttons/Button';

type updaterChoice = RequireAtLeastOne<
  {
    update: (values: { [vk: string]: string }) => void;
    confirm: (values: { [vk: string]: string }) => void;
  },
  'update' | 'confirm'
>;

type InputGroup = {
  [variableKey: string]: {
    label: string;
    placeholder?: string;
    defaultValue?: string;
  } & unitChoice;
};

export default function Inputs({
  children,
  update,
  confirm,
}: { children: InputGroup } & updaterChoice) {
  const [values, setValues] = useState<{ [vk: string]: string }>({});

  useEffect(() => {
    if (update) update(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <>
      {confirm && <Button onClick={() => confirm(values)}>Confirm</Button>}
      {Object.entries(children).map(([variableKey, options]) => (
        <Input
          {...options}
          key={variableKey}
          variableKey={variableKey}
          onUpdate={replaceStateProperty(setValues, variableKey)}
        />
      ))}
    </>
  );
}
