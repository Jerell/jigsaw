import { ReactNode } from 'react';
import { MdPlaylistAdd, MdPlaylistRemove } from 'react-icons/md';
import Button from '../buttons/Button';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export class RowManager<T extends Record<string, any>> {
  public keys: string[];

  constructor(
    keys: string[],
    public readonly rowHeaderKey?: string,
    private readonly setter?: (arr: T[] | ((prev: T[]) => T[])) => void,
    private modifiable = false,
    public getReorderState = () => false,
    private switchReorderState = () => {}
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
          {this.modifiable && (
            <th scope='col'>
              {this.action('Reorder', undefined, this.switchReorderState)}
            </th>
          )}
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

  action(name: string, icon?: ReactNode, onClick?: () => void, index?: number) {
    this.modifiable = true;
    return (
      <Button
        variant='ghost'
        size='sm'
        className='flex flex-row justify-center p-0.5 w-20'
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

  reshuffler(i: number, first: boolean, last: boolean) {
    return (
      <div className='grid grid-cols-2 w-full'>
        {!last && (
          <Button
            className='h-6 p-0.5 flex justify-center'
            variant='ghost'
            size='sm'
            onClick={() => this.swapDataPosition(i, i + 1)}
            title={`move row ${i + 1} down`}
          >
            <FaCaretDown />
          </Button>
        )}
        {!first && (
          <Button
            className='h-6 p-0.5 flex justify-center col-start-2'
            variant='ghost'
            size='sm'
            onClick={() => this.swapDataPosition(i, i - 1)}
            title={`move row ${i + 1} up`}
          >
            <FaCaretUp />
          </Button>
        )}
      </div>
    );
  }
}
