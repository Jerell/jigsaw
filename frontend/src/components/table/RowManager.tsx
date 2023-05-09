import { ReactNode } from 'react';
import { MdPlaylistAdd, MdPlaylistRemove } from 'react-icons/md';
import Button from '../buttons/Button';

export class RowManager<T extends Record<string, any>> {
  public keys: string[];

  private modifiable = false;

  constructor(
    keys: string[],
    public readonly rowHeaderKey?: string,
    private readonly setter?: (arr: T[] | ((prev: T[]) => T[])) => void
  ) {
    if (rowHeaderKey) {
      keys.unshift(rowHeaderKey);
    }
    this.keys = [...keys.filter((k) => k !== rowHeaderKey)];
  }

  private removeData(i: number) {
    if (!this.setter) return;
    this.setter((prev) => {
      const list = [...prev];
      list.splice(i, 1);
      return list;
    });
  }

  private addData(getNext: () => T) {
    if (!this.setter) return;
    const next = getNext();
    if (!this.keys.every((k) => Object.keys(next).includes(k))) {
      return;
    }
    this.setter((prev: T[]) => {
      const list = [...prev];
      list.push(next);
      return list;
    });
  }

  private swapDataPosition(i: number, j: number) {
    if (!this.setter) return;
    this.setter((prev) => {
      if (i >= prev.length || j > prev.length) {
        return prev;
      }
      const list = [...prev];
      const a = prev[i];
      const b = prev[j];
      list[i] = b;
      list[j] = a;
      return list;
    });
  }

  public head() {
    return (
      <thead>
        <tr>
          {this.keys.map((k) => (
            <th scope='col' key={k}>
              {k}
            </th>
          ))}
          {this.modifiable && <th scope='col'></th>}
        </tr>
      </thead>
    );
  }

  public body(data: T[], rowHeaderKey?: string) {
    const keys = [...this.keys];
    if (this.modifiable) {
      keys.push('');
    }
    return (
      <tbody>
        {data.map((o, i) => (
          <tr key={`row-${i}`}>
            {keys.map((key) =>
              key === rowHeaderKey ? (
                <th scope='row' key={key}>
                  {o[key]}
                </th>
              ) : (
                <td key={key}>{o[key]}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    );
  }

  private action(
    name: string,
    icon?: ReactNode,
    onClick?: () => void,
    index?: number
  ) {
    this.modifiable = true;
    return (
      <Button
        variant='ghost'
        size='sm'
        className='w-full flex flex-row justify-center p-0.5'
        onClick={onClick}
        key={`${name}-${index}`}
      >
        {name}
        {icon}
      </Button>
    );
  }

  remover(i: number) {
    return this.action(
      'Remove',
      <MdPlaylistRemove className='inline text-lg' />,
      () => this.removeData(i),
      i
    );
  }

  adder(getNext: () => T) {
    return this.action(
      'Add',
      <MdPlaylistAdd className='inline text-lg' />,
      () => this.addData(getNext)
    );
  }
}
