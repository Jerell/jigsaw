'use client';
import copyTableContents from '@/lib/copyTableContents';
import { ReactNode, RefObject, useRef } from 'react';
import { FaCopy } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import Button from '../buttons/Button';

export default function Table({
  children,
  caption,
  convertToText,
}: {
  children: ReactNode;
  caption: string;
  convertToText: () => string;
}) {
  const tableRef = useRef<HTMLTableElement>(null);

  return (
    <table ref={tableRef}>
      <caption className='pb-1 whitespace-nowrap'>
        {caption} <EditAsText {...{ tableRef, caption, convertToText }} />
        {/* {caption} <CopyTable {...{ tableRef, caption }} /> */}
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

function EditAsText({
  tableRef,
  caption,
  convertToText,
}: {
  tableRef: RefObject<HTMLTableElement>;
  caption?: string;
  convertToText: () => string;
}) {
  return (
    <Button
      className='w-fit p-0.5 relative top-0.5'
      variant='ghost'
      size='sm'
      onClick={convertToText}
      // onClick={async () => await copyTableContents(tableRef)}
      title={['edit', caption].filter((e) => !!e).join(': ')}
    >
      <GrEdit />
    </Button>
  );
}
