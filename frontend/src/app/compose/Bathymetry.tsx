'use client';
import { ExtensibleTable } from '@/components/table/ExtensibleTable';
import { RowManager } from '@/components/table/RowManager';
import { useState } from 'react';

export default function Bathymetry() {
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);

  const rm = new RowManager(['x', 'y']);

  return (
    <div className='flex flex-col'>
      <h3>Bathymetry</h3>
      <ExtensibleTable
        data={coords}
        caption={'pipeline bathymetry - extensible table'}
        rowManager={rm}
      />
    </div>
  );
}

const tableData = [
  { x: 1, y: 2 },
  { x: 4, y: 6 },
  { x: 11, y: 4 },
];
