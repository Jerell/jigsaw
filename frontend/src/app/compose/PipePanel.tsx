'use client';
import { useControls, folder } from 'leva';
import Bathymetry from './Bathymetry';
import ModelComponent, { Pipe } from '@/lib/ModelComponent';
import { StoreType } from 'leva/dist/declarations/src/types';
import Table from '@/components/table';
import LinePlot from '@/components/plot/d3/LinePlot';

export function PipePanel({
  pipe,
  replace,
  store,
}: {
  pipe: Pipe;
  replace: (mc: ModelComponent) => void;
  store: StoreType | null;
}) {
  const {
    name,
    'diameter (m)': diameter,
    uValue,
    from,
    to,
  } = useControls(
    {
      name: pipe.name,

      'diameter (m)': {
        value: 1,
        min: 0.1,
        max: 3,
      },
      uValue: {
        value: 1.0,
        min: 0.1,
        max: 10,
      },
      roughness: {
        value: 1.0,
        min: 0.1,
        max: 10,
      },

      connections: folder({
        from: {
          value: 'Source1',
          options: ['Source1', 'pipe-2'],
        },
        to: {
          value: 'pipe-2',
          options: ['pipe-2'],
        },
      }),
    }
    // store ? { store } : undefined
  );

  // useEffect(() => {
  //   store?.set({ a: { value: name } }, true);
  //   console.log(store?.getData());
  //   console.log(store);
  // }, [name, store]);
  return (
    <div className='flex flex-col gap-2'>
      <Bathymetry />
      <div className='col-span-2 text-center'>
        <h4>Angle distribution</h4>
        <div className='h-32'>
          <LinePlot
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 1 },
            ]}
            dots={false}
          />
        </div>
      </div>
      <Table caption={`${pipe.name} shape`}>
        <thead>
          <tr>
            <th scope='col'>Property</th>
            <th scope='col'>Value(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>Length</th>
            <td>_____ m</td>
          </tr>
          <tr>
            <th scope='row'>Overall elevation change</th>
            <td>_____ m</td>
          </tr>
          <tr>
            <th scope='row'>Cumulative absolute elevation change</th>
            <td>_____ m</td>
          </tr>
          <tr>
            <th scope='row'>Steepest descent</th>
            <td>__°, ___ - ___ m</td>
          </tr>
          <tr>
            <th scope='row'>Greatest change in gradient</th>
            <td>__°</td>
          </tr>
          <tr>
            <th scope='row'>Steepest ascent</th>
            <td>__°, ___ - ___ m</td>
          </tr>
          <tr>
            <th scope='row'>Peaks</th>
            <td>_</td>
          </tr>
          <tr>
            <th scope='row'>Troughs</th>
            <td>_</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
