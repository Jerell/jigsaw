'use client';
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { RowManager } from './RowManager';
import Button from '../buttons/Button';
import { FaCopy } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';

export default function AutoTable<T extends Record<string, ReactNode>>({
  data,
  caption,
  rowHeaderKey,
  children,
  setter,
  rowManager = new RowManager(
    data[0] ? Object.keys(data[0]) : [],
    rowHeaderKey,
    setter
  ),
}: {
  data: T[];
  caption: string;
  rowHeaderKey?: string;
  children?: ReactNode;
  setter?: (arr: T[] | ((prev: T[]) => T[])) => void;
  rowManager?: RowManager<T>;
}) {
  const [editable, setEditable] = useState(false);

  if (editable) {
    return (
      <TextTable
        text={rowManager.text(data)}
        caption={caption}
        setEditable={setEditable}
        overwrite={(text) => rowManager.overwrite(text)}
      />
    );
  }

  return (
    <>
      <ChangeEditState
        caption={caption}
        setEditable={setEditable}
        enable={true}
      />
      <table>
        {rowManager.head()}
        {rowManager.body(data, rowHeaderKey)}
        {children}
      </table>
    </>
  );
}

function ChangeEditState({
  caption,
  setEditable,
  enable,
}: {
  caption: string;
  setEditable: (b: boolean) => void;
  enable: boolean;
}) {
  return (
    <p className='text-xs italic text-brand-buff py-0.5 text-center'>
      {caption}{' '}
      <Button
        className='w-fit p-0.5 relative top-0.5'
        variant='ghost'
        size='sm'
        onClick={() => setEditable(enable)}
        title={['edit', caption].filter((e) => !!e).join(': ')}
      >
        <GrEdit />
      </Button>
    </p>
  );
}

function TextTable({
  text,
  caption,
  setEditable,
  overwrite,
}: {
  text: string;
  caption: string;
  setEditable: Dispatch<SetStateAction<boolean>>;
  overwrite: (text: string) => void;
}) {
  const [value, setValue] = useState<string>(text);

  const overwriteAndSetEditable = (b: boolean) => {
    overwrite(value);
    setEditable(b);
  };

  return (
    <>
      <ChangeEditState
        caption={caption}
        setEditable={overwriteAndSetEditable}
        enable={false}
      />
      <div className='relative'>
        <Button
          className='w-fit p-0.5 absolute top-0.5 right-0.5'
          variant='ghost'
          size='sm'
          onClick={async () => await navigator.clipboard.writeText(value)}
          title={['copy', caption].filter((e) => !!e).join(': ')}
        >
          <FaCopy />
        </Button>
        <textarea
          defaultValue={text}
          rows={5}
          className='w-full text-sm'
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.currentTarget.value)
          }
        />
      </div>
    </>
  );
}
