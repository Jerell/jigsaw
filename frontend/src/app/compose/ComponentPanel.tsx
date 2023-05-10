'use client';

import Button from '@/components/buttons/Button';
import { useControls, folder } from 'leva';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import Bathymetry from './Bathymetry';
import { useContext, useEffect } from 'react';
import { CompositionContext } from './CompositionContext';
import ModelComponent, { ModelComponentType, Pipe } from '@/lib/ModelComponent';
import { DataItem, StoreType } from 'leva/dist/declarations/src/types';
import Table from '@/components/table';
import LinePlot from '@/components/plot/d3/LinePlot';

export default function ComponentPanel() {
  const { components, select, selection, replace, store } =
    useContext(CompositionContext);

  return (
    <section key={selection}>
      <h2>Component</h2>
      <div className='flex flex-row gap-2 justify-evenly'>
        <div className='flex flex-col'>
          <Button
            variant='ghost'
            size='sm'
            className='whitespace-nowrap'
            leftIcon={AiOutlineDoubleLeft}
            onClick={select.prev}
            disabled={selection === 0}
          >
            prev
          </Button>
        </div>

        <div className='flex flex-col grow'>
          <h3 className='m-0'>{components[selection].name}</h3>
          <SpecificInfo
            component={components[selection]}
            {...{ replace, store }}
          />
        </div>

        <div className='flex flex-col'>
          <Button
            variant='ghost'
            size='sm'
            className='whitespace-nowrap'
            rightIcon={AiOutlineDoubleRight}
            onClick={select.next}
            disabled={selection === components.length - 1}
          >
            next
          </Button>
        </div>
      </div>
    </section>
  );
}

function SpecificInfo({
  component,
  replace,
  store,
}: {
  component: ModelComponent;
  replace: (mc: ModelComponent) => void;
  store: StoreType | null;
}) {
  switch (component.type) {
    case ModelComponentType.Pipe:
      return <PipePanel pipe={component} {...{ replace, store }} />;
    default:
      return null;
  }
}

function PipePanel({
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
    <div className='grid lg:grid-cols-2 gap-2'>
      <Bathymetry />
      <div className='flex flex-col w-full'>
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
              <th scope='row'>Elevation change</th>
              <td>_____ m</td>
            </tr>
            <tr>
              <th scope='row'>Steepest descent</th>
              <td>__°, ___ - ___ m</td>
            </tr>
            <tr>
              <th scope='row'>Greatest change in gradient</th>
              <td>__°, ___ - ___ m</td>
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
      <div className='col-span-2 text-center'>
        <div className='h-32'>
          <LinePlot
            data={[
              { x: 1, y: 1 },
              { x: 2, y: 2 },
              { x: 3, y: 1 },
            ]}
          />
        </div>
        <h4>Angle distribution</h4>
      </div>
    </div>
  );
}
