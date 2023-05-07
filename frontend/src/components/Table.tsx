'use client';
import copyTableContents from '@/lib/copyTableContents';
import { ReactNode, RefObject, useRef } from 'react';
import { FaCopy } from 'react-icons/fa';

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
      <caption>
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
    <FaCopy
      className='inline hover:text-brand-tea cursor-pointer active:text-dark'
      onClick={() => copyTableContents(tableRef)}
      title={['copy', caption].filter((e) => !!e).join(': ')}
    />
  );
}
