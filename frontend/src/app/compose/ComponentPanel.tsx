'use client';

import Button from '@/components/buttons/Button';
import { useControls, folder } from 'leva';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import Bathymetry from './Bathymetry';
import { useContext } from 'react';
import { CompositionContext } from './CompositionContext';

export default function ComponentPanel() {
  const { components } = useContext(CompositionContext);
  console.log(components);

  return (
    <section>
      <h2>Component</h2>
      <PipePanel />
    </section>
  );
}

function PipePanel() {
  const {
    name,
    'diameter (m)': diameter,
    uValue,
    from,
    to,
  } = useControls({
    name: 'pipe-1',

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
  });
  return (
    <div className='flex flex-row gap-2 justify-evenly'>
      <div className='flex flex-col'>
        <Button
          variant='ghost'
          size='sm'
          className='whitespace-nowrap'
          leftIcon={AiOutlineDoubleLeft}
        >
          {from}
        </Button>
      </div>
      <div className='flex flex-col'>
        <h3 className='m-0'>{name}</h3>
        <Bathymetry />
      </div>
      <div className='flex flex-col'>
        <Button
          variant='ghost'
          size='sm'
          className='whitespace-nowrap'
          rightIcon={AiOutlineDoubleRight}
        >
          {to}
        </Button>
      </div>
    </div>
  );
}
