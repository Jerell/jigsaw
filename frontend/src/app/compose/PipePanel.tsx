'use client';
import { useControls, folder } from 'leva';
import Bathymetry from './Bathymetry';
import ModelComponent, { Pipe } from '@/lib/ModelComponent';
import Table from '@/components/table';
import LinePlot from '@/components/plot/d3/LinePlot';

export function PipePanel({
  pipe,
  replace,
}: {
  pipe: Pipe;
  replace: (mc: ModelComponent) => void;
}) {
  const rename = (name: string) => replace(pipe.rename(name));
  const changeDiameter = (d: number) => replace(pipe.setDiameter(d));
  const changeRoughness = (d: number) => replace(pipe.setRoughness(d));

  const controls = useControls(pipe.name, {
    name: {
      value: pipe.name,
      onEditEnd: (c) => {
        console.log(c);
        rename(c);
      },
    },

    'diameter (m)': {
      value: pipe.diameter,
      min: 0.1,
      max: 3,
      onEditEnd: (c) => {
        console.log(c);
        changeDiameter(c);
      },
    },
    uValue: {
      value: 1.0,
      min: 0.1,
      max: 10,
      onEditEnd: (c) => {
        console.log(c);
      },
    },
    roughness: {
      value: pipe.roughness,
      min: 0.1,
      max: 10,
      onEditEnd: (c) => {
        changeRoughness(c);
        console.log(c);
      },
    },

    connections: folder({
      from: {
        value: 'Source1',
        options: ['Source1', 'pipe-2'],
        onChange: (c) => {
          console.log(c);
        },
      },
      to: {
        value: 'pipe-2',
        options: ['pipe-2'],
        onChange: (c) => {
          console.log(c);
        },
      },
    }),
  });

  return (
    <div className='flex flex-col gap-2'>
      <Bathymetry />
      <div className='col-span-2 text-center'>
        <h4>Angle distribution</h4>
        <p className='text-xs'>
          this probably makes more sense as a radar chart
        </p>
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
            <th scope='row'>Overall absolute elevation change</th>
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
