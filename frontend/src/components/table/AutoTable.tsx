import { ReactNode } from 'react';
import Table from '.';
import { RowManager } from './RowManager';

export default function AutoTable<T extends Record<string, ReactNode>>({
  data,
  caption,
  rowHeaderKey,
  children,
  rowManager = new RowManager(data[0] ? Object.keys(data[0]) : []),
}: {
  data: T[];
  caption: string;
  rowHeaderKey?: string;
  children?: ReactNode;
  rowManager?: RowManager;
}) {
  const header = (
    <thead>
      <tr>
        {rowManager.keys.map((k) => (
          <th scope='col' key={k}>
            {k}
          </th>
        ))}
      </tr>
    </thead>
  );

  const body = (
    <tbody>
      {data.map((o, i) => (
        <tr key={`row-${i}`}>
          {rowManager.keys.map((key) =>
            key === rowHeaderKey ? (
              <th scope='row'>{o[key]}</th>
            ) : (
              <td>{o[key]}</td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );

  return (
    <Table caption={caption}>
      {header}
      {body}
      {children}
    </Table>
  );
}
