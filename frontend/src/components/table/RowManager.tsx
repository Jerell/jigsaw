import { ArrayElement } from '@/lib/arrayElement';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { MdPlaylistAdd, MdPlaylistRemove } from 'react-icons/md';

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
      <span
        className='flex flex-row gap-1 justify-center hover:text-brand-tea active:text-dark cursor-pointer'
        onClick={onClick}
        key={`${name}-${index}`}
      >
        {name}
        {icon}
      </span>
    );
  }

  remover(i: number) {
    const onClick = () => {
      if (!this.setter) return;
      this.setter((prev) => {
        const list = [...prev];
        list.splice(i, 1);
        return list;
      });
    };

    return this.action(
      'Remove',
      <MdPlaylistRemove className='inline text-lg' />,
      onClick,
      i
    );
  }

  adder(getNext: () => T) {
    const onClick = () => {
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
    };
    return this.action(
      'Add',
      <MdPlaylistAdd className='inline text-lg' />,
      onClick
    );
  }
}
