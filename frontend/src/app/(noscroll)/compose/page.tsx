import ComponentPanel from './ComponentPanel';
import ComponentPicker from './ComponentPicker';
import Stage from '@/components/composition/Stage';
import Submission from './Submission';

export default function Compose() {
  return (
    <div className='flex flex-col sm:flex-row gap-2 w-full h-full'>
      <div className='flex flex-col w-full sm:w-80'>
        <ComponentPicker />

        <ComponentPanel />
      </div>

      <div className='flex flex-col grow'>
        <h2>Network</h2>
        <Stage />
        <h2>Run</h2>
        <Submission />
      </div>
    </div>
  );
}
