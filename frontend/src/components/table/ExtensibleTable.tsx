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
  const removableData = data.map((d) => ({
    ...d,
    '': rowManager.remover(),
  }));

  return (
    <AutoTable {...{ data: removableData, caption, rowHeaderKey, rowManager }}>
      <tfoot>
        <tr>
          {rowManager.keys.map((key) =>
            key === rowHeaderKey ? (
              <th scope='row' key={key}>
                <input name={key} />
              </th>
            ) : (
              <td key={key}>
                <input name={key} />
              </td>
            )
          )}
          <td>{rowManager.adder()}</td>
        </tr>
      </tfoot>
    </AutoTable>
  );
}
