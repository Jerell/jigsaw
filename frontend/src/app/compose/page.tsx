import Stage from './Stage';
import Table from '@/components/table';
import AutoTable from '@/components/table/AutoTable';
import ComponentPanel from './ComponentPanel';

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
    <div className='flex flex-col sm:flex-row gap-2 w-full min-h-screen'>
      <div className='flex flex-col w-full sm:w-1/2'>
        <section>
          <h2 className='a'>Parameters</h2>
          <Table caption={`Static table`}>
            <thead>
              <tr>
                <th scope='col'>Property</th>
                <th scope='col'>Value(s)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Ambient medium</th>
                <td>water</td>
              </tr>
              <tr>
                <th scope='row'>Ambient temperature</th>
                <td>__°C</td>
              </tr>
            </tbody>
          </Table>
          <AutoTable data={tableData} caption={'Generated'} />
        </section>

        <ComponentPanel />
      </div>

      <div className='flex flex-col sm:w-1/2'>
        <h2>Network</h2>
        <Stage />
      </div>
    </div>
  );
}
