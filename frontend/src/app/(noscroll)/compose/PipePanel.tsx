'use client';
import { useControls, folder } from 'leva';
import Bathymetry from './Bathymetry';
import { Pipe } from '@/lib/ModelComponent';
import Table from '@/components/table';
import { CompositionContext } from './CompositionContext';
import { useContext } from 'react';

export function PipePanel({ pipe }: { pipe: Pipe }) {
  const { components, select, selection, replace } =
    useContext(CompositionContext);

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
      inlet: {
        value: pipe.inlets[0]?.name ?? 'choose an inlet',
        options: components.map((c) => c.name).filter((n) => n != pipe.name),
        onChange: (...args) => {
          pipe.inlets[0] = args[0];
        },
      },
      outlet: {
        value: pipe.outlets[0]?.name ?? 'choose an outlet',
        options: components.map((c) => c.name).filter((n) => n != pipe.name),
        onChange: (c) => {
          pipe.outlets[0] = c;
        },
      },
    }),
  });

  return (
    <div className='flex flex-col gap-2'>
      <Bathymetry />

      <Table
        caption={`${pipe.name} shape`}
        convertToText={function (): string {
          throw new Error('Function not implemented.');
        }}
      >
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
