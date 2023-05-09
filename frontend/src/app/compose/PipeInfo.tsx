'use client';
import Table from '@/components/table';
import Bathymetry from './Bathymetry';
import { useControls } from 'leva';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import Button from '@/components/buttons/Button';

export default function PipeInfo() {
  const { name, diameter, uValue, source, destination } = useControls({
    name: 'Pipe',

    diameter: {
      value: 1,
      min: 0.1,
      max: 3,
    },
    uValue: {
      value: 1.0,
      min: 0.1,
      max: 10,
    },

    source: {
      value: 'Source1',
      options: ['Source1', 'pipeB'],
    },

    destination: {
      value: 'pipeB',
      options: ['pipeB'],
    },
  });

  return (
    <div className='flex flex-row gap-2 justify-evenly'>
      <div className='flex flex-col'>
        <Button variant='ghost' size='sm' leftIcon={AiOutlineDoubleLeft}>
          {source}
        </Button>
      </div>
      <Bathymetry />
      <div className='flex flex-col'>
        <Button variant='ghost' size='sm' rightIcon={AiOutlineDoubleRight}>
          {destination}
        </Button>
      </div>
    </div>
  );
}

function PipeTable() {
  return (
    <Table caption='Pipe parameters'>
      <thead>
        <tr>
          <th scope='col'>Band</th>
          <th scope='col'>Year formed</th>
          <th scope='col'>No. of Albums</th>
          <th scope='col'>Most famous song</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>Buzzcocks</th>
          <td>1976</td>
          <td>9</td>
          <td>Ever fallen in love (with someone you shouldn't've)</td>
        </tr>
        <tr>
          <th scope='row'>The Clash</th>
          <td>1976</td>
          <td>6</td>
          <td>London Calling</td>
        </tr>

        <tr>
          <th scope='row'>The Stranglers</th>
          <td>1974</td>
          <td>17</td>
          <td>No More Heroes</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope='row' colSpan={2}>
            Total albums
          </th>
          <td>77</td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  );
}
