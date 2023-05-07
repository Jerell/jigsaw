'use client';
import { FormEvent, useState } from 'react';
import AutoTable from './AutoTable';
import { RowManager } from './RowManager';

export function ExtensibleTable<T extends Record<string, string | number>>({
  data,
  caption,
  rowHeaderKey,
  rowManager,
}: {
  data: T[];
  caption: string;
  rowHeaderKey?: string;
  rowManager: RowManager;
}) {
  const removableData = data.map((d, i) => ({
    ...d,
    '': rowManager.remover(i),
  }));

  const [next, setNext] = useState<Partial<T>>({});

  const updateNext = (k: string) => (v: string) => {
    setNext((prev) => {
      return { ...prev, [k]: v };
    });
  };

  return (
    <AutoTable {...{ data: removableData, caption, rowHeaderKey, rowManager }}>
      <tfoot>
        <tr>
          {rowManager.keys.map((key) =>
            key === rowHeaderKey ? (
              <th scope='row' key={key}>
                <input
                  autoComplete='off'
                  name={key}
                  onChange={(e: FormEvent<HTMLInputElement>) => {
                    updateNext(key)(e.currentTarget.value);
                  }}
                />
              </th>
            ) : (
              <td key={key}>
                <input
                  autoComplete='off'
                  name={key}
                  onChange={(e: FormEvent<HTMLInputElement>) => {
                    updateNext(key)(e.currentTarget.value);
                  }}
                />
              </td>
            )
          )}
          <td>{rowManager.adder(() => next)}</td>
        </tr>
      </tfoot>
    </AutoTable>
  );
}
