'use client';
import LinePlot from '@/components/plot/d3/LinePlot';
import { ExtensibleTable } from '@/components/table/ExtensibleTable';
import { RowManager } from '@/components/table/RowManager';
import { useState } from 'react';

export default function Bathymetry() {
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);

  const [reorderState, setReorderState] = useState(false);
  const getReorderState = () => reorderState;
  const switchReorderState = () => setReorderState(!reorderState);

  const rm = new RowManager<{ x: number; y: number }>(
    ['x', 'y'],
    undefined,
    setCoords,
    true,
    getReorderState,
    switchReorderState
  );

  return (
    <div className='flex flex-col'>
      <div className='h-32'>
        <LinePlot data={coords} />
      </div>
      <ExtensibleTable
        data={coords}
        caption={'pipeline bathymetry'}
        rowManager={rm}
        editable
      />
    </div>
  );
}
