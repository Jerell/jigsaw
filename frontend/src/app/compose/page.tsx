import CylinderScene from '@/components/plot/three/cylinder/CylinderScene';
import Stage from './Stage';
import Table from '@/components/table';
import AutoTable from '@/components/table/AutoTable';
import { ExtensibleTable } from '@/components/table/ExtensibleTable';

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
  { x: 1, y: 2, name: 'n1' },
  { x: 4, y: 6, name: 'n2' },
  { x: 11, y: 4, name: 'n3' },
];

export default function Compose() {
  return (
    <div className='grid grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 sm:grid-flow-col gap-2 w-full h-full grow'>
      <section>
        <h2>Parameters</h2>
        {exampleTable}
        <AutoTable data={tableData} rowHeaderKey='name' caption={'generated'} />
        <ExtensibleTable
          data={tableData}
          rowHeaderKey='name'
          caption={'extensible'}
        />
      </section>

      <section>
        <h2>Component</h2>
        <CylinderScene />
        <p>some kind of graphic in the space above</p>
        <p>input fields</p>
        <p>tabular data</p>
      </section>

      <section className='row-span-2 h-full'>
        <h2>Network</h2>
        <Stage />
      </section>
    </div>
  );
}
