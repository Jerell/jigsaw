import { ReactNode } from 'react';
import AutoTable from './AutoTable';
import { MdPlaylistAdd, MdPlaylistRemove } from 'react-icons/md';

export function ExtensibleTable<T extends Record<string, string | number>>({
  data,
  caption,
  rowHeaderKey,
}: {
  data: T[];
  caption: string;
  rowHeaderKey?: string;
}) {
  const keys = [...Object.keys(data[0]).filter((k) => k !== rowHeaderKey)];
  if (rowHeaderKey) {
    keys.unshift(rowHeaderKey);
  }

  const rm = new RowManager();

  const removableData = data.map((d) => ({
    ...d,
    '': rm.remover(),
  }));

  const addRow = Object.keys(data[0]).reduce((acc, k) => {
    acc[k] = <input></input>;
    return acc;
  }, {} as { [key: string]: ReactNode });

  return (
    <AutoTable {...{ data: removableData, caption, rowHeaderKey }}>
      <tfoot>
        <tr>
          {keys.map((key) =>
            key === rowHeaderKey ? (
              <th scope='row'>
                <input></input>
              </th>
            ) : (
              <td>
                <input></input>
              </td>
            )
          )}
          <td>{rm.adder()}</td>
        </tr>
      </tfoot>
    </AutoTable>
  );
}

class RowManager {
  private action(name: string, icon?: ReactNode) {
    return (
      <span className='flex flex-row gap-1 justify-center'>
        {name}
        {icon}
      </span>
    );
  }

  remover() {
    return this.action(
      'Remove',
      <MdPlaylistRemove className='inline text-lg' />
    );
  }

  adder() {
    return this.action('Add', <MdPlaylistAdd className='inline text-lg' />);
  }
}
