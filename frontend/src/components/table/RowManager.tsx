import { ReactNode } from 'react';
import { MdPlaylistAdd, MdPlaylistRemove } from 'react-icons/md';

export class RowManager {
  public keys: string[];

  constructor(keys: string[], public readonly rowHeaderKey?: string) {
    if (rowHeaderKey) {
      keys.unshift(rowHeaderKey);
    }
    this.keys = [...keys.filter((k) => k !== rowHeaderKey)];
  }

  private action(name: string, icon?: ReactNode) {
    return (
      <span className='flex flex-row gap-1 justify-center hover:text-brand-tea active:text-dark cursor-pointer'>
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
