'use client';
import Table from '@/components/table';
import Bathymetry from './Bathymetry';
import { folder, useControls } from 'leva';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import Button from '@/components/buttons/Button';
import { Leva } from 'leva';
import { theme } from './leva.theme';

export default function PipeInfo() {
  const {
    name,
    'diameter (m)': diameter,
    uValue,
    from,
    to,
  } = useControls({
    name: 'Pipe',

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
        options: ['Source1', 'pipeB'],
      },
      to: {
        value: 'pipeB',
        options: ['pipeB'],
      },
    }),
  });

  return (
    <div className='flex flex-row gap-2 justify-evenly'>
      <Leva theme={theme} flat />
      <div className='flex flex-col'>
        <Button variant='ghost' size='sm' leftIcon={AiOutlineDoubleLeft}>
          {from}
        </Button>
      </div>
      <Bathymetry />
      <div className='flex flex-col'>
        <Button variant='ghost' size='sm' rightIcon={AiOutlineDoubleRight}>
          {to}
        </Button>
      </div>
    </div>
  );
}
