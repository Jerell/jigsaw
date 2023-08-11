'use client';
import LinePlot from '@/components/plot/d3/LinePlot';
import { ExtensibleTable } from '@/components/table/ExtensibleTable';
import { RowManager } from '@/components/table/RowManager';
import { useContext, useEffect, useState } from 'react';
import { CompositionContext } from './CompositionContext';
import { Pipe } from '@/lib/ModelComponent';

export default function Bathymetry({ ID }: { ID: Pipe['ID'] }) {
  const { getPipeBathymetry, setPipeBathymetry } =
    useContext(CompositionContext);
  const [coords, setCoords] = useState<{ x: number; y: number }[]>(
    getPipeBathymetry(ID)
  );

  useEffect(() => {
    setPipeBathymetry(ID)(coords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

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
