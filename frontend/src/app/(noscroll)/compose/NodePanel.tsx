import Table from '@/components/table';

export default function NodePanel() {
  return (
    <div className='flex flex-col items-center'>
      <Table caption={`Fluid properties`}>
        <thead>
          <tr>
            <th scope='col'>Property</th>
            <th scope='col'>Value(s)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>Pressure</th>
            <td>_____ bara</td>
          </tr>
          <tr>
            <th scope='row'>Temperature</th>
            <td>__ °</td>
          </tr>
          <tr>
            <th scope='row'>Flowrate</th>
            <td>__ kg/s</td>
          </tr>
          <tr>
            <th scope='row'>Composition</th>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
