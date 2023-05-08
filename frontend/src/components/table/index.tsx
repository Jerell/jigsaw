'use client';
import copyTableContents from '@/lib/copyTableContents';
import { ReactNode, RefObject, useRef } from 'react';
import { FaCopy } from 'react-icons/fa';
import Button from '../buttons/Button';

export default function Table({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
  const tableRef = useRef<HTMLTableElement>(null);

  return (
    <table ref={tableRef}>
      <caption className='pb-1 whitespace-nowrap'>
        {caption} <CopyTable {...{ tableRef, caption }} />
      </caption>
      {children}
    </table>
  );
}

function CopyTable({
  tableRef,
  caption,
}: {
  tableRef: RefObject<HTMLTableElement>;
  caption?: string;
}) {
  return (
    <Button
      className='w-fit p-0.5 relative top-0.5'
      variant='ghost'
      size='sm'
      onClick={async () => await copyTableContents(tableRef)}
      title={['copy', caption].filter((e) => !!e).join(': ')}
    >
      <FaCopy />
    </Button>
  );
}
