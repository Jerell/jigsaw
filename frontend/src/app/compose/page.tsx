import CylinderScene from '@/components/plot/three/cylinder/CylinderScene';
import Stage from './Stage';
import Table from '@/components/table';
import AutoTable from '@/components/table/AutoTable';
import Bathymetry from './Bathymetry';

export const exampleTable = (
  <Table caption="A summary of the UK's most famous punk bands">
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

const tableData = [
  { x: 1, y: 2 },
  { x: 4, y: 6 },
  { x: 11, y: 4 },
];

export default function Compose() {
  return (
    <div className='grid grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 sm:grid-flow-col gap-2 w-full h-full grow'>
      <section>
        <h2>Parameters</h2>
        {exampleTable}
        <AutoTable data={tableData} caption={'generated'} />
      </section>

      <section>
        <h2>Component</h2>
        <CylinderScene />

        <div className='flex flex-row justify-center'>
          <Bathymetry />
        </div>
      </section>

      <section className='row-span-2 h-full'>
        <h2>Network</h2>
        <Stage />
      </section>
    </div>
  );
}
