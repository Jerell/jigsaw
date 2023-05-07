import { ReactNode } from 'react';
import Table from '.';

export default function AutoTable<T extends Record<string, ReactNode>>({
  data,
  caption,
  rowHeaderKey,
  children,
}: {
  data: T[];
  caption: string;
  rowHeaderKey?: string;
  children?: ReactNode;
}) {
  const keys = [...Object.keys(data[0]).filter((k) => k !== rowHeaderKey)];
  if (rowHeaderKey) {
    keys.unshift(rowHeaderKey);
  }

  const header = (
    <thead>
      <tr>
        {keys.map((k, i) => (
          <th scope='col' key={i}>
            {k}
          </th>
        ))}
      </tr>
    </thead>
  );

  const body = (
    <tbody>
      {data.map((o, i) => (
        <tr key={i}>
          {keys.map((key) =>
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
