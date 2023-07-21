'use client';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { RowManager } from './RowManager';
import Button from '../buttons/Button';
import { FaCopy } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';

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
  rowManager?: RowManager<T>;
}) {
  const [editable, setEditable] = useState(false);

  if (editable) {
    return (
      <TextTable
        text={rowManager.text(data)}
        caption={caption}
        setEditable={setEditable}
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
  setEditable: Dispatch<SetStateAction<boolean>>;
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
}: {
  text: string;
  caption: string;
  setEditable: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <ChangeEditState
        caption={caption}
        setEditable={setEditable}
        enable={false}
      />
      <div className='relative'>
        <Button
          className='w-fit p-0.5 absolute top-0.5 right-0.5'
          variant='ghost'
          size='sm'
          onClick={async () => await navigator.clipboard.writeText(text)}
          title={['copy', caption].filter((e) => !!e).join(': ')}
        >
          <FaCopy />
        </Button>
        <textarea defaultValue={text} rows={5} className='w-full' />
      </div>
    </>
  );
}
