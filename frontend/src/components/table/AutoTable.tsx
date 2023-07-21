'use client';
import { ReactNode } from 'react';
import Table from '.';
import { RowManager } from './RowManager';

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
  const convertToText = () => {
    const t = rowManager.text(data);
    console.log(t);
    const copyData = async () => {
      await navigator.clipboard.writeText(t);
    };
    copyData();
    return t;
  };

  return (
    <Table {...{ caption, convertToText }}>
      {rowManager.head()}
      {rowManager.body(data, rowHeaderKey)}
      {children}
    </Table>
  );
}
